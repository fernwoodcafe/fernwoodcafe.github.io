<template>
  <h1>
    Menu Items
    <small>
      (Category Weighted Average Markup:
      {{ categoryWeightedAverageMarkupComputed.toFixed(2) }})
    </small>
  </h1>
  <input type="button" @click="onClickNewMenuItem" value="New Menu Item" />
  <AgGridMenuItemsComponent
    :menuItemsList="menuItemsList"
    :suppliesList="suppliesList"
    :supplyTaxes="supplyTaxes"
    :cafeGoals="cafeGoals"
    @menuItemUpdated="onMenuItemUpdated"
    @menuItemDeleted="onMenuItemDeleted"
    @menuItemEditClick="onMenuItemEditClick"
  ></AgGridMenuItemsComponent>
</template>

<script setup lang="ts">
import { categoryWeightedAverageMarkup } from "@packages/domain/services";
import type {
  CafeGoals,
  MenuItem,
  Supply,
  SupplyTaxes,
} from "@packages/domain/types";
import type { CafeCommandUnion } from "@packages/domain/types/CafeCommandUnion";
import AgGridMenuItemsComponent from "@ui/components/AgGridMenuItemsComponent.vue";
import { formatLink } from "@ui/formatters";
import type { ReactiveArray } from "@ui/types/ReactiveArray";
import { computed } from "vue";
import { useRouter } from "vue-router";

type Props = {
  menuItemsList: ReactiveArray<MenuItem>;
  suppliesList: ReactiveArray<Supply>;
  supplyTaxes: SupplyTaxes;
  cafeGoals: CafeGoals;
  sendCommand: (Command: CafeCommandUnion) => Promise<void>;
};

const props = defineProps<Props>();

const onClickNewMenuItem = () => {
  props.sendCommand({
    type: "create_menu_item",
    payload: {
      uniqueId: crypto.randomUUID(),
      menuItemName: `New Menu Item ${props.menuItemsList.items.length}`,
      percentTotalSales: 0,
      menuItemPrice: 0,
      // TODO [design] Introduce an approach to storing reasonable default values.
      menuItemServingsPerRecipe: 1,
      menuItemComponents: [],
    },
  });
};

const onMenuItemUpdated = (menuItem: MenuItem) => {
  props.sendCommand({
    type: "update_menu_item",
    payload: menuItem,
  });
};

const onMenuItemDeleted = (menuItem: MenuItem) => {
  props.sendCommand({
    type: "delete_menu_item",
    payload: menuItem,
  });
};

const router = useRouter();
const onMenuItemEditClick = (menuItem: MenuItem) => {
  router.push(`menu-items/${formatLink(menuItem.menuItemName)}`);
};

const categoryWeightedAverageMarkupComputed = computed(() =>
  categoryWeightedAverageMarkup(
    props.supplyTaxes,
    props.suppliesList.items,
    props.menuItemsList.items
  )
);
</script>
