<template>
  <AgGridComponent
    :gridData="menuItemSupplies"
    :gridTools="['delete']"
    :gridColumnDefs="columnDefs"
    @gridDataUpdate="onMenuItemSupplyUpdated"
    @gridRowDeleteClick="onMenuItemSupplyDeleteClick"
  ></AgGridComponent>
</template>

<script setup lang="ts">
import AgGridComponent from "@/components/AgGridComponent.vue";
import {
  calculatePerUnitSupplyCost,
  convertUnit,
  lookupAvailableUnitConversions,
} from "@/domain/services";
import type { MenuItem, MenuItemSupply, Supply } from "@/domain/types";
import { formatMoney } from "@/formatters";
import type { ReactiveArray } from "@/types/ReactiveArray";
import type {
  ColDef,
  ColGroupDef,
  ValueFormatterParams,
  ValueGetterParams,
} from "ag-grid-community";
import { reactive, watch } from "vue";

type Props = {
  menuItem: MenuItem;
  suppliesList: ReactiveArray<Supply>;
};

type Emits = {
  (e: "menuItemSupplyUpdated", data: MenuItemSupply): void;
  (e: "menuItemSupplyDeleted", data: MenuItemSupply): void;
};

const emit = defineEmits<Emits>();
const props = defineProps<Props>();

const onMenuItemSupplyUpdated = (data) => emit("menuItemSupplyUpdated", data);
const onMenuItemSupplyDeleteClick = (data) =>
  emit("menuItemSupplyDeleted", data);

const menuItemSupplies = reactive({
  items: props.menuItem.menuItemSupplies,
});

watch(props.menuItem, (newMenuItem) => {
  menuItemSupplies.items = newMenuItem.menuItemSupplies;
});

const lookupSupplyDetails = (data: MenuItemSupply) =>
  props.suppliesList.items.find((item) => item.uniqueId == data.supplyUniqueId);

const columnDefs: (ColDef | ColGroupDef)[] = [
  {
    field: "supplyDetails",
    headerName: "Supply Cost and Units",
    editable: false,
    valueGetter: ({ data }: { data: MenuItemSupply }) => {
      const supply = lookupSupplyDetails(data);
      const costPerUnit = formatMoney(calculatePerUnitSupplyCost(supply));
      return {
        costPerUnit,
        ...supply,
      };
    },
    cellRenderer: (params: { value: Supply & { costPerUnit: number } }) => {
      return `
        <strong>${params.value.supplyName}</strong>
        <span>-</span>
        <span>${params.value.costPerUnit} / ${params.value.supplyUnits}</span>
      `;
    },
  },
  {
    headerName: "Conversion to Menu Item Cost and Units",
    children: [
      {
        field: "menuItemSupplyUnits",
        headerName: "Units",
        cellEditor: "agSelectCellEditor",
        cellEditorParams: (params) => {
          // TODO [should-have] Filter these based on the supplyUnits
          const { supplyUnits } = lookupSupplyDetails(params.data);
          const availableUnits = lookupAvailableUnitConversions(supplyUnits);
          console.log("cellEditorParams", availableUnits);
          return {
            values: availableUnits,
          };
        },
      },
      {
        field: "menuItemSupplyQuantity",
        headerName: "Quantity",
        valueParser: (params) => Number(params.newValue),
      },
      {
        headerName: "Cost (Calculated)",
        editable: false,
        valueGetter: ({ data }: ValueGetterParams<MenuItemSupply>) => {
          const targetSupply = props.suppliesList.items.find(
            (supply) => supply.uniqueId == data.supplyUniqueId
          );

          const costPerSupplyUnit = calculatePerUnitSupplyCost(targetSupply);
          const costPerMenuItemUnit = convertUnit(
            costPerSupplyUnit,
            targetSupply.supplyUnits,
            data.menuItemSupplyUnits
          );

          return data.menuItemSupplyQuantity * costPerMenuItemUnit;
        },
        valueFormatter: (params: ValueFormatterParams<Supply>) =>
          formatMoney(params.value),
      },
    ],
  },
];
</script>
