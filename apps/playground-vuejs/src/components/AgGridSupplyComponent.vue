<template>
  <AgGridComponent
    :gridData="suppliesList"
    :gridColumns="['supplyName', 'supplyType', 'unitSize', 'unitCost', 'tools']"
    :gridColumnDefs="columnDefs"
    @gridDataUpdate="onSupplyUpdated"
  ></AgGridComponent>
</template>

<script setup lang="ts">
import AgGridComponent from "@/components/AgGridComponent.vue";
import AgSelectEditor from "@/components/AgSelectEditor.vue";

type Props = {
  suppliesList: ReactiveArray<CafeDomain.Supply>;
};

type Emits = {
  (e: "supplyUpdated", data: any): void;
};

const emit = defineEmits<Emits>();

defineProps<Props>();

const onSupplyUpdated = (data) => emit("supplyUpdated", data);

const columnDefs = [
  {
    field: "supplyType",
    // We have this in an ag-specific component because
    // this part has an ag- specific implementation.
    cellEditor: AgSelectEditor,
    cellEditorParams: {
      options: [
        {
          value: "Ingredient",
          label: "Ingredient",
        },
        {
          value: "Packaging",
          label: "Packaging",
        },
      ],
    },
  },
];
</script>
