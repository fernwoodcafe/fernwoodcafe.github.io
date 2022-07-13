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

import { ColDef, GridOptions } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed.
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS.

type Props = {
  gridData: ReactiveArray<object>;
  gridColumns: Array<string>;
  gridColumnDefs?: Array<ColDef>;
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

const onGridReady = ({ api }: GridOptions) => {
  console.log("onGridReady", props.gridData.items);

  const columnDefs = props.gridColumns.map((field) => {
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
  });

  api.setColumnDefs(columnDefs);
  api.setRowData(props.gridData.items);

  let oldGridDataLength = props.gridData.items.length;
  watch(props.gridData, (newGridData) => {
    // We check the length, because we use this only to insert new records (not to
    // update existing records). In the future, we might do a more thorough check e.g.
    // for same ids.
    if (newGridData.items.length != oldGridDataLength) {
      api.setRowData(props.gridData.items);
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
