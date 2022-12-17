<template>
  <AgGridVue
    class="ag-theme-alpine"
    :stopEditingWhenCellsLoseFocus="true"
    :defaultColDef="defaultColDef"
    :readOnlyEdit="true"
    :getRowId="getRowId"
    :singleClickEdit="true"
    :rowData="rowData"
    :grid-options="gridOptions"
    @grid-ready="onGridReady"
    @cell-edit-request="onCellEditRequest"
    @model-updated="onModelUpdated"
  ></AgGridVue>
</template>

<script setup lang="ts">
import AgRendererRowTools from "@ui/components/AgRendererRowTools.vue";
import { AgGridVue } from "ag-grid-vue3";

import type { ReactiveArray } from "@ui/types/ReactiveArray";
import type {
  CellEditRequestEvent,
  ColDef,
  GridOptions,
  ModelUpdatedEvent,
} from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed.
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS.
import { ref, watch } from "vue";

/**
 * @see https://www.ag-grid.com/vue-data-grid/grid-options/
 */
const gridOptions: GridOptions = {
  /**
   * @remarks
   *
   * By default rows and columns can appear out of order in the DOM.
   * This 'incorrect order' can result in inconsistent results when parsed by
   * screen readers.
   *
   * Also, animations won't work properly when the DOM order is forced,
   * so ensure they are not enabled.
   *
   * @see
   *
   * https://www.ag-grid.com/archive/19.1.4/javascript-grid-accessibility/#dom-order
   * https://www.ag-grid.com/archive/20.2.0/javascript-grid-animation/
   */
  ensureDomOrder: true,
  suppressColumnMoveAnimation: true,
  suppressAnimationFrame: true,
  animateRows: false,
};

type Props = {
  gridData: ReactiveArray<object>;
  gridColumnDefs?: Array<ColDef>;
  gridTools?: Array<"edit" | "delete">;
};

type Emits = {
  (e: "gridDataUpdate", data: any): void;
  (e: "gridRowDeleteClick", data: any): void;
  (e: "gridRowEditClick", data: any): void;
};

const emit = defineEmits<Emits>();
const props = defineProps<Props>();

// We create a separate variable to ensure refresh happens.
// See https://blog.ag-grid.com/refresh-grid-after-data-change/
const rowData = ref(props.gridData.items.slice());
let backupRowData = rowData.value;

watch(props.gridData, () => {
  rowData.value = props.gridData.items.slice();
});

// DefaultColDef sets props common to all Columns
const defaultColDef: ColDef = {
  sortable: true,
  filter: true,
  flex: 1,
  editable: true,
  singleClickEdit: true,
  wrapHeaderText: true,
  autoHeaderHeight: true,
  resizable: true,
};

const getRowId = ({ data }) => data.uniqueId;

const onModelUpdated = (event: ModelUpdatedEvent) => {
  // Check the length to determine if we have new records.
  // If we have new records, start editing the most recent one.
  if (rowData.value.length > backupRowData.length) {
    // Get the most recent row and select it.
    const rowIndex = event.api.getLastDisplayedRow();
    const row = event.api
      .getRenderedNodes()
      .find((row) => row.rowIndex == rowIndex);

    row.setSelected(true, true);

    // Get its first editable cell and select it.
    const firstEditableCell = event.columnApi
      .getColumns()
      .find((c) => c.isCellEditable(row));

    event.api.startEditingCell({
      rowIndex: rowIndex,
      colKey: firstEditableCell.getColId(),
    });
  }

  backupRowData = rowData.value.slice();
};

const onCellEditRequest = (event: CellEditRequestEvent) => {
  const oldData = event.data;
  const field = event.colDef.field;
  const newData = {
    ...oldData,
    [field]: event.newValue,
  };

  if (typeof newData[field] === "string") {
    newData[field] = newData[field].trim();
  }

  const tx = {
    update: [newData],
  };

  event.api.applyTransaction(tx);

  emit("gridDataUpdate", newData);
};

/**
 * Setting maxWidth plays well with a default to flex width.
 * See https://www.ag-grid.com/javascript-data-grid/column-sizing/#column-flex
 */
const toolsColDef: ColDef = {
  headerName: "Actions",
  editable: false,
  resizable: false,
  maxWidth: 100,
  suppressMenu: true,
  cellRenderer: AgRendererRowTools,
  cellRendererParams: {
    onEditClick: (rowData) => {
      emit("gridRowEditClick", rowData);
    },
    onDeleteClick: (rowData) => {
      emit("gridRowDeleteClick", rowData);
    },
    gridTools: props.gridTools,
  },
};

const onGridReady = ({ api }: GridOptions) => {
  const columnDefs: ColDef[] = props.gridColumnDefs.slice().map((colDef) => {
    if (colDef.editable === false) {
      colDef.cellClass = "ag-not-editable";
      colDef.headerClass = "ag-not-editable";
    } else {
      colDef.cellClass = "ag-editable";
      colDef.headerClass = "ag-editable";
    }

    return colDef;
  });

  if (props.gridTools?.includes("edit")) {
    columnDefs.unshift({
      ...toolsColDef,
      colId: "tools-safe",
    });
  }

  if (props.gridTools?.includes("delete")) {
    columnDefs.push({
      ...toolsColDef,
      colId: "tools-dangerous",
    });
  }

  api.setColumnDefs(columnDefs);
  api.setDomLayout("autoHeight");
};
</script>

<style>
.ag-root-wrapper {
  /* Prevent the edit popup from hiding outside the table dimensions. */
  overflow: visible;
}

.ag-header-cell.ag-editable span.ag-header-cell-text::after {
  content: "*";
  padding-left: 2rem;
}

.ag-cell.ag-not-editable {
  font-style: italic;
}
</style>
