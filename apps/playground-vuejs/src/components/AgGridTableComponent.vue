<template>
  <button @click="onClickNew">New</button>
  <ag-grid-vue
    class="ag-theme-alpine"
    :columnDefs="columnDefs"
    :rowData="rowData.value"
    :defaultColDef="defaultColDef"
    @grid-ready="onGridReady"
  ></ag-grid-vue>
  <small>{{ gridTitle }}</small>
</template>

<script setup>
import { AgGridVue } from "ag-grid-vue3";
import { nextTick, reactive } from "vue";

import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed.
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS.

const emits = defineEmits(["gridDataInsert"]);
const props = defineProps(["gridTitle", "gridData"]);

const rowData = reactive([]);
const columnDefs = reactive([]);

// DefaultColDef sets props common to all Columns
const defaultColDef = {
  sortable: true,
  filter: true,
  flex: 1,
  editable: true,
};

let gridApi = null;

const onGridReady = ({ api }) => {
  gridApi = api;

  props.gridData.then((gridData) => {
    rowData.value = gridData;
    columnDefs.value = Object.keys(gridData[0])
      .map((key) => ({
        field: key,
      }))
      .concat([{ headerName: "Row ID", valueGetter: "node.id" }]);

    gridApi.setColumnDefs(columnDefs.value);

    console.log(
      JSON.stringify(rowData.value, null, 2),
      JSON.stringify(columnDefs.value, null, 2)
    );
  });
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
