<template>
  <h1>Inventory <small>- Coming Soon</small></h1>

  <input
    type="button"
    @click="onClickNewInventoryItem"
    value="New Inventory Sheet"
  />
  <AgGridInventorySheetComponent
    :inventorySheetsList="inventorySheetsList"
    @inventorySheetEditClick="onInventorySheetEditClick"
    @inventorySheetDeleted="onInventorySheetDeleted"
    @inventorySheetUpdated="onInventorySheetUpdated"
  ></AgGridInventorySheetComponent>
</template>

<script setup lang="ts">
import type { CafeCommandUnion, InventorySheet } from "@packages/domain/types";
import AgGridInventorySheetComponent from "@ui/components/AgGridInventorySheetComponent.vue";
import { formatLink } from "@ui/formatters";
import type { ReactiveArray } from "@ui/types/ReactiveArray";
import { useRouter } from "vue-router";

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
      inventoryItems: [],
    },
  });
};

const router = useRouter();

/**
 * TODO Disallow inventory sheeets that share a dateStarted. That requires a validation feature.
 */
const onInventorySheetEditClick = (inventorySheet: InventorySheet) => {
  const linkDate = formatLink(inventorySheet.dateStarted);

  router.push(`inventory/${linkDate}`);
};

const onInventorySheetDeleted = (inventorySheet: InventorySheet) => {
  props.sendCommand({
    type: "delete_inventory_sheet",
    payload: inventorySheet,
  });
};

const onInventorySheetUpdated = (inventorySheet: InventorySheet) =>
  props.sendCommand({
    type: "update_inventory_sheet",
    payload: inventorySheet,
  });
</script>
