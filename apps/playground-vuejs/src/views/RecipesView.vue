<template>
  <div class="recipes">
    <h1>Recipes</h1>
    <AgGridTable gridTitle="Recipes" :gridData="suppliesList"></AgGridTable>
    <button @click="incrementOuter()">
      {{ counterOuter }}
    </button>
  </div>
</template>

<script setup>
import AgGridTable from "@/components/AgGridTableComponent.vue";
import { defineProps } from "vue";

defineProps(["suppliesList"]);
</script>
