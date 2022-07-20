<template>
  <AgGridComponent
    :gridData="menuItemsList"
    :gridColumns="['menuItemName', 'menuItemSummary']"
    :gridTools="['delete', 'edit']"
    :gridColumnDefs="columnDefs"
    @gridDataUpdate="onMenuItemUpdated"
    @gridRowDeleteClick="onMenuItemDeleteClick"
    @gridRowEditClick="onMenuItemEditClick"
  ></AgGridComponent>
</template>

<script setup lang="ts">
import AgGridComponent from "@/components/AgGridComponent.vue";
import formatMoney from "@/formatters/formatMoney";
import calculateMenuItemTotalCost from "@/services/calculateMenuItemTotalCost";
import type { CafeGoals, MenuItem, Supply } from "@/types/CafeDomain";
import type { ReactiveArray } from "@/types/ReactiveArray";
import type { ColDef } from "ag-grid-community";

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

const columnDefs: ColDef[] = [
  {
    field: "menuItemSummary",
    editable: false,
    cellRenderer: ({ data }) => {
      const cost = calculateMenuItemTotalCost(data, props.suppliesList.items);
      const price = cost * props.cafeGoals.weightedAverageMarkup;
      return `
      <div style="display: flex; column-gap:5px">
        <span><strong>Cost</strong> ${formatMoney(cost)}</span>
        <span><strong>Price</strong> ${formatMoney(price)}</span>
        <span><strong>Contrib</strong> ${formatMoney(price - cost)}</span>
      </div>
      `;
    },
  },
];
</script>
