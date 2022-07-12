<template>
  <button @click="onClickNew">New</button>
  <ag-grid-vue
    class="ag-theme-alpine"
    :readOnlyEdit="true"
    :defaultColDef="defaultColDef"
    :getRowId="getRowId"
    @cell-edit-request="onCellEditRequest"
    @grid-ready="onGridReady"
  ></ag-grid-vue>
  <small>{{ gridTitle }}</small>
</template>

<script setup>
import { AgGridVue } from "ag-grid-vue3";
import { nextTick } from "vue";

import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed.
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS.

const emit = defineEmits(["gridDataInsert", "gridDataUpdate"]);
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

const getRowId = ({ data }) => data.id;

const onCellEditRequest = (event) => {
  const rowIndex = event.rowIndex;
  const data = event.data;
  const field = event.colDef.field;
  const newValue = event.newValue;
  const updatedItem = { ...data };
  updatedItem[field] = newValue;
  rowData = rowData.map((oldItem, index) =>
    index == rowIndex ? updatedItem : oldItem
  );
  gridApi.setRowData(rowData);

  emit("gridDataUpdate", updatedItem);
};

const onGridReady = ({ api }) => {
  gridApi = api;

  rowData = props.gridData;

  const columnDefs = Object.keys(props.gridData[0])
    .filter((key) => key != "id")
    .map((key) => ({
      field: key,
    }))
    .concat([
      {
        headerName: "Row Id",
        valueGetter: "node.id",
      },
    ]);

  gridApi.setColumnDefs(columnDefs);
  gridApi.setRowData(props.gridData);
};

const onClickNew = () => {
  const emptyRow = {
    id: self.crypto.randomUUID(),
    supplierId: "",
    supplyId: "",
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
