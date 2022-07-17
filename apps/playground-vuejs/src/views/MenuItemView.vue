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
import { ref } from "vue";

type Props = {
  menuItem: CafeDomain.MenuItem;
  suppliesList: ReactiveArray<CafeDomain.Supply>;
  sendCommand: (Command: CafeDomain.DomainCommand) => Promise<void>;
};

const props = defineProps<Props>();

const selectedIngredient = ref<CafeDomain.Supply>({});
const ingredientOptions = props.suppliesList.items.filter(
  (s) => s.supplyType == "ingredient"
);

const onMenuItemUpdated = (data) => {
  props.sendCommand({
    type: "update_menu_item",
    payload: data,
  });
};

const onClickNewIngredient = () => {
  console.log("onClickNewIngredient");

  if (selectedIngredient == null) return;

  const menuItemSupply = {
    uniqueId: crypto.randomUUID(),
    supplyUniqueId: selectedIngredient.value.uniqueId,
    supplyName: selectedIngredient.value.supplyName,
  };

  props.menuItem.menuItemSupplies.push(menuItemSupply);

  props.sendCommand({
    type: "update_menu_item",
    payload: props.menuItem,
  });
};

const onClickNewPackaging = () => {};
</script>
