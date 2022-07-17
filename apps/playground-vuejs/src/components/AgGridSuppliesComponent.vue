<template>
  <AgGridComponent
    :gridData="suppliesList"
    :gridColumns="[
      'supplyName',
      'supplyType',
      'supplyUnits',
      'purchaseQuantity',
      'purchasePriceBeforeTax',
      'percentWaste',
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
import { formatMoney, formatPercent } from "@/formatters";
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
      options: ["ingredient", "packaging"].map((option) => ({
        value: option,
        label: option,
      })),
    },
  },
  {
    field: "supplyUnits",
    cellEditor: AgSelectEditor,
    cellEditorParams: {
      options: ["gram", "litre", "ounce", "item"].map((option) => ({
        value: option,
        label: option,
      })),
    },
  },
  {
    field: "purchasePriceBeforeTax",
    valueFormatter: (params: ValueFormatterParams<Supply>) =>
      formatMoney(params.value),
  },
  {
    field: "percentWaste",
    valueFormatter: (params: ValueFormatterParams<Supply>) =>
      formatPercent(params.value),
    valueGetter: ({ data }: ValueGetterParams<Supply>) =>
      data.percentWaste / 100,
  },
  {
    field: "unitCost",
    valueGetter: ({ data }: ValueGetterParams<Supply>) =>
      data.purchasePriceBeforeTax / data.purchaseQuantity,
    valueFormatter: (params: ValueFormatterParams<Supply>) =>
      formatMoney(params.value),
  },
];
</script>
