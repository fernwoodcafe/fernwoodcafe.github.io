<template>
  <div class="supplies">
    <h1>Supplies</h1>
    <AgGridSuppliesComponent
      :suppliesList="suppliesList"
      @gridDataInsert="onGridDataInserted"
      @gridDataUpdate="onGridDataUpdated"
    ></AgGridSuppliesComponent>
  </div>
</template>

<script setup lang="ts">
import AgGridSuppliesComponent from "@/components/AgGridSuppliesComponent.vue";

type Props = {
  suppliesList: ReactiveArray<CafeSupply>;
  insertSupply: Function;
  updateSupply: Function;
};
const props = defineProps<Props>();

const onGridDataUpdated = (data) => {
  console.log("onGridDataUpdated", data);
  props.updateSupply(data);
};

const onGridDataInserted = (data) => {
  console.log("onGridDataInserted", data);
  props.insertSupply(data);
};
</script>
