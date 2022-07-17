<template>
  <h1>Supplies</h1>
  <button @click="onClickNewSupply">New Supply</button>
  <AgGridSuppliesComponent
    :suppliesList="suppliesList"
    @supplyUpdated="onSupplyUpdated"
    @supplyDeleted="onSupplyDeleted"
  ></AgGridSuppliesComponent>
</template>

<script setup lang="ts">
import AgGridSuppliesComponent from "@/components/AgGridSuppliesComponent.vue";

type Props = {
  suppliesList: ReactiveArray<CafeDomain.Supply>;
  sendCommand: (
    Command: CafeDomain.DomainCommand<CafeDomain.Supply>
  ) => Promise<void>;
};

const props = defineProps<Props>();

const onSupplyUpdated = (supply: CafeDomain.Supply) =>
  props.sendCommand({
    type: "update_supply",
    payload: supply,
  });

const onSupplyDeleted = (supply: CafeDomain.Supply) =>
  props.sendCommand({
    type: "delete_supply",
    payload: supply,
  });

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
