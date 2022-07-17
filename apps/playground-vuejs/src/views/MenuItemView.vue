<template>
  <h2>{{ menuItem.menuItemId }}</h2>
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
  const ingredientIndex = props.menuItem.ingredients.findIndex(
    (item) => item.id == data.id
  );
  if (ingredientIndex > 0) {
    props.menuItem.ingredients[ingredientIndex] = data;
  }
  const packagingIndex = props.menuItem.packaging.findIndex(
    (item) => item.id == data.id
  );
  if (packagingIndex > 0) {
    props.menuItem.packaging[packagingIndex] = data;
  }

  props.sendCommand({
    type: "update_menu_item",
    payload: props.menuItem,
  });
};

const onClickNewIngredient = () => {
  const ingredient = {
    id: self.crypto.randomUUID(),
    supplyId: "",
    unitQuantity: 0,
  };

  props.menuItem.ingredients.push(ingredient);

  props.sendCommand({
    type: "update_menu_item",
    payload: props.menuItem,
  });
};

const onClickNewPackaging = () => {
  const packaging = {
    id: self.crypto.randomUUID(),
    supplyId: "",
    unitQuantity: 0,
  };

  props.menuItem.packaging.push(packaging);

  props.sendCommand({
    type: "update_menu_item",
    payload: props.menuItem,
  });
};
</script>
