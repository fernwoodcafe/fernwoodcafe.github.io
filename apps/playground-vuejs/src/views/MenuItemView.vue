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
  menuItem: CafeMenuItem;
  suppliesList: ReactiveArray<CafeSupply>;
  updateMenuItem: (data: any) => Promise<void>;
  insertMenuItem: (data: any) => Promise<void>;
};

const props = defineProps<Props>();

const onGridDataUpdated = (data) => {
  const index = props.menuItem.ingredients.findIndex(
    (item) => item.id == data.id
  );

  console.log(index, data);
  props.menuItem.ingredients[index] = data;

  props.updateMenuItem(props.menuItem);
};

const onClickNewIngredient = () => {
  const ingredient = {
    id: self.crypto.randomUUID(),
    supplyId: "TODO Give this ingredient a name.",
    unitQuantity: 0,
  };

  props.menuItem.ingredients.push(ingredient);

  props.updateMenuItem(props.menuItem);
};

const onClickNewPackaging = () => {
  const packaging = {
    id: self.crypto.randomUUID(),
    supplyId: "TODO Give this packaging a name.",
    unitQuantity: 0,
  };

  props.menuItem.packaging.push(packaging);

  props.updateMenuItem(props.menuItem);
};
</script>
