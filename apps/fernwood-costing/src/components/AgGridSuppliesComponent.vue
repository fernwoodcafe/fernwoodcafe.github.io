InventoryItem
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
import type { InventoryItem } from "@/domain/types";
import { unitsOfMeasure } from "@/domain/values";
import { formatMoney, formatPercent } from "@/formatters";
import type { ReactiveArray } from "@/types/ReactiveArray";
import type {
  ColDef,
  ValueFormatterParams,
  ValueGetterParams,
} from "ag-grid-community";

type Props = {
  suppliesList: ReactiveArray<InventoryItem>;
};

type Emits = {
  (e: "supplyUpdated", data: InventoryItem): void;
  (e: "supplyDeleted", data: InventoryItem): void;
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
    valueFormatter: (params: ValueFormatterParams<InventoryItem>) =>
      formatMoney(params.value),
  },
  {
    field: "percentWaste",
    cellEditor: AgPercentEditor,
    valueFormatter: (params: ValueFormatterParams<InventoryItem>) =>
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
    headerName: "Unit Cost",
    editable: false,
    valueGetter: ({ data }: ValueGetterParams<InventoryItem>) => ({
      cost: calculatePerUnitSupplyCost(data),
      units: data.supplyUnits,
    }),
    valueFormatter: (params: ValueFormatterParams<InventoryItem>) =>
      `${formatMoney(params.value.cost)} / ${params.value.units}`,
  },
];
</script>
