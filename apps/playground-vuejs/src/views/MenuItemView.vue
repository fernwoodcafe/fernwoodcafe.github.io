<template>
  <h2>{{ menuItem.menuItemId }}</h2>
  <button @click="onClickNewIngredient">Add Ingredient</button>
  <button @click="onClickNewPackaging">Add Packaging</button>
  <AgGridMenuItemComponent
    :menuItem="menuItem"
    :suppliesList="suppliesList"
  ></AgGridMenuItemComponent>
</template>

<script setup lang="ts">
import AgGridMenuItemComponent from "@/components/AgGridMenuItemComponent.vue";

type Props = {
  menuItem: CafeMenuItem;
  suppliesList: ReactiveArray<CafeSupply>;
};

const props = defineProps<Props>();

const onClickNewIngredient = () => {
  const ingredient = {
    id: self.crypto.randomUUID(),
    supplyId: "",
  };

  props.menuItem.ingredients.push(ingredient);
};

const onClickNewPackaging = () => {
  const packaging = {
    id: self.crypto.randomUUID(),
    supplyId: "",
  };

  props.menuItem.packaging.push(packaging);
};
</script>
