<template>
  <AgGridComponent
    :gridData="menuItemsList"
    :gridTools="['delete', 'edit']"
    :gridColumnDefs="columnDefs"
    @gridDataUpdate="onMenuItemUpdated"
    @gridRowDeleteClick="onMenuItemDeleteClick"
    @gridRowEditClick="onMenuItemEditClick"
  ></AgGridComponent>
</template>

<script setup lang="ts">
import { menuItemCost } from "@packages/domain/services";
import type {
  CafeGoals,
  MenuItem,
  Supply,
  SupplyTaxes,
} from "@packages/domain/types";
import AgEditorPercent from "@ui/components/AgEditorPercent.vue";
import AgGridComponent from "@ui/components/AgGridComponent.vue";
import { formatMoney, formatPercent } from "@ui/formatters";
import type { ReactiveArray } from "@ui/types/ReactiveArray";
import type { ColDef, ValueFormatterParams } from "ag-grid-community";

type Props = {
  menuItemsList: ReactiveArray<MenuItem>;
  suppliesList: ReactiveArray<Supply>;
  cafeGoals: CafeGoals;
  supplyTaxes: SupplyTaxes;
};

type Emits = {
  (e: "menuItemUpdated", data: MenuItem): void;
  (e: "menuItemDeleted", data: MenuItem): void;
  (e: "menuItemEditClick", data: MenuItem): void;
};

const props = defineProps<Props>();

const emit = defineEmits<Emits>();

const onMenuItemUpdated = (data: MenuItem) => emit("menuItemUpdated", data);
const onMenuItemDeleteClick = (data: MenuItem) => emit("menuItemDeleted", data);
const onMenuItemEditClick = (data: MenuItem) => emit("menuItemEditClick", data);

const columnDefs: ColDef<MenuItem>[] = [
  {
    field: "menuItemName",
  },
  {
    headerName: "Total Cost",
    editable: false,
    cellRenderer: ({ data }: { data: MenuItem }) => {
      const cost = menuItemCost(
        props.supplyTaxes,
        data.menuItemComponents,
        props.suppliesList.items
      );
      return formatMoney(cost);
    },
  },
  {
    headerName: "Servings per Recipe",
    editable: false,
    cellRenderer: ({ data }: { data: MenuItem }) => {
      return data.menuItemServingsPerRecipe;
    },
  },
  {
    headerName: "Cost per Serving",
    editable: false,
    cellRenderer: ({ data }: { data: MenuItem }) => {
      const cost =
        // TODO Introduce menuItemCostPerServing into domain.
        menuItemCost(
          props.supplyTaxes,
          data.menuItemComponents,
          props.suppliesList.items
        ) / data.menuItemServingsPerRecipe;
      return formatMoney(cost);
    },
  },
  {
    headerName: `Baseline Price @ ${props.cafeGoals.targetWeightedAverageMarkup} Markup`,
    editable: false,
    cellRenderer: ({ data }: { data: MenuItem }) => {
      // TODO Introduce menuItemCostPerServing into domain.
      const cost =
        menuItemCost(
          props.supplyTaxes,
          data.menuItemComponents,
          props.suppliesList.items
        ) / data.menuItemServingsPerRecipe;
      const price = cost * props.cafeGoals.targetWeightedAverageMarkup;
      return formatMoney(price);
    },
  },
  {
    field: "percentTotalSales",
    cellEditor: AgEditorPercent,
    valueFormatter: (params: ValueFormatterParams<MenuItem>) =>
      formatPercent(params.value),
  },
  {
    headerName: "Chosen Menu Price",
    field: "menuItemPrice",
    valueFormatter: (node) => formatMoney(node.data.menuItemPrice),
  },
  {
    headerName: "Markup",
    editable: false,
    cellRenderer: ({ data }: { data: MenuItem }) => {
      // TODO Introduce menuItemCostPerServing into domain.
      const cost =
        menuItemCost(
          props.supplyTaxes,
          data.menuItemComponents,
          props.suppliesList.items
        ) / data.menuItemServingsPerRecipe;
      const markup = data.menuItemPrice / cost;
      return isNaN(markup) ? "-" : markup.toFixed(2);
    },
  },
  {
    headerName: "Contribution (Price - Cost)",
    editable: false,
    cellRenderer: ({ data }: { data: MenuItem }) => {
      // TODO Introduce menuItemCostPerServing into domain.
      const cost =
        menuItemCost(
          props.supplyTaxes,
          data.menuItemComponents,
          props.suppliesList.items
        ) / data.menuItemServingsPerRecipe;
      const price = cost * props.cafeGoals.targetWeightedAverageMarkup;
      return formatMoney(price - cost);
    },
  },
];
</script>
