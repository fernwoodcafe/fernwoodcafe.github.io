Supply
<template>
  <h1>Composite Supplies</h1>
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
</template>

<script setup lang="ts">
import type { CompositeSupply, Supply } from "@packages/domain/types";
import type { CafeCommandUnion } from "@packages/domain/types/CafeCommandUnion";
import AgGridCompositeSuppliesComponent from "@ui/components/AgGridCompositeSuppliesComponent.vue";
import type { ReactiveArray } from "@ui/types/ReactiveArray";

type Props = {
  compositeSuppliesList: ReactiveArray<CompositeSupply>;
  suppliesList: ReactiveArray<Supply>;
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
</script>
