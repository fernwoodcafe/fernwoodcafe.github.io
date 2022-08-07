InventoryItem
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
import AgGridComponent from "@ui/components/AgGridComponent.vue";
import { formatMoney } from "@ui/formatters";
import type { ReactiveArray } from "@ui/types/ReactiveArray";
import {
  calculateSupplyCostPerUnit,
  convertUnit,
  lookupUnitAvailableConversions,
} from "@packages/domain/services";
import type {
  InventoryItem,
  MenuItem,
  MenuItemSupply,
} from "@packages/domain/types";
import type {
  ColDef,
  ColGroupDef,
  ValueFormatterParams,
  ValueGetterParams,
} from "ag-grid-community";
import { reactive, watch } from "vue";

type Props = {
  menuItem: MenuItem;
  suppliesList: ReactiveArray<InventoryItem>;
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
      const costPerUnit = formatMoney(calculateSupplyCostPerUnit(supply));
      return {
        costPerUnit,
        ...supply,
      };
    },
    cellRenderer: (params: {
      value: InventoryItem & { costPerUnit: number };
    }) => {
      return `
        <strong>${params.value.supplyName}</strong>
        <span>-</span>
        <span>${params.value.costPerUnit} / ${params.value.supplyUnits}</span>
      `;
    },
  },
  {
    field: "menuItemSupplyUnits",
    headerName: "Units",
    cellEditor: "agSelectCellEditor",
    cellEditorParams: (params) => {
      const { supplyUnits } = lookupSupplyDetails(params.data);
      const availableUnits = lookupUnitAvailableConversions(supplyUnits);
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
    headerName: "Cost",
    editable: false,
    valueGetter: ({ data }: ValueGetterParams<MenuItemSupply>) => {
      if (data.menuItemSupplyUnits === "-") return 0;

      const targetSupply = props.suppliesList.items.find(
        (supply) => supply.uniqueId == data.supplyUniqueId
      );

      const costPerSupplyUnit = calculateSupplyCostPerUnit(targetSupply);
      const costPerMenuItemUnit = convertUnit(
        costPerSupplyUnit,
        targetSupply.supplyUnits,
        data.menuItemSupplyUnits
      );

      return data.menuItemSupplyQuantity * costPerMenuItemUnit;
    },
    valueFormatter: (params: ValueFormatterParams<InventoryItem>) =>
      formatMoney(params.value),
  },
];
</script>
