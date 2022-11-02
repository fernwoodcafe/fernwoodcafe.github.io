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
const onInventorySheetEditClick = (inventorySheet: InventorySheet) => {
  const linkDate = formatLink(inventorySheet.dateStarted);
  const linkId = formatLink(inventorySheet.uniqueId);

  // TODO [nice-to-have] Remove the linkId from the uri, because it might confuse humans.
  // Currently we have it there to disambiguate among inventory sheeets that share a dateStarted.
  router.push(`inventory/${linkDate}/${linkId}`);
};
</script>
