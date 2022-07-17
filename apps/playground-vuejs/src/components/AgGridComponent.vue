<template>
  <AgGridVue
    class="ag-theme-alpine"
    :stopEditingWhenCellsLoseFocus="true"
    :defaultColDef="defaultColDef"
    :getRowId="getRowId"
    @grid-ready="onGridReady"
    @cell-value-changed="onCellValueChanged"
    @model-updated="onModelUpdated"
  ></AgGridVue>
</template>

<script setup lang="ts">
import AgRowToolsRenderer from "@/components/AgRowToolsRenderer.vue";
import { AgGridVue } from "ag-grid-vue3";

import { ColDef, GridOptions } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed.
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS.
import { watch } from "vue";

type Props = {
  gridData: ReactiveArray<object>;
  gridColumns: Array<string>;
  gridColumnDefs?: Array<ColDef>;
};

type Emits = {
  (e: "gridDataUpdate", data: any): void;
  (e: "gridRowDelete", data: any): void;
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
};

const getRowId = ({ data }) => data.uniqueId;

const onCellValueChanged = (event) => {
  console.log("onCellValueChanged");
  emit("gridDataUpdate", event.data);
};

const onModelUpdated = (event) => {
  console.log("onModelUpdated", event);
};

const onGridReady = ({ api }: GridOptions) => {
  console.log("onGridReady", props.gridData.items);

  const columnDefs = props.gridColumns
    .map((field) => {
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
    })
    .concat([
      {
        field: "actions",
        editable: false,
        cellRenderer: AgRowToolsRenderer,
        cellRendererParams: {
          onDeleteClick: (rowData) => {
            emit("gridRowDelete", rowData);
          },
        },
      },
    ]);

  api.setColumnDefs(columnDefs);
  api.setRowData(props.gridData.items);

  let oldGridDataLength = props.gridData.items.length;
  watch(props.gridData, (newGridData) => {
    // Check the length to determine if we have new records.
    if (newGridData.items.length != oldGridDataLength) {
      api.setRowData(props.gridData.items);

      const rowIndex = props.gridData.items.length - 1;
      const colKey = columnDefs[0].field;

      api.setFocusedCell(rowIndex, colKey);

      oldGridDataLength = props.gridData.items.length;
    }
  });
};
</script>

<style>
.ag-theme-alpine {
  height: 500px;
}
</style>
