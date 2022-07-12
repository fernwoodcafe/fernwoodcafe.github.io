<template>
  <div class="recipes">
    <h2>{{ recipe.recipeId }}</h2>
    <AgGridRecipeComponent
      gridTitle="Recipes"
      :gridData="recipe.supplies"
      :gridColumnDefs="gridColumnDefs"
    ></AgGridRecipeComponent>
  </div>
</template>

<script setup>
import AgGridRecipeComponent from "@/components/AgGridRecipeComponent.vue";
import AgSuppliesEditor from "@/components/AgSuppliesEditor.vue";
const props = defineProps({
  recipe: Object,
  suppliesList: Object,
});

console.log(props.suppliesList.items);

const gridColumnDefs = [
  {
    // @ts-ignore
    field: "Supply",
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
</script>
