<template>
  <div class="supplies">
    <h1>Supplies</h1>
    <AgGridTable gridTitle="Supplies" :gridData="suppliesList"></AgGridTable>
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
