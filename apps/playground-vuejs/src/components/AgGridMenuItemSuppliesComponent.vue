<template>
  <AgGridComponent
    :gridData="menuItemSupplies"
    :gridColumns="['supplyDetails', 'supplyQuantity', 'supplyCost']"
    :gridColumnDefs="columnDefs"
    @gridDataUpdate="onMenuItemSupplyUpdated"
    @gridRowDelete="onMenuItemSupplyDeleted"
  ></AgGridComponent>
</template>

<script setup lang="ts">
import AgGridComponent from "@/components/AgGridComponent.vue";
import AgSelectEditor from "@/components/AgSelectEditor.vue";
import { formatMoney } from "@/formatters";
import { MenuItem, MenuItemSupply, Supply } from "@/types/CafeDomain";
import { ValueFormatterParams, ValueGetterParams } from "ag-grid-community";
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
const onMenuItemSupplyDeleted = (data) => emit("menuItemSupplyDeleted", data);

const menuItemSupplies = reactive({
  items: props.menuItem.menuItemSupplies,
});

watch(props.menuItem, (newMenuItem) => {
  const oldItems = new Set(menuItemSupplies.items);
  const newItems = new Set(newMenuItem.menuItemSupplies);

  // This machinery lets us add to the top/bottom instead of the middle.
  const addedItems = [...newItems].filter((item) => !oldItems.has(item));
  const removedItems = [...oldItems].filter((item) => !newItems.has(item));

  menuItemSupplies.items = menuItemSupplies.items
    .filter((item) => !removedItems.includes(item))
    .concat(addedItems);
});

const columnDefs = [
  {
    field: "supplyDetails",
    cellEditor: AgSelectEditor,
    cellEditorParams: {
      options: props.suppliesList.items.map((item) => ({
        value: `${item.supplyName}`,
        label: `${item.supplyName}`,
      })),
    },
    valueGetter: ({ data }: ValueGetterParams<MenuItemSupply>) => {
      const targetSupply = props.suppliesList.items.find(
        (supply) => supply.uniqueId == data.supplyUniqueId
      );

      const costPerUnit = formatMoney(
        targetSupply.purchasePriceBeforeTax / targetSupply.purchaseQuantity
      );

      return `${targetSupply.supplyName} @ ${costPerUnit} per ${targetSupply.supplyUnits}`;
    },
  },
  {
    field: "supplyQuantity",
    valueParser: (params) => Number(params.newValue),
  },
  {
    field: "supplyCost",
    headerName: "Supply Cost (Calculated)",
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
