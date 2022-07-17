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
  suppliesList: ReactiveArray<CafeDomain.Supply>;
  sendCommand: (Command: CafeDomain.DomainCommand) => Promise<void>;
};

const props = defineProps<Props>();

const onMenuItemUpdated = (data) => {
  props.sendCommand({
    type: "update_menu_item",
    payload: data,
  });
};

const onClickNewIngredient = () => {};

const onClickNewPackaging = () => {};
</script>
