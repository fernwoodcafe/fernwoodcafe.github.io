CafeSupply
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
  CafeSupply,
  CafeSupplyTaxes,
  MenuItem,
} from "@packages/domain/types";
import AgGridComponent from "@ui/components/AgGridComponent.vue";
import AgPercentEditor from "@ui/components/AgPercentEditor.vue";
import { formatMoney, formatPercent } from "@ui/formatters";
import type { ReactiveArray } from "@ui/types/ReactiveArray";
import type { ColDef, ValueFormatterParams } from "ag-grid-community";

type Props = {
  menuItemsList: ReactiveArray<MenuItem>;
  suppliesList: ReactiveArray<CafeSupply>;
  cafeGoals: CafeGoals;
  supplyTaxes: CafeSupplyTaxes;
};

type Emits = {
  (e: "menuItemUpdated", data: MenuItem): void;
  (e: "menuItemDeleted", data: MenuItem): void;
  (e: "menuItemEditClick", data: MenuItem): void;
};

const emit = defineEmits<Emits>();

const props = defineProps<Props>();

const onMenuItemUpdated = (data) => emit("menuItemUpdated", data);
const onMenuItemDeleteClick = (data) => emit("menuItemDeleted", data);
const onMenuItemEditClick = (data) => emit("menuItemEditClick", data);

const columnDefs: ColDef<MenuItem>[] = [
  {
    field: "menuItemName",
  },
  {
    headerName: "Cost",
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
    headerName: `Baseline Price @ ${props.cafeGoals.targetWeightedAverageMarkup} Markup`,
    editable: false,
    cellRenderer: ({ data }: { data: MenuItem }) => {
      const cost = menuItemCost(
        props.supplyTaxes,
        data.menuItemComponents,
        props.suppliesList.items
      );
      const price = cost * props.cafeGoals.targetWeightedAverageMarkup;
      return formatMoney(price);
    },
  },
  {
    field: "percentTotalSales",
    cellEditor: AgPercentEditor,
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
      const cost = menuItemCost(
        props.supplyTaxes,
        data.menuItemComponents,
        props.suppliesList.items
      );
      const markup = data.menuItemPrice / cost;
      return isNaN(markup) ? "-" : markup.toFixed(2);
    },
  },
  {
    headerName: "Contribution (Price - Cost)",
    editable: false,
    cellRenderer: ({ data }: { data: MenuItem }) => {
      const cost = menuItemCost(
        props.supplyTaxes,
        data.menuItemComponents,
        props.suppliesList.items
      );
      const price = cost * props.cafeGoals.targetWeightedAverageMarkup;
      return formatMoney(price - cost);
    },
  },
];
</script>
