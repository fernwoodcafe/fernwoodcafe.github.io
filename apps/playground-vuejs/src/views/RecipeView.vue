<template>
  <div class="recipes">
    <h2>{{ recipe.recipeId }}</h2>
    <AgGridTable gridTitle="Recipes" :gridData="recipe.supplies"></AgGridTable>
  </div>
</template>

<script setup>
import AgGridTable from "@/components/AgGridTableComponent.vue";
const props = defineProps(["recipe"]);
</script>
