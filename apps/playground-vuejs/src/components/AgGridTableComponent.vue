<!--
  https://www.ag-grid.com/vue-data-grid
  - [ ] Add one recipe (list of supplies).
  - [ ] Pick from the supplies list in the recipes table.
  - [ ] Save the recipe and its supplies in IndexedDB.
 -->
<template>
  <span>{{ gridTitle }}</span>
  <ag-grid-vue
    class="ag-theme-alpine"
    :columnDefs="columnDefs.value"
    :rowData="rowData.value"
    :defaultColDef="defaultColDef"
  ></ag-grid-vue>
</template>

<script setup>
import { AgGridVue } from "ag-grid-vue3";
import { onMounted, reactive } from "vue";

import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS

const props = defineProps(["gridTitle", "gridData"]);

const rowData = reactive({});
const columnDefs = reactive({});

// DefaultColDef sets props common to all Columns
const defaultColDef = {
  sortable: true,
  filter: true,
  flex: 1,
  editable: true,
};

// Example load data from sever
onMounted(() => {
  rowData.value = props.gridData;
  columnDefs.value = Object.keys(props.gridData[0]).map((key) => ({
    field: key,
  }));
});
</script>

<style>
.ag-theme-alpine {
  height: 500px;
}
</style>
