<template>
  <h1>Supplies</h1>
  <button @click="onClickNewSupply">New Supply</button>
  <AgGridSupplyComponent
    :suppliesList="suppliesList"
    @supplyUpdated="onSupplyUpdated"
  ></AgGridSupplyComponent>
</template>

<script setup lang="ts">
import AgGridSupplyComponent from "@/components/AgGridSupplyComponent.vue";

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
