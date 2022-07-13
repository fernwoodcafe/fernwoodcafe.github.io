<template>
  <AgGridComponent
    :gridData="recipeSupplies"
    :gridColumns="['supplyId', 'unitQuantity']"
    :gridColumnDefs="columnDefs"
  ></AgGridComponent>
</template>

<script setup lang="ts">
import AgGridComponent from "@/components/AgGridComponent.vue";
import AgSuppliesEditor from "@/components/AgSuppliesEditor.vue";
import { reactive } from "vue";

type Props = {
  recipe: CafeRecipe;
  suppliesList: ReactiveArray<CafeSupply>;
};

const props = defineProps<Props>();

// TODO: Does this need to be reactive?
const recipeSupplies = reactive({
  items: props.recipe.supplies,
});

const columnDefs = [
  {
    field: "supplyId",
    cellEditor: AgSuppliesEditor,
    cellEditorParams: {
      options: props.suppliesList.items.map((item) => ({
        value: item.supplyId,
        label: `${item.supplyId}`,
      })),
    },
  },
];
</script>
