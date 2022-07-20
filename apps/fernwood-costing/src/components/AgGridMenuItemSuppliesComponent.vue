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
import formatMoney from "@/formatters/formatMoney";
import calculatePerUnitSupplyCost from "@/services/calculatePerUnitSupplyCost";
import convertUnitCost from "@/services/convertUnitCost";
import type { MenuItem, MenuItemSupply, Supply } from "@/types/CafeDomain";
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

const columnDefs: (ColDef | ColGroupDef)[] = [
  {
    field: "supplyDetails",
    headerName: "Details",
    editable: false,
    valueGetter: ({ data }: { data: MenuItemSupply }) => {
      const supply = props.suppliesList.items.find(
        (item) => item.uniqueId == data.supplyUniqueId
      );

      const costPerUnit = formatMoney(calculatePerUnitSupplyCost(supply));

      return {
        costPerUnit,
        ...supply,
      };
    },
    cellRenderer: (params: { value: Supply & { costPerUnit: number } }) => {
      console.log("cellRenderer", params);

      return `
        <strong>${params.value.supplyName}</strong>
        <span>-</span>
        <span>${params.value.costPerUnit} / ${params.value.supplyUnits}</span>
      `;
    },
  },
  {
    headerName: "Conversion",
    children: [
      {
        field: "menuItemSupplyUnits",
        headerName: "Units",
        cellEditor: "agSelectCellEditor",
        cellEditorParams: {
          // TODO [should-have] Filter these based on the supplyUnits
          values: ["gram", "litre", "ounce", "item", "pound", "kilogram"],
        },
      },
      {
        field: "menuItemSupplyQuantity",
        headerName: "Quantity",
        valueParser: (params) => Number(params.newValue),
      },
    ],
  },
  {
    field: "supplyCost",
    headerName: "Cost (Calculated)",
    editable: false,
    valueGetter: ({ data }: ValueGetterParams<MenuItemSupply>) => {
      const targetSupply = props.suppliesList.items.find(
        (supply) => supply.uniqueId == data.supplyUniqueId
      );

      const costPerSupplyUnit = calculatePerUnitSupplyCost(targetSupply);
      const costPerMenuItemUnit = convertUnitCost(
        costPerSupplyUnit,
        targetSupply.supplyUnits,
        data.menuItemSupplyUnits
      );

      return data.menuItemSupplyQuantity * costPerMenuItemUnit;
    },
    valueFormatter: (params: ValueFormatterParams<Supply>) =>
      formatMoney(params.value),
  },
];
</script>
