<template>
  <ag-grid-vue
    class="ag-theme-alpine"
    :defaultColDef="defaultColDef"
    :getRowId="getRowId"
    @grid-ready="onGridReady"
    @cell-value-changed="onCellValueChanged"
  ></ag-grid-vue>
</template>

<script setup lang="ts">
import { AgGridVue } from "ag-grid-vue3";
import { watch } from "vue";

import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed.
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS.

type Props = {
  gridData: ReactiveArray<object>;
};

type Emits = {
  (e: "gridDataUpdate", data: any): void;
};

const emit = defineEmits<Emits>();
const props = defineProps<Props>();

// DefaultColDef sets props common to all Columns
const defaultColDef = {
  sortable: true,
  filter: true,
  flex: 1,
  editable: true,
};

const getRowId = ({ data }) => data.id;

const onCellValueChanged = (event) => {
  emit("gridDataUpdate", event.data);
};

const onGridReady = ({ api }) => {
  const columnDefs = Object.keys(props.gridData.items[0]).map((key) => ({
    field: key,
  }));

  api.setColumnDefs(columnDefs);
  api.setRowData(props.gridData.items);

  watch(props.gridData, () => {
    api.setRowData(props.gridData.items);
  });
};
</script>

<style>
.ag-theme-alpine {
  height: 500px;
}
</style>
