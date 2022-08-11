<template>
  <h2>
    <FrcInputText
      :value="menuItem.menuItemName"
      @changeInText="onMenuItemNameUpdated"
    />
  </h2>
  <ul>
    <li>Name: {{ menuItem.menuItemName }}</li>
    <li>Price: {{ menuItem.menuItemPrice }}</li>
  </ul>
  <article>
    <section>
      <h2>Set Menu Item Price</h2>
      <form @submit.prevent>
        <FrcInputPercent
          :label="'Projected Percent Total Sales'"
          :value="menuItem.percentTotalSales"
          @changeInPercent="onPercentageTotalSalesChanged"
        />
        <FrcInputMoney
          :label="'Chosen Price'"
          :value="menuItem.menuItemPrice"
          @changeInMoney="onChosenMenuItemPriceChange"
        />
        <fieldset>
          <label
            >Base Price @ {{ cafeGoals.targetWeightedAverageMarkup }}</label
          >
          <p>{{ formatMoney(menuItemBaselinePrice) }}</p>
        </fieldset>
        <fieldset>
          <label>Actual Markup</label>
          <p>{{ menuItemMarkupComputed.toFixed(2) }}</p>
        </fieldset>
        <fieldset>
          <label>Percent Category Sales</label>
          <p>{{ formatPercent(menuItemPercentCategorySalesComputed) }}</p>
        </fieldset>
        <fieldset>
          <label>Weighted Markup</label>
          <p>{{ menuItemWeightedMarkupValue.toFixed(2) }}</p>
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
import FrcSelectOption from "@ui/components/FrcSelectOption.vue";
import { formatLink, formatMoney, formatPercent } from "@ui/formatters";
import type { ReactiveArray } from "@ui/types/ReactiveArray";
import { computed } from "vue";
import FrcInputMoney from "../components/FrcInputMoney.vue";
import FrcInputPercent from "../components/FrcInputPercent.vue";
import FrcInputText from "../components/FrcInputText.vue";

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
const onPercentageTotalSalesChanged = async (percentTotalSales: number) => {
  await props.sendCommand({
    type: "update_menu_item",
    payload: {
      ...props.menuItem,
      percentTotalSales,
    },
  });
};

const onChosenMenuItemPriceChange = async (menuItemPrice: number) => {
  await props.sendCommand({
    type: "update_menu_item",
    payload: {
      ...props.menuItem,
      menuItemPrice,
    },
  });
};

const onMenuItemNameUpdated = async (menuItemName: string) => {
  await props.sendCommand({
    type: "update_menu_item",
    payload: {
      ...props.menuItem,
      menuItemName,
    },
  });

  window.location.hash = window.location.hash.replace(
    formatLink(props.menuItem.menuItemName.toLocaleLowerCase()),
    formatLink(menuItemName.toLocaleLowerCase())
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
  flex-direction: column;
}

section {
  flex: 0 0 100%;
  padding-left: 10rem;
  padding-right: 10rem;
  border-radius: 5rem;
  margin-bottom: 20rem;
}

section > form {
  display: flex;
  column-gap: 10rem;
}

section > form > fieldset {
  display: flex;
  flex-direction: column;
  gap: 10rem;
  justify-content: space-between;

  background-color: var(--color-info);
  padding: 10rem;
  border-radius: 5rem;
}

section > form > fieldset > :deep(label) {
  text-align: center;
}

section > form > fieldset > p,
section > form > fieldset > :deep(input),
section > form > fieldset > :deep(select) {
  text-align: center;
  margin: 0;
  line-height: 20rem;
}
</style>
