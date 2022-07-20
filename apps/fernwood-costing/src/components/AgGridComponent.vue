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
import AgRowToolsRenderer from "@/components/AgRowToolsRenderer.vue";
import { AgGridVue } from "ag-grid-vue3";

import type { ReactiveArray } from "@/types/ReactiveArray";
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
  console.log("onModelUpdated");

  // Check the length to determine if we have new records.
  // If we have new records, start editing the most recent one.
  if (rowData.value.length > backupRowData.length) {
    const colKey = event.columnApi.getColumns()[0].getColDef().field;
    const rowIndex = props.gridData.items.length - 1;
    event.api.setFocusedCell(rowIndex, colKey);
    event.api.startEditingCell({
      rowIndex,
      colKey,
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

const toolsColDef: ColDef = {
  field: "actions",
  editable: false,
  cellRenderer: AgRowToolsRenderer,
  cellRendererParams: {
    // We pass in event handlers because we do not know how to handle
    // events that cellRenderers emit.
    onDeleteClick: (rowData) => {
      emit("gridRowDeleteClick", rowData);
    },
    onEditClick: (rowData) => {
      emit("gridRowEditClick", rowData);
    },
    gridTools: props.gridTools,
  },
};

const onGridReady = ({ api }: GridOptions) => {
  console.log("onGridReady", props.gridData.items);

  const columnDefs: ColDef[] = props.gridColumnDefs;

  if (props.gridTools != null) {
    columnDefs.push(toolsColDef);
  }

  api.setColumnDefs(columnDefs);
};
</script>

<style>
.ag-theme-alpine {
  height: 500px;
}

/* Prevent grid from vanishing when popups appear. */
.ag-popup {
  height: 0;
}
</style>
