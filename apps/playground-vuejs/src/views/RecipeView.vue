<template>
  <h2>{{ recipe.recipeId }}</h2>
  <AgGridRecipeComponent
    :recipe="recipe"
    :suppliesList="suppliesList"
    @gridDataUpdate="onGridDataUpdated"
  ></AgGridRecipeComponent>
</template>

<script setup lang="ts">
import AgGridRecipeComponent from "@/components/AgGridRecipeComponent.vue";

type Props = {
  recipe: CafeRecipe;
  suppliesList: ReactiveArray<CafeSupply>;
};

const props = defineProps<Props>();

console.log(props.suppliesList.items);

const onGridDataUpdated = (data) => {
  console.log("onGridDataUpdated", data);
};
</script>
