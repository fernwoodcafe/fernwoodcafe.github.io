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
import { reactive } from "vue";

type Props = {
  menuItem: CafeMenuItem;
  suppliesList: ReactiveArray<CafeSupply>;
};

const props = defineProps<Props>();

// TODO: Does this need to be reactive?
const menuItemSupplies = reactive({
  items: props.menuItem.ingredients,
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
componentscomponents
