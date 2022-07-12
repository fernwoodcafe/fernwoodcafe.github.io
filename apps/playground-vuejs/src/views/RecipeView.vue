<template>
  <div class="recipes">
    <h2>{{ recipe.recipeId }}</h2>
    <AgGridRecipeComponent
      gridTitle="Recipes"
      :recipe="recipe"
      :suppliesList="suppliesList"
      @gridDataUpdate="onGridDataUpdated"
    ></AgGridRecipeComponent>
  </div>
</template>

<script setup lang="ts">
import AgGridRecipeComponent from "@/components/AgGridRecipeComponent.vue";

type Props = {
  recipe: CafeRecipe;
  suppliesList: ReactiveArray<CafeSupply>;
  updateRecipe: Function;
};

const props = defineProps<Props>();

console.log(props.suppliesList.items);

const onGridDataUpdated = (data) => {
  console.log("onGridDataUpdated", data);
  // props.updateRecipe(data);
};
</script>
