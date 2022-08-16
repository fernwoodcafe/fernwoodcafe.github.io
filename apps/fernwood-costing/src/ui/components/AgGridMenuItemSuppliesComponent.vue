Supply
<template>
  <AgGridComponent
    :gridData="menuItemComponents"
    :gridTools="['delete']"
    :gridColumnDefs="columnDefs"
    @gridDataUpdate="onMenuItemComponentUpdated"
    @gridRowDeleteClick="onMenuItemComponentDeleteClick"
  ></AgGridComponent>
</template>

<script setup lang="ts">
import {
  availableUnitConversions,
  supplyCostPerUnit,
  valueConvertedToUnit,
} from "@packages/domain/services";
import type {
  MenuItem,
  MenuItemComponent,
  Supply,
  SupplyTaxes,
} from "@packages/domain/types";
import AgGridComponent from "@ui/components/AgGridComponent.vue";
import { formatMoney } from "@ui/formatters";
import type { ReactiveArray } from "@ui/types/ReactiveArray";
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
  supplyTaxes: SupplyTaxes;
};

type Emits = {
  (e: "menuItemSupplyUpdated", data: MenuItemComponent): void;
  (e: "menuItemSupplyDeleted", data: MenuItemComponent): void;
};

const emit = defineEmits<Emits>();
const props = defineProps<Props>();

const onMenuItemComponentUpdated = (data) =>
  emit("menuItemSupplyUpdated", data);
const onMenuItemComponentDeleteClick = (data) =>
  emit("menuItemSupplyDeleted", data);

const menuItemComponents = reactive({
  items: props.menuItem.menuItemComponents,
});

watch(props.menuItem, (newMenuItem) => {
  menuItemComponents.items = newMenuItem.menuItemComponents;
});

const lookupSupplyDetails = (data: MenuItemComponent) =>
  props.suppliesList.items.find((item) => item.uniqueId == data.supplyUniqueId);

const columnDefs: (ColDef | ColGroupDef)[] = [
  {
    field: "supplyDetails",
    headerName: "Supply Cost and Units",
    editable: false,
    valueGetter: ({ data }: { data: MenuItemComponent }) => {
      const supply = lookupSupplyDetails(data);
      const costPerUnit = formatMoney(
        supplyCostPerUnit(props.supplyTaxes, supply)
      );
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
    field: "menuItemSupplyUnits",
    headerName: "Units",
    cellEditor: "agSelectCellEditor",
    cellEditorParams: (params) => {
      const { supplyUnits } = lookupSupplyDetails(params.data);
      const availableUnits = availableUnitConversions(supplyUnits);
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
    valueGetter: ({ data }: ValueGetterParams<MenuItemComponent>) => {
      if (data.menuItemSupplyUnits === "-") return 0;

      const targetSupply = props.suppliesList.items.find(
        (supply) => supply.uniqueId == data.supplyUniqueId
      );

      const costPerSupplyUnit = supplyCostPerUnit(
        props.supplyTaxes,
        targetSupply
      );
      const costPerMenuItemUnit = valueConvertedToUnit(
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
