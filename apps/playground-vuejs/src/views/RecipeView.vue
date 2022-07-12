<template>
  <div class="recipes">
    <h2>{{ recipe.recipeId }}</h2>
    <AgGridRecipeComponent
      gridTitle="Recipes"
      :gridData="recipe.supplies"
    ></AgGridRecipeComponent>
  </div>
</template>

<script setup>
import AgGridRecipeComponent from "@/components/AgGridRecipeComponent.vue";
const props = defineProps(["recipe"]);
</script>
