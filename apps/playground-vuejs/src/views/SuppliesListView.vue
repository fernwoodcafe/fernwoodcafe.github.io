<template>
  <h1>Supplies</h1>
  <button @click="onClickNewSupply">New Supply</button>
  <AgGridComponent
    :gridData="suppliesList"
    :gridColumns="['supplyName', 'unitSize', 'unitCost']"
    @gridDataUpdate="onSupplyUpdated"
  ></AgGridComponent>
</template>

<script setup lang="ts">
import AgGridComponent from "@/components/AgGridComponent.vue";

type Props = {
  suppliesList: ReactiveArray<CafeDomain.Supply>;
  sendCommand: (
    Command: CafeDomain.DomainCommand<CafeDomain.Supply>
  ) => Promise<void>;
};

const props = defineProps<Props>();

const onSupplyUpdated = (gridDataRow) => {
  props.sendCommand({
    type: "update_supply",
    payload: gridDataRow,
  });
};

const onClickNewSupply = () => {
  props.sendCommand({
    type: "create_supply",
    payload: {
      uniqueId: crypto.randomUUID(),
      unitCost: 0,
      unitSize: "",
      supplyName: "",
      supplyType: "ingredient",
    },
  });
};
</script>
