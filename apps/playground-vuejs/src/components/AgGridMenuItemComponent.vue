<template>
  <AgGridComponent
    :gridData="menuItemSupplies"
    :gridColumns="['supplyName']"
    :gridColumnDefs="columnDefs"
    @gridDataUpdate="onMenuItemUpdated"
  ></AgGridComponent>
</template>

<script setup lang="ts">
import AgGridComponent from "@/components/AgGridComponent.vue";
import AgSelectEditor from "@/components/AgSelectEditor.vue";
import { reactive, watch } from "vue";

type Props = {
  menuItem: CafeDomain.MenuItem;
  suppliesList: ReactiveArray<CafeDomain.Supply>;
};

type Emits = {
  (e: "menuItemUpdated", data: any): void;
};

const emit = defineEmits<Emits>();
const props = defineProps<Props>();

const onMenuItemUpdated = (data) => emit("menuItemUpdated", data);

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
