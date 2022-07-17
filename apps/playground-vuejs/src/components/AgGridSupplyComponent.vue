<template>
  <AgGridComponent
    :gridData="suppliesList"
    :gridColumns="['supplyName', 'supplyType', 'unitSize', 'unitCost']"
    :gridColumnDefs="columnDefs"
    @gridDataUpdate="onSupplyUpdated"
    @gridRowDelete="onSupplyDeleted"
  ></AgGridComponent>
</template>

<script setup lang="ts">
import AgGridComponent from "@/components/AgGridComponent.vue";
import AgSelectEditor from "@/components/AgSelectEditor.vue";

type Props = {
  suppliesList: ReactiveArray<CafeDomain.Supply>;
};

type Emits = {
  (e: "supplyUpdated", data: CafeDomain.Supply): void;
  (e: "supplyDeleted", data: CafeDomain.Supply): void;
};

const emit = defineEmits<Emits>();

defineProps<Props>();

const onSupplyUpdated = (data) => emit("supplyUpdated", data);

const onSupplyDeleted = (data) => emit("supplyDeleted", data);

const columnDefs = [
  {
    field: "supplyType",
    // We have this in an ag-specific component because
    // this part has an ag- specific implementation.
    cellEditor: AgSelectEditor,
    cellEditorParams: {
      options: [
        {
          value: "ingredient",
          label: "ingredient",
        },
        {
          value: "packaging",
          label: "packaging",
        },
      ],
    },
  },
];
</script>
