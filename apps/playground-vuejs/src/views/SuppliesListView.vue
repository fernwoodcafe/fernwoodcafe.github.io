<template>
  <div class="supplies">
    <h1>Supplies</h1>
    <AgGridSuppliesComponent
      gridTitle="Supplies"
      :gridData="suppliesList.items"
      @gridDataInsert="onGridDataInserted"
      @gridDataUpdate="onGridDataUpdated"
    ></AgGridSuppliesComponent>
  </div>
</template>

<script setup>
import AgGridSuppliesComponent from "@/components/AgGridSuppliesComponent.vue";

const props = defineProps({
  suppliesList: Object,
  insertSupply: Function,
  updateSupply: Function,
});

const onGridDataUpdated = (data) => {
  console.log("onGridDataUpdated", data);
  props.updateSupply(data);
};

const onGridDataInserted = (data) => {
  console.log("onGridDataInserted", data);
  props.insertSupply(data);
};
</script>
