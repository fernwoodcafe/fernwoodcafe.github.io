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
import AgGridComponent from "@/components/AgGridComponent.vue";
import { calculateMenuItemTotalCost } from "@/domain/services";
import type { CafeGoals, MenuItem, Supply } from "@/domain/types";
import { formatMoney } from "@/formatters";
import type { ReactiveArray } from "@/types/ReactiveArray";
import type { ColDef, ColGroupDef } from "ag-grid-community";

type Props = {
  menuItemsList: ReactiveArray<MenuItem>;
  suppliesList: ReactiveArray<Supply>;
  cafeGoals: CafeGoals;
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

const columnDefs: (ColDef | ColGroupDef)[] = [
  {
    field: "menuItemName",
  },
  {
    field: "percentageTotalSales",
  },
  {
    headerName: "Cost",
    editable: false,
    cellRenderer: ({ data }) => {
      const cost = calculateMenuItemTotalCost(data, props.suppliesList.items);

      return formatMoney(cost);
    },
  },
  {
    headerName: `Recommended Price @ ${props.cafeGoals.weightedAverageMarkup} Markup`,
    editable: false,
    cellRenderer: ({ data }) => {
      const cost = calculateMenuItemTotalCost(data, props.suppliesList.items);
      const price = cost * props.cafeGoals.weightedAverageMarkup;

      return formatMoney(price);
    },
  },
  {
    headerName: "Actual Price",
  },
  {
    headerName: "Actual Markup",
    editable: false,
  },
  {
    headerName: "Contribution (Price - Cost)",
    editable: false,
    cellRenderer: ({ data }) => {
      const cost = calculateMenuItemTotalCost(data, props.suppliesList.items);
      const price = cost * props.cafeGoals.weightedAverageMarkup;

      return formatMoney(price - cost);
    },
  },
];
</script>
