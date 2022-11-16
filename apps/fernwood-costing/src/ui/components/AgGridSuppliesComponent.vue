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
import { supplyCostPerUnit } from "@packages/domain/services";
import type { Supply, SupplyTaxes } from "@packages/domain/types";
import { unitsOfMeasure } from "@packages/domain/values";
import AgEditorCheckbox from "@ui/components/AgEditorCheckbox.vue";
import AgEditorPercent from "@ui/components/AgEditorPercent.vue";
import AgGridComponent from "@ui/components/AgGridComponent.vue";
import { formatMoney, formatPercent } from "@ui/formatters";
import type { ReactiveArray } from "@ui/types/ReactiveArray";
import type {
  ColDef,
  ValueFormatterParams,
  ValueGetterParams,
} from "ag-grid-community";

type Props = {
  suppliesList: ReactiveArray<Supply>;
  supplyTaxes: SupplyTaxes;
};

type Emits = {
  (e: "supplyUpdated", data: Supply): void;
  (e: "supplyDeleted", data: Supply): void;
};

const emit = defineEmits<Emits>();
const props = defineProps<Props>();

const onSupplyUpdated = (data: Supply) => emit("supplyUpdated", data);

const onSupplyDeleteClick = (data: Supply) => emit("supplyDeleted", data);

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
    cellEditor: AgEditorPercent,
    valueFormatter: (params: ValueFormatterParams<Supply>) =>
      formatPercent(params.value),
  },
  {
    // TODO [nice-to-have] Change the value on single-click instead of on double-click.
    // TODO [design] Consider using the 'checkboxSelect' property of ColDef instead of our custom one.
    field: "hasPST",
    cellEditor: AgEditorCheckbox,
    cellRenderer: (params) => (params.value ? "&#10003" : "&#10007"),
  },
  {
    field: "unitCost",
    headerName: "Unit Cost",
    editable: false,
    comparator: (valueA, valueB) => valueA.cost - valueB.cost,
    valueGetter: ({ data }: ValueGetterParams<Supply>) => ({
      cost: supplyCostPerUnit(props.supplyTaxes, data),
      units: data.supplyUnits,
    }),
    valueFormatter: (params: ValueFormatterParams<Supply>) =>
      `${formatMoney(params.value.cost)} / ${params.value.units}`,
  },
];
</script>
