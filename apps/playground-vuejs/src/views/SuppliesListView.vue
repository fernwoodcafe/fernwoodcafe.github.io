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
import { DomainCommand, Supply } from "@/types/CafeDomain";

type Props = {
  suppliesList: ReactiveArray<Supply>;
  sendCommand: (Command: DomainCommand<Supply>) => Promise<void>;
};

const props = defineProps<Props>();

const onSupplyUpdated = (supply: Supply) =>
  props.sendCommand({
    type: "update_supply",
    payload: supply,
  });

const onSupplyDeleted = (supply: Supply) =>
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
      supplyUnits: "",
      supplyName: "",
      supplyType: "ingredient",
    },
  });
};
</script>
