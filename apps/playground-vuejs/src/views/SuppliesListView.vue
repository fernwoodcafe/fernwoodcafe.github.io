<template>
  <div class="supplies">
    <h1>Supplies</h1>
    <AgGridTable
      gridTitle="Supplies"
      :gridData="suppliesList"
      @gridDataInsert="onGridDataInserted"
    ></AgGridTable>
  </div>
</template>

<script setup>
import AgGridTable from "@/components/AgGridTableComponent.vue";

const props = defineProps(["suppliesList", "insertSupply"]);

const onGridDataInserted = (data) => {
  console.log("onGridDataInserted", data);
  props.insertSupply(data);
};
</script>
