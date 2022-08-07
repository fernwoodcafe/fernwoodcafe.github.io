InventoryItem
<template>
  <h1>Menu Items</h1>
  <input type="button" @click="onClickNewMenuItem" value="New Menu Item" />
  <AgGridMenuItemsComponent
    :menuItemsList="menuItemsList"
    :suppliesList="suppliesList"
    :cafeGoals="cafeGoals"
    @menuItemUpdated="onMenuItemUpdated"
    @menuItemDeleted="onMenuItemDeleted"
    @menuItemEditClick="onMenuItemEditClick"
  ></AgGridMenuItemsComponent>

  <RouterView :key="$route.fullPath" />
</template>

<script setup lang="ts">
import AgGridMenuItemsComponent from "@ui/components/AgGridMenuItemsComponent.vue";
import type { DomainCommand } from "@packages/cqrs-es-types";
import type {
  CafeGoals,
  InventoryItem,
  MenuItem,
} from "@packages/domain/types";
import { formatLink } from "@ui/formatters";
import type { ReactiveArray } from "@ui/types/ReactiveArray";
import { ref } from "vue";
import { useRouter } from "vue-router";

type Props = {
  menuItemsList: ReactiveArray<MenuItem>;
  suppliesList: ReactiveArray<InventoryItem>;
  cafeGoals: CafeGoals;
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
      percentTotalSales: 0,
      menuItemPrice: 0,
      menuItemSupplies: [],
    },
  });
};

const onMenuItemUpdated = (menuItem: MenuItem) => {
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

const router = useRouter();
const onMenuItemEditClick = (menuItem: MenuItem) => {
  console.log("onMenuItemEditClick", JSON.stringify(menuItem));
  router.push(`menu-items/${formatLink(menuItem.menuItemName)}`);
};
</script>
