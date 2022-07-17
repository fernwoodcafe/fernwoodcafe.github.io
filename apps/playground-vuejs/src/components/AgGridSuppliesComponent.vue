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
      'hasPST',
      'unitCost',
    ]"
    :gridColumnDefs="columnDefs"
    @gridDataUpdate="onSupplyUpdated"
    @gridRowDelete="onSupplyDeleted"
  ></AgGridComponent>
</template>

<script setup lang="ts">
import AgCheckboxEditor from "@/components/AgCheckboxEditor.vue";
import AgGridComponent from "@/components/AgGridComponent.vue";
import AgSelectEditor from "@/components/AgSelectEditor.vue";
import { formatMoney, formatPercent } from "@/formatters";
import { Supply } from "@/types/CafeDomain";
import {
  ColDef,
  ValueFormatterParams,
  ValueGetterParams,
} from "ag-grid-community";

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

const columnDefs: ColDef[] = [
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
    headerName: "Purchase Price before Tax",
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
    field: "hasPST",
    cellEditor: AgCheckboxEditor,
  },
  {
    field: "unitCost",
    headerName: "Unit Cost (Calculated)",
    editable: false,
    valueGetter: ({ data }: ValueGetterParams<Supply>) =>
      data.purchasePriceBeforeTax / data.purchaseQuantity,
    valueFormatter: (params: ValueFormatterParams<Supply>) =>
      formatMoney(params.value),
  },
];
</script>
