<template>
  <h1>Supplies</h1>
  <button @click="onClickNewSupply">New Supply</button>
  <AgGridComponent
    :gridData="suppliesList"
    :gridColumns="['supplyId', 'id', 'unitSize', 'unitCost']"
    @gridDataUpdate="updateSupply"
  ></AgGridComponent>
</template>

<script setup lang="ts">
import AgGridComponent from "@/components/AgGridComponent.vue";

type Props = {
  suppliesList: ReactiveArray<CafeSupply>;
  updateSupply: (data: any) => Promise<void>;
  insertSupply: (data: any) => Promise<void>;
};

const props = defineProps<Props>();

const onClickNewSupply = () => {
  const supply = {
    id: self.crypto.randomUUID(),
    supplyId: "",
  };

  props.insertSupply(supply);
};
</script>
