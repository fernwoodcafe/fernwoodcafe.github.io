<template>
  <button @click="onClickNew">New</button>
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
import { nextTick, reactive } from "vue";

import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed.
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS.

const emits = defineEmits(["gridDataInsert"]);
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

let gridApi = null;

const onGridReady = ({ api }) => {
  rowData.value = props.gridData;
  gridApi = api;

  console.log(gridApi);
};

const onClickNew = () => {
  const emptyRow = {
    supplierId: "",
    supplyId: "",
  };

  const newRowData = rowData.value.slice().concat([emptyRow]);

  rowData.value = newRowData;

  emits("gridDataInsert", emptyRow);

  nextTick(() => {
    const newRowIndex = rowData.value.length - 1;

    gridApi.setFocusedCell(newRowIndex, "supplierId");

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
