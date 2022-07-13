<template>
  <button @click="onClickNew">Add Supply</button>
  <ag-grid-vue
    class="ag-theme-alpine"
    :defaultColDef="defaultColDef"
    :getRowId="getRowId"
    @grid-ready="onGridReady"
    @cell-value-changed="onCellValueChanged"
  ></ag-grid-vue>
</template>

<script setup>
import { AgGridVue } from "ag-grid-vue3";
import { nextTick } from "vue";

import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed.
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS.

const emit = defineEmits(["gridDataInsert", "gridDataUpdate"]);
const props = defineProps(["gridData"]);

// DefaultColDef sets props common to all Columns
const defaultColDef = {
  sortable: true,
  filter: true,
  flex: 1,
  editable: true,
};

let gridApi = null;
let rowData = null;

const getRowId = ({ data }) => data.id;

const onCellValueChanged = (event) => {
  emit("gridDataUpdate", event.data);
};

const onGridReady = ({ api }) => {
  gridApi = api;

  rowData = props.gridData;

  const columnDefs = Object.keys(props.gridData[0]).map((key) => ({
    field: key,
  }));

  gridApi.setColumnDefs(columnDefs);
  gridApi.setRowData(props.gridData);
};

const onClickNew = () => {
  const emptyRow = {
    id: self.crypto.randomUUID(),
  };

  rowData = rowData.slice().concat([emptyRow]);

  gridApi.setRowData(rowData);

  emit("gridDataInsert", emptyRow);

  nextTick(() => {
    const newRowIndex = rowData.length - 1;

    gridApi.setFocusedCell(newRowIndex, "supplyId");

    gridApi.startEditingCell({
      rowIndex: newRowIndex,
      colKey: "supplyId",
    });
  });
};
</script>

<style>
.ag-theme-alpine {
  height: 500px;
}
</style>
