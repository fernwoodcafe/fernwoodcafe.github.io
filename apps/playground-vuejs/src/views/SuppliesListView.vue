<template>
  <div class="supplies">
    <h1>Supplies</h1>
    <AgGridTable
      gridTitle="Supplies"
      :gridData="suppliesList.items"
      @gridDataInsert="onGridDataInserted"
      @gridDataUpdate="onGridDataUpdated"
    ></AgGridTable>
  </div>
</template>

<script setup>
import AgGridTable from "@/components/AgGridTableComponent.vue";

const props = defineProps(["suppliesList", "insertSupply", "updateSupply"]);

const onGridDataUpdated = (data) => {
  console.log("onGridDataUpdated", data);
  props.updateSupply(data);
};

const onGridDataInserted = (data) => {
  console.log("onGridDataInserted", data);
  props.insertSupply(data);
};
</script>
