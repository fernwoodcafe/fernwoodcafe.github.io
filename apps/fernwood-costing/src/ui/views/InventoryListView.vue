<template>
  <h1>Inventory <small>- Coming Soon</small></h1>

  <input
    type="button"
    @click="onClickNewInventoryItem"
    value="New Inventory Sheet"
  />
  <AgGridInventorySheetComponent
    :inventorySheetsList="inventorySheetsList"
  ></AgGridInventorySheetComponent>
</template>

<script setup lang="ts">
import type { CafeCommandUnion, InventorySheet } from "@packages/domain/types";
import AgGridInventorySheetComponent from "@ui/components/AgGridInventorySheetComponent.vue";
import type { ReactiveArray } from "@ui/types/ReactiveArray";

type Props = {
  inventorySheetsList: ReactiveArray<InventorySheet>;
  sendCommand: (Command: CafeCommandUnion) => Promise<void>;
};

const props = defineProps<Props>();

const onClickNewInventoryItem = () => {
  props.sendCommand({
    type: "create_inventory_sheet",
    payload: {
      uniqueId: crypto.randomUUID(),
      dateStarted: new Date(Date.now()),
      dateCompleted: null,
      items: [],
    },
  });
};
</script>
