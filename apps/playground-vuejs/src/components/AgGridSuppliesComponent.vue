<template>
  <AgGridComponent
    :gridData="suppliesList"
    :gridColumns="[
      'supplyName',
      'supplyType',
      'unitSize',
      'purchaseQuantity',
      'purchasePriceBeforeTax',
      'unitCost',
    ]"
    :gridColumnDefs="columnDefs"
    @gridDataUpdate="onSupplyUpdated"
    @gridRowDelete="onSupplyDeleted"
  ></AgGridComponent>
</template>

<script setup lang="ts">
import AgGridComponent from "@/components/AgGridComponent.vue";
import AgSelectEditor from "@/components/AgSelectEditor.vue";
import { Supply } from "@/types/CafeDomain";
import { ValueFormatterParams, ValueGetterParams } from "ag-grid-community";

type Props = {
  suppliesList: ReactiveArray<Supply>;
};

type Emits = {
  (e: "supplyUpdated", data: Supply): void;
  (e: "supplyDeleted", data: Supply): void;
};

const emit = defineEmits<Emits>();

defineProps<Props>();

const onSupplyUpdated = (data) => emit("supplyUpdated", data);

const onSupplyDeleted = (data) => emit("supplyDeleted", data);

const columnDefs = [
  {
    field: "supplyType",
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
  {
    field: "unitCost",
    valueGetter: (params: ValueGetterParams<Supply>) =>
      params.data.purchasePriceBeforeTax / params.data.purchaseQuantity,
    valueFormatter: (params: ValueFormatterParams<Supply>) =>
      isNaN(params.value) ? "-" : `$  ${params.value}`,
  },
];
</script>
