<template>
  <div class="recipes">
    <h1>Recipes</h1>
    <AgGridTable
      gridTitle="Recipes"
      :gridData="suppliesList.items"
      @gridDataInsert="onGridDataInserted"
      @gridDataUpdate="onGridDataUpdated"
    ></AgGridTable>
  </div>
</template>

<script setup>
import AgGridTable from "@/components/AgGridTableComponent.vue";

const props = defineProps([
  "suppliesList",
  "recipesList",
  "insertSupply",
  "updateSupply",
]);

const onGridDataUpdated = (data) => {
  console.log("onGridDataUpdated", data);
  props.updateSupply(data);
};

const onGridDataInserted = (data) => {
  console.log("onGridDataInserted", data);
  props.insertSupply(data);
};
</script>
