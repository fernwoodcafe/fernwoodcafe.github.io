<template>
  <button @click="onClickNew">Add Ingredient</button>
  <ag-grid-vue
    class="ag-theme-alpine"
    :readOnlyEdit="true"
    :defaultColDef="defaultColDef"
    :getRowId="getRowId"
    @cell-edit-request="onCellEditRequest"
    @grid-ready="onGridReady"
  ></ag-grid-vue>
</template>

<script setup lang="ts">
import AgSuppliesEditor from "@/components/AgSuppliesEditor.vue";
import { AgGridVue } from "ag-grid-vue3";
import { nextTick } from "vue";

import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed.
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS.

type Props = {
  recipe: CafeRecipe;
  suppliesList: ReactiveArray<CafeSupply>;
};

const emit = defineEmits(["gridDataInsert", "gridDataUpdate"]);
const props = defineProps<Props>();

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

  const columnDefs = [
    {
      // @ts-ignore
      field: "supplyId",
      cellEditor: AgSuppliesEditor,
      cellEditorParams: {
        supplySelectOptions: props.suppliesList.items.map((item) => ({
          key: item.supplyId,
          value: `${item.supplyId}`,
        })),
      },
    },
    {
      // @ts-ignore
      headerName: "Row Id",
      valueGetter: "node.id",
    },
  ];

  gridApi.setColumnDefs(columnDefs);
  gridApi.setRowData(props.recipe.supplies);
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
