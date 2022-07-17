<template>
  <h1>Menu Items</h1>
  <button @click="onClickNewMenuItem">New Menu Item</button>
  <AgGridMenuItemsComponent
    :menuItemsList="menuItemsList"
    @menuItemUpdated="onMenuItemUpdated"
    @menuItemDeleted="onMenuItemDeleted"
  ></AgGridMenuItemsComponent>

  <RouterView :key="$route.fullPath" />
</template>

<script setup lang="ts">
import AgGridMenuItemsComponent from "@/components/AgGridMenuItemsComponent.vue";
import { DomainCommand, MenuItem } from "@/types/CafeDomain";
import { ref } from "vue";

type Props = {
  menuItemsList: ReactiveArray<MenuItem>;
  sendCommand: (Command: DomainCommand<MenuItem>) => Promise<void>;
};

const props = defineProps<Props>();

const newMenuItemName = ref("");

const onClickNewMenuItem = () => {
  console.log("onClickNewMenuItem", newMenuItemName);
  props.sendCommand({
    type: "create_menu_item",
    payload: {
      uniqueId: crypto.randomUUID(),
      menuItemName: `New Menu Item ${props.menuItemsList.items.length}`,
      menuItemSupplies: [],
    },
  });
};

const onMenuItemUpdated = (menuItem: MenuItem) => {
  console.log("onMenuItemUpdated", newMenuItemName);
  props.sendCommand({
    type: "update_menu_item",
    payload: menuItem,
  });
};

const onMenuItemDeleted = (menuItem: MenuItem) => {
  console.log("onMenuItemDeleted", newMenuItemName);
  props.sendCommand({
    type: "delete_menu_item",
    payload: menuItem,
  });
};
</script>
