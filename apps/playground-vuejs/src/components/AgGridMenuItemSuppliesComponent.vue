<template>
  <AgGridComponent
    :gridData="menuItemSupplies"
    :gridColumns="['supplyName']"
    :gridColumnDefs="columnDefs"
    @gridDataUpdate="onMenuItemSupplyUpdated"
    @gridRowDelete="onMenuItemSupplyDeleted"
  ></AgGridComponent>
</template>

<script setup lang="ts">
import AgGridComponent from "@/components/AgGridComponent.vue";
import AgSelectEditor from "@/components/AgSelectEditor.vue";
import { MenuItem, MenuItemSupply, Supply } from "@/types/CafeDomain";
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
    field: "supplyName",
    // We have this in an ag-specific component because
    // this part has an ag- specific implementation.
    cellEditor: AgSelectEditor,
    cellEditorParams: {
      options: props.suppliesList.items.map((item) => ({
        value: item.supplyName,
        label: `${item.supplyName}`,
      })),
    },
  },
];
</script>
