<template>
  <button @click="">Add Ingredient</button>
  <ag-grid-vue
    class="ag-theme-alpine"
    :defaultColDef="defaultColDef"
    :getRowId="getRowId"
    @grid-ready="onGridReady"
    @cell-value-changed="onCellValueChanged"
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

const emit = defineEmits(["gridDataInsert", "gridDataUpdate"]);
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
  const columnDefs = Object.keys(props.recipe.supplies[0])
    .map((key) => ({
      field: key,
    }))
    .map((columnDef) => {
      if (columnDef.field != "supplyId") {
        return columnDef;
      }

      return {
        // @ts-ignore
        field: "supplyId",
        cellEditor: AgSuppliesEditor,
        cellEditorParams: {
          options: props.suppliesList.items.map((item) => ({
            value: item.supplyId,
            label: `${item.supplyId}`,
          })),
        },
      };
    });

  api.setColumnDefs(columnDefs);
  api.setRowData(props.recipe.supplies);
};

const onCellValueChanged = (event) => {
  emit("gridDataUpdate", event.data);
};
</script>

<style>
.ag-theme-alpine {
  height: 500px;
}
</style>
