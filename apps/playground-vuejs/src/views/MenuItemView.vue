<template>
  <h2>{{ menuItem.menuItemName }}</h2>
  <form>
    <fieldset>
      <select v-model="selectedIngredientId">
        <option v-for="option in ingredientOptions" :value="option.uniqueId">
          {{ option.supplyName }}
        </option>
      </select>
      <button @click="onClickNewIngredient">Add Ingredient</button>
    </fieldset>
    <fieldset>
      <select v-model="selectedPackaging">
        <option v-for="option in packagingOptions" :value="option.uniqueId">
          {{ option.supplyName }}
        </option>
      </select>
      <button @click="onClickNewPackaging">Add Packaging</button>
    </fieldset>
  </form>
  <AgGridMenuItemComponent
    :menuItem="menuItem"
    :suppliesList="suppliesList"
    @menuItemUpdated="onMenuItemUpdated"
  ></AgGridMenuItemComponent>
</template>

<script setup lang="ts">
import AgGridMenuItemComponent from "@/components/AgGridMenuItemComponent.vue";
import { suppliesList } from "@/router";

type Props = {
  menuItem: CafeDomain.MenuItem;
  suppliesList: ReactiveArray<CafeDomain.Supply>;
  sendCommand: (Command: CafeDomain.DomainCommand) => Promise<void>;
};

const props = defineProps<Props>();

const selectedIngredientId = props.suppliesList.items[0]?.uniqueId;
const ingredientOptions = props.suppliesList.items.filter(
  (s) => s.supplyType == "ingredient"
);

const selectedPackaging = null;
const packagingOptions = props.suppliesList.items.filter(
  (s) => s.supplyType == "packaging"
);

const onMenuItemUpdated = (data) => {
  props.sendCommand({
    type: "update_menu_item",
    payload: data,
  });
};

const onClickNewIngredient = () => {
  if (selectedIngredientId == null) return;

  const selectedIngredient = suppliesList.items.find(
    (s) => s.uniqueId == selectedIngredientId
  );

  props.menuItem.menuItemSupplies.push(selectedIngredient);

  props.sendCommand({
    type: "update_menu_item",
    payload: props.menuItem,
  });
};

const onClickNewPackaging = () => {};
</script>
