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
      <h2>Set Menu Item Price</h2>
      <form @submit.prevent>
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
        <fieldset>
          <label>Price @ {{ cafeGoals.targetWeightedAverageMarkup }}</label>
          <p>{{ formatMoney(menuItemBaselinePrice) }}</p>
        </fieldset>
        <fieldset>
          <label>Actual Markup</label>
          <p>{{ menuItemMarkupComputed.toFixed(2) }}</p>
        </fieldset>
        <fieldset>
          <label>Percent Category Sales</label>
          <p>{{ menuItemPercentCategorySalesComputed.toFixed(2) }}</p>
        </fieldset>
        <fieldset>
          <label>Weighted Markup</label>
          <p>{{ menuItemWeightedMarkupValue.toFixed(2) }}</p>
        </fieldset>
        <fieldset>
          <label>Category Weighted Average Markup</label>
          <p>{{ categoryWeightedAverageMarkupComputed.toFixed(2) }}</p>
        </fieldset>
      </form>
    </section>
    <section>
      <h2>Add Menu Item Components</h2>
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
        <fieldset>
          <label>Total Cost</label>
          <p>{{ formatMoney(menuItemCostComputed) }}</p>
        </fieldset>
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
import {
  categoryPercentTotalSales,
  categoryWeightedAverageMarkup,
  menuItemCost,
  menuItemMarkup,
  menuItemPercentCategorySales,
  menuItemPriceAtMarkup,
  menuItemWeightedMarkup,
} from "@packages/domain/services";
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
import isInstance from "@ui/typeGuards/isInstance";
import type { ReactiveArray } from "@ui/types/ReactiveArray";
import { computed } from "vue";

type Props = {
  menuItem: MenuItem;
  menuItemsList: ReactiveArray<MenuItem>;
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

const menuItemCostComputed = computed(() =>
  menuItemCost(
    props.supplyTaxes,
    props.menuItem.menuItemComponents,
    props.suppliesList.items
  )
);
const menuItemBaselinePrice = computed(() =>
  menuItemPriceAtMarkup(
    menuItemCostComputed.value,
    props.cafeGoals.targetWeightedAverageMarkup
  )
);
const menuItemMarkupComputed = computed(() =>
  menuItemMarkup(props.menuItem.menuItemPrice, menuItemCostComputed.value)
);

const menuItemPercentCategorySalesComputed = computed(() =>
  menuItemPercentCategorySales(
    props.menuItem.percentTotalSales,
    categoryPercentTotalSales(props.menuItemsList.items)
  )
);

const menuItemWeightedMarkupValue = computed(() =>
  menuItemWeightedMarkup(
    menuItemMarkupComputed.value,
    menuItemPercentCategorySalesComputed.value
  )
);

const categoryWeightedAverageMarkupComputed = computed(() =>
  categoryWeightedAverageMarkup(
    props.supplyTaxes,
    props.suppliesList.items,
    props.menuItemsList.items
  )
);
</script>

<style scoped>
article {
  display: flex;
  flex-wrap: wrap;
  column-gap: 50px;
}

section {
  flex: 0 0 100%;
  padding-left: 10px;
  padding-right: 10px;
  border-radius: 5px;
  margin-bottom: 20px;
}

section > form {
  display: flex;
  column-gap: 10px;
}

section > form > fieldset {
  background-color: var(--color-info);
  padding: 10px;
  border-radius: 5px;
}

section > form > fieldset > :deep(label) {
  display: block;
  padding: 5px;
  text-align: center;
}

section > form > fieldset > p,
section > form > fieldset > :deep(input) {
  display: block;
  padding: 5px;
  margin: auto;
  text-align: center;
}
</style>
