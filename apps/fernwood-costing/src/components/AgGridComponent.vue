<template>
  <!--
    Note: If we switch to readOnlyEdit,
    then we need to adjust how some of our edits work.
  -->
  <AgGridVue
    class="ag-theme-alpine"
    :stopEditingWhenCellsLoseFocus="true"
    :defaultColDef="defaultColDef"
    :readOnlyEdit="true"
    :getRowId="getRowId"
    :singleClickEdit="true"
    :rowData="gridData.items"
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

type Props = {
  gridData: ReactiveArray<object>;
  gridColumns: Array<string>;
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

let oldGridData = props.gridData.items.map((x) => x);
const onModelUpdated = (event: ModelUpdatedEvent) => {
  console.log("onModelUpdated", event);

  // Check the length to determine if we have new records.
  // If we have new records, start editing the most recent one.
  if (props.gridData.items.length != oldGridData.length) {
    const colKey = event.columnApi.getColumns()[0].getColDef().field;
    const rowIndex = props.gridData.items.length - 1;
    event.api.setFocusedCell(rowIndex, colKey);
    event.api.startEditingCell({
      rowIndex,
      colKey,
    });
  }

  oldGridData = props.gridData.items.map((x) => x);
};

const onCellEditRequest = (event: CellEditRequestEvent) => {
  emit("gridDataUpdate", {
    ...event.data,
    [event.colDef.field]: event.value,
  });
};

const onGridReady = ({ api }: GridOptions) => {
  console.log("onGridReady", props.gridData.items);

  const columnDefs = props.gridColumns.map((field) => {
    const def = props.gridColumnDefs?.find((def) => def.field == field);
    if (def) {
      // Complex Column.
      console.log("complex", def);
      return def;
    }

    // Simple Column.
    return {
      field,
    };
  });

  if (props.gridTools != null) {
    columnDefs.push({
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
    });
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
