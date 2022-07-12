<template>
  <div class="recipes">
    <h2>{{ $route.params.id }}</h2>
    <AgGridTable
      gridTitle="Recipe"
      :gridData="recipeSupplies.items"
    ></AgGridTable>
  </div>
</template>

<script setup>
import AgGridTable from "@/components/AgGridTableComponent.vue";
import { onMounted, reactive } from "vue";

const props = defineProps(["id", "suppliesList", "getRecipe"]);

onMounted(() => {
  console.log("mounted", props);
});

const recipeSupplies = reactive({ items: [] });

props.getRecipe(props.id).then((recipe) => {
  console.log("recipe", props.id, recipe);
  recipeSupplies.items = recipe.supplies;
});
</script>
