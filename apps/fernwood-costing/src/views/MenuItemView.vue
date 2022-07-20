<template>
  <h2>
    <FrcInput
      @change="onMenuItemNameUpdated"
      :value="menuItem.menuItemName"
      type="text"
    />
  </h2>
  <dl>
    <div>
      <dt>Total Cost</dt>
      <dd>{{ formatMoney(menuItemTotalCost) }}</dd>
    </div>
    <div>
      <dt>Recommended Menu Price @ {{ cafeGoals.weightedAverageMarkup }}</dt>
      <dd>{{ formatMoney(menuItemRecommendedPrice) }}</dd>
    </div>
  </dl>

  <form @submit.prevent>
    <FrcSelectOption
      :title="'Ingredient'"
      :options="ingredientOptions"
      :optionKey="'supplyName'"
      @submitSelect="onClickNewIngredient"
    />
    <FrcSelectOption
      :title="'Packaging'"
      :options="packagingOptions"
      :optionKey="'supplyName'"
      @submitSelect="onClickNewPackaging"
    />
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
import FrcInput from "@/components/FrcInput.vue";
import FrcSelectOption from "@/components/FrcSelectOption.vue";
import formatLink from "@/formatters/formatLink";
import formatMoney from "@/formatters/formatMoney";
import calculateMenuItemTotalCost from "@/services/calculateMenuItemTotalCost";
import type {
CafeGoals,
DomainCommand,
MenuItem,
MenuItemSupply,
Supply
} from "@/types/CafeDomain";
import type { ReactiveArray } from "@/types/ReactiveArray";
import { computed } from "vue";

type Props = {
  menuItem: MenuItem;
  suppliesList: ReactiveArray<Supply>;
  cafeGoals: CafeGoals;
  sendCommand: (Command: DomainCommand) => Promise<void>;
};

const props = defineProps<Props>();

const ingredientOptions = props.suppliesList.items.filter(
  (s) => s.supplyType.toLocaleLowerCase() == "ingredient"
);

const packagingOptions = props.suppliesList.items.filter(
  (s) => s.supplyType.toLocaleLowerCase() == "packaging"
);

const addSupply = (supply: Partial<Supply>) => {
  const menuItemSupply: MenuItemSupply = {
    uniqueId: crypto.randomUUID(),
    menuItemUniqueId: props.menuItem.uniqueId,
    supplyUniqueId: supply.uniqueId,
    supplyQuantity: 0,
  };

  props.sendCommand({
    type: "add_supply_to_menu_item",
    payload: menuItemSupply,
  });
};

const onClickNewIngredient = (data) => addSupply(data);
const onClickNewPackaging = (data) => addSupply(data);

const onMenuItemNameUpdated = async (event: Event) => {
  console.log("onMenuItemNameUpdated");
  if (event.target instanceof HTMLInputElement) {
    await props.sendCommand({
      type: "update_menu_item",
      payload: {
        ...props.menuItem,
        menuItemName: event.target.value,
      },
    });

    console.log(
      "onMenuItemNameUpdated",
      props.menuItem.menuItemName.toLocaleLowerCase(),
      event.target.value.toLocaleLowerCase()
    );

    window.location.hash = window.location.hash.replace(
      formatLink(props.menuItem.menuItemName.toLocaleLowerCase()),
      formatLink(event.target.value.toLocaleLowerCase())
    );
  }
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

const calculateMenuItemRecommendedMarkup = () =>
  menuItemTotalCost.value * props.cafeGoals.weightedAverageMarkup;

const menuItemTotalCost = computed(() =>
  calculateMenuItemTotalCost(props.menuItem, props.suppliesList.items)
);
const menuItemRecommendedPrice = computed(() =>
  calculateMenuItemRecommendedMarkup()
);
</script>

<style>
form {
  display: flex;
  column-gap: 5px;
  margin-bottom: 10px;
}

fieldset {
  flex: 0 0 auto;
  border: none;
  padding: 0;
}

dl {
  font-size: 1rem;
  line-height: 1.2rem;
  display: flex;
  column-gap: 10px;
}

dl div {
  background-color: var(--color-info);
  border-radius: 5px;
  padding: 15px;
}

dl div dt {
  font-weight: bolder;
  text-align: left;
  margin-bottom: 5px;
}

dl div dd {
  text-align: left;
  margin: 0;
}
</style>
