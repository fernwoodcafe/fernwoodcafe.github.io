<template>
  <AgGridComponent
    :gridData="suppliesList"
    :gridTools="['delete']"
    :gridColumnDefs="columnDefs"
    @gridDataUpdate="onSupplyUpdated"
    @gridRowDeleteClick="onSupplyDeleteClick"
  ></AgGridComponent>
</template>

<script setup lang="ts">
import AgCheckboxEditor from "@/components/AgCheckboxEditor.vue";
import AgGridComponent from "@/components/AgGridComponent.vue";
import AgPercentEditor from "@/components/AgPercentEditor.vue";
import { calculatePerUnitSupplyCost } from "@/domain/services";
import type { Supply } from "@/domain/types";
import { unitsOfMeasure } from "@/domain/values";
import { formatMoney, formatPercent } from "@/formatters";
import type { ReactiveArray } from "@/types/ReactiveArray";
import type {
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

const onSupplyDeleteClick = (data) => emit("supplyDeleted", data);

const columnDefs: ColDef[] = [
  { field: "supplyName" },
  {
    field: "supplierName",
  },
  {
    field: "supplyType",
    cellEditor: "agSelectCellEditor",
    cellEditorParams: {
      values: ["ingredient", "packaging"],
    },
  },
  {
    field: "supplyUnits",
    cellEditor: "agSelectCellEditor",
    cellEditorParams: {
      values: unitsOfMeasure,
    },
  },
  { field: "purchaseQuantity" },
  {
    field: "purchasePriceBeforeTax",
    headerName: "Purchase Price before Tax",
    valueFormatter: (params: ValueFormatterParams<Supply>) =>
      formatMoney(params.value),
  },
  {
    field: "percentWaste",
    cellEditor: AgPercentEditor,
    valueFormatter: (params: ValueFormatterParams<Supply>) =>
      formatPercent(params.value),
  },
  {
    field: "hasPST",
    cellEditor: AgCheckboxEditor,
    cellRenderer: (params) => {
      console.log(params);
      return params.value ? "&#10003" : "&#10007";
    },
  },
  { field: "supplyNotes" },
  { field: "supplyLink" },
  {
    field: "unitCost",
    headerName: "Unit Cost (Calculated)",
    editable: false,
    valueGetter: ({ data }: ValueGetterParams<Supply>) => ({
      cost: calculatePerUnitSupplyCost(data),
      units: data.supplyUnits,
    }),
    valueFormatter: (params: ValueFormatterParams<Supply>) =>
      `${formatMoney(params.value.cost)} / ${params.value.units}`,
  },
];
</script>
