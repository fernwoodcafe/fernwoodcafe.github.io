Supply
<template>
  <h1>Supplies</h1>
  <input type="button" @click="onClickNewSupply" value="New Supply" />
  <AgGridSuppliesComponent
    :suppliesList="suppliesList"
    :supplyTaxes="supplyTaxes"
    @supplyUpdated="onSupplyUpdated"
    @supplyDeleted="onSupplyDeleted"
  ></AgGridSuppliesComponent>
</template>

<script setup lang="ts">
import type { DomainCommand } from "@packages/cqrs-es-types";
import type { Supply, SupplyTaxes } from "@packages/domain/types";
import AgGridSuppliesComponent from "@ui/components/AgGridSuppliesComponent.vue";
import type { ReactiveArray } from "@ui/types/ReactiveArray";

type Props = {
  suppliesList: ReactiveArray<Supply>;
  supplyTaxes: SupplyTaxes;
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
      supplyUnits: "-",
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
