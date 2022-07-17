<template>
  <h2>{{ menuItem.menuItemId }}</h2>
  <button @click="onClickNewIngredient">Add Ingredient</button>
  <button @click="onClickNewPackaging">Add Packaging</button>
  <AgGridMenuItemComponent
    :menuItem="menuItem"
    :suppliesList="suppliesList"
    @gridDataUpdate="onGridDataUpdated"
  ></AgGridMenuItemComponent>
</template>

<script setup lang="ts">
import AgGridMenuItemComponent from "@/components/AgGridMenuItemComponent.vue";

type Props = {
  menuItem: CafeDomain.MenuItem;
  suppliesList: ReactiveArray<CafeDomain.MenuItemSupply>;
  updateMenuItem: (data: any) => Promise<void>;
  insertMenuItem: (data: any) => Promise<void>;
};

const props = defineProps<Props>();

const onGridDataUpdated = (data) => {
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

  props.updateMenuItem(props.menuItem);
};

const onClickNewIngredient = () => {
  const ingredient = {
    id: self.crypto.randomUUID(),
    supplyId: "TODO Select ingredient.",
    unitQuantity: 0,
  };

  props.menuItem.ingredients.push(ingredient);

  props.updateMenuItem(props.menuItem);
};

const onClickNewPackaging = () => {
  const packaging = {
    id: self.crypto.randomUUID(),
    supplyId: "TODO Select packaging.",
    unitQuantity: 0,
  };

  props.menuItem.packaging.push(packaging);

  props.updateMenuItem(props.menuItem);
};
</script>
