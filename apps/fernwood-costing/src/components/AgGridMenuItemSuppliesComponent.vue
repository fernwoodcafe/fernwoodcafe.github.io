<template>
  <AgGridComponent
    :gridData="menuItemSupplies"
    :gridColumns="['supplyDetails', 'supplyQuantity', 'supplyCost']"
    :gridTools="['delete']"
    :gridColumnDefs="columnDefs"
    @gridDataUpdate="onMenuItemSupplyUpdated"
    @gridRowDeleteClick="onMenuItemSupplyDeleteClick"
  ></AgGridComponent>
</template>

<script setup lang="ts">
import AgGridComponent from "@/components/AgGridComponent.vue";
import formatMoney from "@/formatters/formatMoney";
import type { MenuItem, MenuItemSupply, Supply } from "@/types/CafeDomain";
import type { ReactiveArray } from "@/types/ReactiveArray";
import type {
  ColDef,
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

const columnDefs: ColDef[] = [
  {
    field: "supplyDetails",
    headerName: "Details",
    cellEditor: "agSelectCellEditor",
    cellEditorParams: {
      values: props.suppliesList.items.map((item) => item.supplyName),
    },
    valueGetter: ({ data }) => {
      const target = props.suppliesList.items.find(
        (item) => item.uniqueId == data.supplyUniqueId
      );

      return target.supplyName;
    },
  },
  {
    field: "supplyQuantity",
    headerName: "Quantity",
    valueParser: (params) => Number(params.newValue),
  },
  {
    field: "supplyCost",
    headerName: "Cost (Calculated)",
    editable: false,
    valueGetter: ({ data }: ValueGetterParams<MenuItemSupply>) => {
      const targetSupply = props.suppliesList.items.find(
        (supply) => supply.uniqueId == data.supplyUniqueId
      );

      return (
        data.supplyQuantity *
        (targetSupply.purchasePriceBeforeTax / targetSupply.purchaseQuantity)
      );
    },
    valueFormatter: (params: ValueFormatterParams<Supply>) =>
      formatMoney(params.value),
  },
];
</script>
