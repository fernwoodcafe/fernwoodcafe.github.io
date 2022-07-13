<template>
  <button @click="onClickNewIngredient">New Ingredient</button>
  <AgGridRecipeComponent
    :recipe="recipe"
    :suppliesList="suppliesList"
  ></AgGridRecipeComponent>
</template>

<script setup lang="ts">
import AgGridRecipeComponent from "@/components/AgGridRecipeComponent.vue";

type Props = {
  recipe: CafeRecipe;
  suppliesList: ReactiveArray<CafeSupply>;
};

const props = defineProps<Props>();

const onClickNewIngredient = () => {};
</script>
