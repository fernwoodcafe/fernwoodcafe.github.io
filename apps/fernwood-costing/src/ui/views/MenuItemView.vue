CafeSupply
<template>
  <h2>
    <input
      @change="onMenuItemNameUpdated"
      :value="menuItem.menuItemName"
      :type="'text'"
    />
  </h2>
  <article>
    <section>
      <h2>Costing</h2>
      <form @submit.prevent>
        <FrcSelectOption
          :label="'Add Ingredient'"
          :options="ingredientOptions"
          :optionKey="'supplyName'"
          @submitSelect="onClickNewIngredient"
        />
        <FrcSelectOption
          :label="'Add Packaging'"
          :options="packagingOptions"
          :optionKey="'supplyName'"
          @submitSelect="onClickNewPackaging"
        />
        <label
          >Total Cost
          <p>{{ formatMoney(menuItemTotalCost) }}</p>
        </label>
      </form>
    </section>
    <section>
      <h2>Weighted Average Pricing</h2>
      <form @submit.prevent>
        <label
          >Price @ {{ cafeGoals.weightedAverageMarkup }} Markup
          <p>{{ formatMoney(menuItemRecommendedPrice) }}</p>
        </label>
        <FrcInput
          :label="'Projected Percent Total Sales'"
          :value="menuItem.percentTotalSales"
          :type="'number'"
          @change="onPercentageTotalSalesChanged"
        />
        <FrcInput
          :label="'Chosen Menu Item Price'"
          :value="menuItem.menuItemPrice"
          :type="'number'"
          @change="onChosenMenuItemPriceChange"
        />
        <label
          >Actual Markup
          <p>{{ menuItemActualMarkup }}</p>
        </label>
      </form>
    </section>
  </article>
  <AgGridMenuItemSuppliesComponent
    :menuItem="menuItem"
    :suppliesList="suppliesList"
    :supplyTaxes="supplyTaxes"
    @menuItemSupplyUpdated="onMenuItemComponentUpdated"
    @menuItemSupplyDeleted="onMenuItemComponentDeleted"
  ></AgGridMenuItemSuppliesComponent>
</template>

<script setup lang="ts">
import type { DomainCommand } from "@packages/cqrs-es-types";
import { calculateMenuItemCost } from "@packages/domain/services";
import type {
  CafeGoals,
  CafeSupply,
  CafeSupplyTaxes,
  MenuItem,
  MenuItemComponent,
} from "@packages/domain/types";
import AgGridMenuItemSuppliesComponent from "@ui/components/AgGridMenuItemSuppliesComponent.vue";
import FrcInput from "@ui/components/FrcInput.vue";
import FrcSelectOption from "@ui/components/FrcSelectOption.vue";
import { formatLink, formatMoney } from "@ui/formatters";
import isInstance from "@ui/typeGuards/isInstance.js";
import type { ReactiveArray } from "@ui/types/ReactiveArray";
import { computed } from "vue";

type Props = {
  menuItem: MenuItem;
  suppliesList: ReactiveArray<CafeSupply>;
  cafeGoals: CafeGoals;
  supplyTaxes: CafeSupplyTaxes;
  sendCommand: (Command: DomainCommand) => Promise<void>;
};

const props = defineProps<Props>();

const ingredientOptions = props.suppliesList.items.filter(
  (s) => s.supplyType.toLocaleLowerCase() == "ingredient"
);

const packagingOptions = props.suppliesList.items.filter(
  (s) => s.supplyType.toLocaleLowerCase() == "packaging"
);

const addNewMenuItemComponent = async (supply: Partial<CafeSupply>) => {
  const menuItemSupply: MenuItemComponent = {
    uniqueId: crypto.randomUUID(),
    menuItemUniqueId: props.menuItem.uniqueId,
    supplyUniqueId: supply.uniqueId,
    menuItemSupplyQuantity: 0,
    menuItemSupplyUnits: "-",
  };

  await props.sendCommand({
    type: "add_supply_to_menu_item",
    payload: menuItemSupply,
  });
};

const onClickNewIngredient = addNewMenuItemComponent;
const onClickNewPackaging = addNewMenuItemComponent;

/**
 * Remember:
 * - Vuejs encourages one-way props binding.
 * - Vuejs discourages putting a `watch` on props.
 * - Props down; events up.
 * - Avoid watching props.
 * - Lotsa events.
 */
const onUpdateMenuItem = async (key: keyof MenuItem, event: Event) => {
  if (!isInstance(event.target, HTMLInputElement)) return;

  console.log("onUpdateMenuItem", key, event.target.value);

  await props.sendCommand({
    type: "update_menu_item",
    payload: {
      ...props.menuItem,
      [key]: event.target.value,
    },
  });
};

const onChosenMenuItemPriceChange = (event: Event) =>
  onUpdateMenuItem("menuItemPrice", event);

const onPercentageTotalSalesChanged = (event: Event) =>
  onUpdateMenuItem("percentTotalSales", event);

const onMenuItemNameUpdated = async (event: Event) => {
  await onUpdateMenuItem("menuItemName", event);

  if (!isInstance(event.target, HTMLInputElement)) return;

  window.location.hash = window.location.hash.replace(
    formatLink(props.menuItem.menuItemName.toLocaleLowerCase()),
    formatLink(event.target.value.toLocaleLowerCase())
  );
};

const onMenuItemComponentUpdated = (data: MenuItemComponent) =>
  props.sendCommand({
    type: "update_supply_on_menu_item",
    payload: data,
  });

const onMenuItemComponentDeleted = (data: MenuItemComponent) =>
  props.sendCommand({
    type: "remove_supply_from_menu_item",
    payload: data,
  });

const menuItemTotalCost = computed(() =>
  calculateMenuItemCost(
    props.supplyTaxes,
    props.menuItem.menuItemComponents,
    props.suppliesList.items
  )
);
const menuItemRecommendedPrice = computed(
  () => menuItemTotalCost.value * props.cafeGoals.weightedAverageMarkup
);
const menuItemActualMarkup = computed(() => {
  const cost = menuItemTotalCost.value;
  const markup = props.menuItem.menuItemPrice / cost;
  return isNaN(markup) ? "-" : markup.toFixed(2);
});
</script>

<style scoped>
article {
  display: flex;
  column-gap: 50px;
}

section {
  flex: 0 0 auto;
  padding-left: 10px;
  padding-right: 10px;
  border: thin solid var(--color-secondary);
  border-radius: 5px;
  margin-bottom: 20px;
}

form {
  display: flex;
  column-gap: 5px;
  margin-bottom: 10px;
}

form > label,
form > fieldset {
  flex: 0 1 auto;
  border: none;
  padding: 0 10px;
  border-radius: 5px;
}

form > label > p,
form > label > input {
  font-weight: normal;
  display: block; /* own line */
}
</style>
