<template>
  <button @click="gridInsertRow">New</button>
  <ag-grid-vue
    class="ag-theme-alpine"
    :columnDefs="columnDefs"
    :rowData="rowData.value"
    :defaultColDef="defaultColDef"
    :getRowId="getRowId"
    @grid-ready="onGridReady"
  ></ag-grid-vue>
  <small>{{ gridData.length }}</small>
  <small>{{ gridTitle }}</small>
</template>

<script setup>
import { AgGridVue } from "ag-grid-vue3";
import { reactive } from "Vue";

import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed.
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS.

const props = defineProps(["gridTitle", "gridData"]);

const rowData = reactive({});

// DefaultColDef sets props common to all Columns
const defaultColDef = {
  sortable: true,
  filter: true,
  flex: 1,
  editable: true,
};

const columnDefs = Object.keys(props.gridData[0]).map((key) => ({
  field: key,
}));

const onGridReady = () => {
  rowData.value = props.gridData;
};

const getRowId = ({ data }) => {
  return data.supplyId;
};

const gridInsertRow = () => {
  console.log("gridInsertRow");
  props.gridInsertRow();
};
</script>

<style>
.ag-theme-alpine {
  height: 500px;
}
</style>
