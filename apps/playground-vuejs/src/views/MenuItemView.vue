<template>
  <h2>{{ menuItem.menuItemName }}</h2>
  <form @submit.prevent>
    <fieldset>
      <select v-model="selectedIngredient">
        <option disabled :value="{}">Please select one</option>
        <option v-for="option in ingredientOptions" :value="option">
          {{ option.supplyName }}
        </option>
      </select>
      <button @click="onClickNewIngredient">
        Add Ingredient - {{ selectedIngredient.supplyName }}
      </button>
    </fieldset>
    <fieldset>
      <select v-model="selectedPackaging">
        <option disabled :value="{}">Please select one</option>
        <option v-for="option in packagingOptions" :value="option">
          {{ option.supplyName }}
        </option>
      </select>
      <button @click="onClickNewPackaging">
        Add Packaging - {{ selectedPackaging.supplyName }}
      </button>
    </fieldset>
  </form>
  <AgGridMenuItemSuppliesComponent
    :menuItem="menuItem"
    :suppliesList="suppliesList"
    @menuItemSupplyUpdated="onMenuItemSupplyUpdated"
    @menuItemSupplyDeleted="onMenuItemSupplyDeleted"
  ></AgGridMenuItemSuppliesComponent>
</template>

<script setup lang="ts">
import AgGridMenuItemSuppliesComponent from "@/components/AgGridMenuItemSuppliesComponent.vue";
import { suppliesList } from "@/router";
import { ref } from "vue";

type Props = {
  menuItem: CafeDomain.MenuItem;
  suppliesList: ReactiveArray<CafeDomain.Supply>;
  sendCommand: (Command: CafeDomain.DomainCommand) => Promise<void>;
};

const props = defineProps<Props>();

const selectedIngredient = ref<CafeDomain.Supply>({});
const ingredientOptions = props.suppliesList.items.filter(
  (s) => s.supplyType.toLocaleLowerCase() == "ingredient"
);

const selectedPackaging = ref<CafeDomain.Supply>({});
const packagingOptions = props.suppliesList.items.filter(
  (s) => s.supplyType.toLocaleLowerCase() == "packaging"
);

const addSupply = (supply: CafeDomain.Supply) => {
  const menuItemSupply = {
    uniqueId: crypto.randomUUID(),
    menuItemUniqueId: props.menuItem.uniqueId,
    supplyUniqueId: supply.uniqueId,
    supplyName: supply.supplyName,
  };

  props.sendCommand({
    type: "add_supply_to_menu_item",
    payload: menuItemSupply,
  });
};

const onClickNewIngredient = () => {
  if (selectedIngredient.value == null) return;
  addSupply(selectedIngredient.value);
};

const onClickNewPackaging = () => {
  if (selectedPackaging.value == null) return;
  addSupply(selectedPackaging.value);
};

const onMenuItemSupplyUpdated = (data: CafeDomain.MenuItemSupply) =>
  props.sendCommand({
    type: "update_supply_on_menu_item",
    payload: data,
  });

const onMenuItemSupplyDeleted = (data: CafeDomain.MenuItemSupply) =>
  props.sendCommand({
    type: "remove_supply_from_menu_item",
    payload: data,
  });
</script>

<style>
form {
  display: flex;
}
fieldset {
  flex-basis: 50%;
}
</style>
