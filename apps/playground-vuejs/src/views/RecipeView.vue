<template>
  <div class="recipes">
    <h2>{{ recipe.recipeId }}</h2>
    <AgGridTable gridTitle="Supplies" :gridData="recipe.supplies"></AgGridTable>
  </div>
</template>

<script setup>
import AgGridTable from "@/components/AgGridTableComponent.vue";
import { onMounted } from "vue";

const props = defineProps(["recipe"]);

onMounted(() => {
  console.log("mounted");
  console.log(JSON.stringify(props, null, 2));
});
</script>
