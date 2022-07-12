<template>
  <button @click="onClickNew">New</button>
  <ag-grid-vue
    class="ag-theme-alpine"
    :defaultColDef="defaultColDef"
    @grid-ready="onGridReady"
  ></ag-grid-vue>
  <small>{{ gridTitle }}</small>
</template>

<script setup>
import { AgGridVue } from "ag-grid-vue3";
import { nextTick } from "vue";

import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed.
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS.

const emits = defineEmits(["gridDataInsert"]);
const props = defineProps(["gridTitle", "gridData"]);

// DefaultColDef sets props common to all Columns
const defaultColDef = {
  sortable: true,
  filter: true,
  flex: 1,
  editable: true,
};

let gridApi = null;
let rowData = null;

const onGridReady = ({ api }) => {
  gridApi = api;

  props.gridData.then((gridData) => {
    rowData = gridData;
    const columnDefs = Object.keys(gridData[0])
      .map((key) => ({
        field: key,
      }))
      .concat([{ headerName: "Row ID", valueGetter: "node.id" }]);

    gridApi.setColumnDefs(columnDefs);
    gridApi.setRowData(gridData);
  });
};

const onClickNew = () => {
  const emptyRow = {
    supplierId: "",
    supplyId: "",
  };

  const newRowData = rowData.slice().concat([emptyRow]);

  gridApi.setRowData(newRowData);

  emits("gridDataInsert", emptyRow);

  nextTick(() => {
    const newRowIndex = newRowData.length - 1;

    gridApi.setFocusedCell(newRowIndex, "supplyId");

    gridApi.startEditingCell({
      rowIndex: newRowIndex,
      colKey: "supplierId",
    });
  });
};
</script>

<style>
.ag-theme-alpine {
  height: 500px;
}
</style>
