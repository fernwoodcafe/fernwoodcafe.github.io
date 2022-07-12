<template>
  <div class="supplies">
    <h1>Supplies</h1>
    <AgGridTable gridTitle="Supplies" :gridData="suppliesList"></AgGridTable>
  </div>
</template>

<script setup>
import AgGridTable from "@/components/AgGridTableComponent.vue";

defineProps(["suppliesList"]);
</script>
