<template>
  <h2>{{ menuItem.menuItemName }}</h2>
  <button @click="onClickNewIngredient">Add Ingredient</button>
  <button @click="onClickNewPackaging">Add Packaging</button>
  <AgGridMenuItemComponent
    :menuItem="menuItem"
    :suppliesList="suppliesList"
    @menuItemUpdated="onMenuItemUpdated"
  ></AgGridMenuItemComponent>
</template>

<script setup lang="ts">
import AgGridMenuItemComponent from "@/components/AgGridMenuItemComponent.vue";

type Props = {
  menuItem: CafeDomain.MenuItem;
  suppliesList: ReactiveArray<CafeDomain.MenuItemSupply>;
  sendCommand: (Command: CafeDomain.DomainCommand) => Promise<void>;
};

const props = defineProps<Props>();

const onMenuItemUpdated = (data) => {
  props.sendCommand({
    type: "update_menu_item",
    payload: props.menuItem,
  });
};

const onClickNewIngredient = () => {
  const menuItemSupplies = {
    supplyUniqueId: "...",
  };

  props.menuItem.menuItemSupplies.push(menuItemSupplies);

  props.sendCommand({
    type: "update_menu_item",
    payload: props.menuItem,
  });
};

const onClickNewPackaging = () => {
  const packaging = {
    supplyUniqueId: "...",
  };

  props.menuItem.menuItemSupplies.push(packaging);

  props.sendCommand({
    type: "update_menu_item",
    payload: props.menuItem,
  });
};
</script>
