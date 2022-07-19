<template>
  <h2>{{ menuItem.menuItemName }}</h2>
  <dl>
    <div>
      <dt>Total Cost</dt>
      <dd>{{ formatMoney(menuItemTotalCost) }}</dd>
    </div>
    <div>
      <dt>Recommended Menu Price @ 3.5</dt>
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
import FrcSelectOption from "@/components/FrcSelectOption.vue";
import formatMoney from "@/formatters/formatMoney";
import type {
  DomainCommand,
  MenuItem,
  MenuItemSupply,
  Supply,
} from "@/types/CafeDomain";
import type { ReactiveArray } from "@/types/ReactiveArray";
import { computed, ref } from "vue";

type Props = {
  menuItem: MenuItem;
  suppliesList: ReactiveArray<Supply>;
  sendCommand: (Command: DomainCommand) => Promise<void>;
};

const props = defineProps<Props>();

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

const onClickNewIngredient = (data) => addSupply(data);
const onClickNewPackaging = (data) => addSupply(data);

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

      const unitPrice =
        target == null
          ? 0
          : target.purchasePriceBeforeTax / target.purchaseQuantity;

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
  justify-content: flex-start;
}

fieldset {
  flex: 0 0 50%;
  border: none;
}

dl {
  font-size: 1rem;
  line-height: 1.2rem;
  padding: 10px;
  border: thin solid gray;
}

dl div {
  display: flex;
  justify-content: flex-start;
}

dl div dt {
  font-weight: 500;
  flex: 0 0 32%;
}

dl div dd {
  flex: 0 0 25%;
}
</style>
