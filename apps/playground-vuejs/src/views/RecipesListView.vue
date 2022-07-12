<template>
  <div class="recipes">
    <h1>Recipes</h1>
    <AgGridTable gridTitle="Recipes" :gridData="recipesList"></AgGridTable>
  </div>
</template>

<script setup>
import AgGridTable from "@/components/AgGridTableComponent.vue";
import { defineProps } from "vue";

defineProps(["suppliesList", "recipesList"]);
</script>
