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

type Props = {
  menuItem: CafeDomain.MenuItem;
  suppliesList: ReactiveArray<CafeDomain.Supply>;
  sendCommand: (Command: CafeDomain.DomainCommand) => Promise<void>;
};

const props = defineProps<Props>();

const selectedIngredientId = props.suppliesList.items[0].uniqueId;
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

  props.menuItem.menuItemSupplies.push({
    uniqueId: crypto.randomUUID(),
    supplyUniqueId: selectedIngredientId,
  });

  props.sendCommand({
    type: "update_menu_item",
    payload: props.menuItem,
  });
};

const onClickNewPackaging = () => {};
</script>
