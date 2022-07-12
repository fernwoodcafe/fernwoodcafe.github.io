<template>
  <div class="recipes">
    <h2>{{ recipe.recipeId }}</h2>
    <AgGridRecipeComponent
      gridTitle="Recipes"
      :gridData="recipe.supplies"
      :gridColumnDefs="gridColumnDefs"
      @gridDataUpdate="onGridDataUpdated"
    ></AgGridRecipeComponent>
  </div>
</template>

<script setup>
import AgGridRecipeComponent from "@/components/AgGridRecipeComponent.vue";
import AgSuppliesEditor from "@/components/AgSuppliesEditor.vue";
const props = defineProps({
  recipe: Object,
  suppliesList: Object,
  updateRecipe: Function,
});

console.log(props.suppliesList.items);

const onGridDataUpdated = (data) => {
  console.log("onGridDataUpdated", data);
  // props.updateRecipe(data);
};

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
