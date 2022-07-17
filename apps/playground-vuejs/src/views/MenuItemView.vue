<template>
  <h2>{{ menuItem.menuItemName }}</h2>
  <p>Total Cost {{ formatMoney(menuItemTotalCost) }}</p>
  <p>Reommended Price {{ formatMoney(menuItemRecommendedPrice) }}</p>

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
import formatMoney from "@/components/formatMoney";
import { suppliesList } from "@/router";
import {
  DomainCommand,
  MenuItem,
  MenuItemSupply,
  Supply,
} from "@/types/CafeDomain";
import { computed } from "@vue/reactivity";
import { ref } from "vue";

type Props = {
  menuItem: MenuItem;
  suppliesList: ReactiveArray<Supply>;
  sendCommand: (Command: DomainCommand) => Promise<void>;
};

const props = defineProps<Props>();

const selectedIngredient = ref<Partial<Supply>>({});
const ingredientOptions = props.suppliesList.items.filter(
  (s) => s.supplyType.toLocaleLowerCase() == "ingredient"
);

const selectedPackaging = ref<Partial<Supply>>({});
const packagingOptions = props.suppliesList.items.filter(
  (s) => s.supplyType.toLocaleLowerCase() == "packaging"
);

const addSupply = (supply: Partial<Supply>) => {
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

const onMenuItemSupplyUpdated = (data: MenuItemSupply) =>
  props.sendCommand({
    type: "update_supply_on_menu_item",
    payload: data,
  });

const onMenuItemSupplyDeleted = (data: MenuItemSupply) =>
  props.sendCommand({
    type: "remove_supply_from_menu_item",
    payload: data,
  });

const calculateMenuItemTotalCost = () =>
  props.menuItem.menuItemSupplies
    .map((menuItemSupply) => {
      const target = props.suppliesList.items.find(
        (s) => s.uniqueId == menuItemSupply.supplyUniqueId
      );

      const unitPrice = target.purchasePriceBeforeTax / target.purchaseQuantity;

      return {
        unitPrice,
        ...menuItemSupply,
      };
    })
    .reduce((acc, next) => acc + next.supplyQuantity * next.unitPrice, 0);

const calculateMenuItemRecommendedMarkup = () => menuItemTotalCost.value * 3.5;

const menuItemTotalCost = computed(() => calculateMenuItemTotalCost());
const menuItemRecommendedPrice = computed(() =>
  calculateMenuItemRecommendedMarkup()
);
</script>

<style>
form {
  display: flex;
}
fieldset {
  flex-basis: 50%;
}
</style>
