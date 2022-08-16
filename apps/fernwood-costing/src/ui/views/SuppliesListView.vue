Supply
<template>
  <h1>Supplies</h1>
  <input type="button" @click="onClickNewSupply" value="New Supply" />
  <input
    type="button"
    @click="onClickNewCompositeSupply"
    value="New Composite Supply"
  />
  <AgGridCompositeSuppliesComponent
    :compositeSuppliesList="compositeSuppliesList"
    :suppliesList="suppliesList"
    @compositeSupplyUpdated="onCompositeSupplyUpdated"
    @compositeSupplyDeleted="onCompositeSupplyDeleted"
  ></AgGridCompositeSuppliesComponent>
  <AgGridSuppliesComponent
    :suppliesList="suppliesList"
    :supplyTaxes="supplyTaxes"
    @supplyUpdated="onSupplyUpdated"
    @supplyDeleted="onSupplyDeleted"
  ></AgGridSuppliesComponent>
</template>

<script setup lang="ts">
import type {
  CompositeSupply,
  Supply,
  SupplyTaxes,
} from "@packages/domain/types";
import type { CafeCommandUnion } from "@packages/domain/types/CafeCommandUnion";
import AgGridCompositeSuppliesComponent from "@ui/components/AgGridCompositeSuppliesComponent.vue";
import AgGridSuppliesComponent from "@ui/components/AgGridSuppliesComponent.vue";
import type { ReactiveArray } from "@ui/types/ReactiveArray";

type Props = {
  compositeSuppliesList: ReactiveArray<CompositeSupply>;
  suppliesList: ReactiveArray<Supply>;
  supplyTaxes: SupplyTaxes;
  sendCommand: (Command: CafeCommandUnion) => Promise<void>;
};

const props = defineProps<Props>();

const onCompositeSupplyUpdated = (compositeSupply: CompositeSupply) =>
  props.sendCommand({
    type: "update_composite_supply",
    payload: compositeSupply,
  });

const onCompositeSupplyDeleted = (compositeSupply: CompositeSupply) => {
  props.sendCommand({
    type: "delete_composite_supply",
    payload: compositeSupply,
  });
};

const onClickNewCompositeSupply = () => {
  props.sendCommand({
    type: "create_composite_supply",
    payload: {
      uniqueId: crypto.randomUUID(),
      compositeSupplyName: "New Composite Supply",
      compositeSupplyType: "ingredient",
      compositeSupplyUnits: "gram",
      supplies: [],
    },
  });
};

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
