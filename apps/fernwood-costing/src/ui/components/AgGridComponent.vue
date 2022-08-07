<template>
  <AgGridVue
    class="ag-theme-alpine"
    :stopEditingWhenCellsLoseFocus="true"
    :defaultColDef="defaultColDef"
    :readOnlyEdit="true"
    :getRowId="getRowId"
    :singleClickEdit="true"
    :rowData="rowData"
    @grid-ready="onGridReady"
    @cell-edit-request="onCellEditRequest"
    @model-updated="onModelUpdated"
  ></AgGridVue>
</template>

<script setup lang="ts">
import AgRowToolsRenderer from "@ui/components/AgRowToolsRenderer.vue";
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
  console.log("onModelUpdated", rowData.value.length);

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
    const cell = event.columnApi
      .getColumns()
      .find((c) => c.isCellEditable(row));

    cell.setColDef(
      {
        ...cell.getColDef(),
        cellClass: "look-here-now",
      },
      null
    );

    event.api.startEditingCell({
      rowIndex: rowIndex,
      colKey: cell.getColId(),
    });
  }

  backupRowData = rowData.value.slice();
};

const onCellEditRequest = (event: CellEditRequestEvent) => {
  emit("gridDataUpdate", {
    ...event.data,
    [event.colDef.field]: event.value,
  });
};

/**
 * Setting maxWidth plays well with a default to flex width.
 * See https://www.ag-grid.com/javascript-data-grid/column-sizing/#column-flex
 */
const toolsColDef: ColDef = {
  headerName: "Actions",
  editable: false,
  resizable: false,
  maxWidth: 130,
  suppressMenu: true,
  cellRenderer: AgRowToolsRenderer,
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
  console.log("onGridReady", props.gridData.items);

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

  if (props.gridTools != null) {
    columnDefs.unshift(toolsColDef);
    columnDefs.push(toolsColDef);
  }

  api.setColumnDefs(columnDefs);
};
</script>

<style>
.ag-theme-alpine {
  height: 100vh;
}

/* Prevent grid from vanishing when popups appear. */
.ag-popup {
  height: 0;
}

.ag-header-cell.ag-editable span.ag-header-cell-text::after {
  content: "*";
  padding-left: 2px;
}

.ag-cell.ag-not-editable {
  font-style: italic;
}
</style>
