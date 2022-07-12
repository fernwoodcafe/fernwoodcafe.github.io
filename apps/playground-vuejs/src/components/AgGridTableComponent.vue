<template>
  <button @click="gridInsertRow">New</button>
  <ag-grid-vue
    class="ag-theme-alpine"
    :columnDefs="columnDefs"
    :rowData="rowData.value"
    :defaultColDef="defaultColDef"
    @grid-ready="onGridReady"
  ></ag-grid-vue>
  <small>{{ gridData.length }}</small>
  <small>{{ gridTitle }}</small>
</template>

<script setup>
import { AgGridVue } from "ag-grid-vue3";
import { reactive } from "vue";

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

const columnDefs = Object.keys(props.gridData[0])
  .map((key) => ({
    field: key,
  }))
  .concat([{ headerName: "Row ID", valueGetter: "node.id" }]);

const onGridReady = () => {
  rowData.value = props.gridData;
};

const gridInsertRow = () => {
  const newData = rowData.value.slice().concat([
    {
      supplierId: Math.random().toString(),
      supplyId: Math.random().toString(),
    },
  ]);

  rowData.value = newData;
};
</script>

<style>
.ag-theme-alpine {
  height: 500px;
}
</style>
