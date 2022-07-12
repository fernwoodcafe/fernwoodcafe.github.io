<template>
  <div class="recipes">
    <h2>{{ $route.params.id }}</h2>

    <AgGridTable
      gridTitle="Recipe"
      :gridData="componentsList.items"
    ></AgGridTable>
  </div>
</template>

<script setup>
import AgGridTable from "@/components/AgGridTableComponent.vue";
const componentsList = {
  items: [{}],
};
</script>
