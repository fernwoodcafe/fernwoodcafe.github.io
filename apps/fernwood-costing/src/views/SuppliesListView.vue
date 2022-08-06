<template>
  <h1>Supplies</h1>
  <input type="button" @click="onClickNewSupply" value="New Supply" />
  <AgGridSuppliesComponent
    :suppliesList="suppliesList"
    @supplyUpdated="onSupplyUpdated"
    @supplyDeleted="onSupplyDeleted"
  ></AgGridSuppliesComponent>
</template>

<script setup lang="ts">
import AgGridSuppliesComponent from "@/components/AgGridSuppliesComponent.vue";
import type { DomainCommand, Supply } from "@/domain/types";
import type { ReactiveArray } from "@/types/ReactiveArray";

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
      supplyUnits: "",
      supplyName: `New Supply ${props.suppliesList.items.length}`,
      supplierName: "",
      supplyNotes: "",
      supplyLink: "",
      supplyType: "ingredient",
      percentWaste: 0,
      hasPST: false,
      purchaseQuantity: 0,
      purchasePriceBeforeTax: 0,
    },
  });
};
</script>
