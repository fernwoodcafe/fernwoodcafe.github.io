<template>
  <AgGridComponent
    :gridData="menuItemSupplies"
    :gridColumns="['supplyId', 'unitQuantity']"
    :gridColumnDefs="columnDefs"
  ></AgGridComponent>
</template>

<script setup lang="ts">
import AgGridComponent from "@/components/AgGridComponent.vue";
import AgSuppliesEditor from "@/components/AgSuppliesEditor.vue";
import { reactive, watch } from "vue";

type Props = {
  menuItem: CafeMenuItem;
  suppliesList: ReactiveArray<CafeSupply>;
};

const props = defineProps<Props>();

const menuItemSupplies = reactive({
  items: props.menuItem.ingredients.concat(props.menuItem.packaging),
});

watch(props.menuItem, (newMenuItem, oldMenuItem) => {
  const oldItems = new Set(menuItemSupplies.items);
  const newItems = new Set([
    ...newMenuItem.ingredients,
    ...newMenuItem.packaging,
  ]);

  // This machinery lets us add to the top/bottom instead of the middle.
  const addedItems = [...newItems].filter((item) => !oldItems.has(item));
  const removedItems = [...oldItems].filter((item) => !newItems.has(item));

  menuItemSupplies.items = menuItemSupplies.items
    .filter((item) => !removedItems.includes(item))
    .concat(addedItems);
});

const columnDefs = [
  {
    field: "supplyId",
    // We have this in an ag-specific component because
    // this part has an ag- specific implementation.
    cellEditor: AgSuppliesEditor,
    cellEditorParams: {
      options: props.suppliesList.items.map((item) => ({
        value: item.supplyId,
        label: `${item.supplyId}`,
      })),
    },
  },
];
</script>
