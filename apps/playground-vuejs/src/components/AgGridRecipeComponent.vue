<template>
  <button @click="">Add Ingredient</button>
  <ag-grid-vue
    class="ag-theme-alpine"
    :defaultColDef="defaultColDef"
    :getRowId="getRowId"
    @grid-ready="onGridReady"
  ></ag-grid-vue>
</template>

<script setup lang="ts">
import AgSuppliesEditor from "@/components/AgSuppliesEditor.vue";
import { AgGridVue } from "ag-grid-vue3";

import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed.
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS.

type Props = {
  recipe: CafeRecipe;
  suppliesList: ReactiveArray<CafeSupply>;
};

const props = defineProps<Props>();

// DefaultColDef sets props common to all Columns
const defaultColDef = {
  sortable: true,
  filter: true,
  flex: 1,
  editable: true,
};

const getRowId = ({ data }) => data.id;

const onGridReady = ({ api }) => {
  const columnDefs = [
    {
      // @ts-ignore
      field: "supplyId",
      cellEditor: AgSuppliesEditor,
      cellEditorParams: {
        options: props.suppliesList.items.map((item) => ({
          value: item.supplyId,
          label: `${item.supplyId}`,
        })),
      },
    },
    {
      // @ts-ignore
      headerName: "Row Id",
      valueGetter: "node.id",
    },
  ];

  api.setColumnDefs(columnDefs);
  api.setRowData(props.recipe.supplies);
};
</script>

<style>
.ag-theme-alpine {
  height: 500px;
}
</style>
