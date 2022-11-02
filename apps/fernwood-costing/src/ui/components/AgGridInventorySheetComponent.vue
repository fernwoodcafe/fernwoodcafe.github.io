<template>
  <AgGridComponent
    :gridData="inventorySheetsList"
    :gridTools="['delete', 'edit']"
    :gridColumnDefs="columnDefs"
  ></AgGridComponent>
</template>

<script setup lang="ts">
import type { InventorySheet } from "@packages/domain/types";
import AgGridComponent from "@ui/components/AgGridComponent.vue";
import { formatDate } from "@ui/formatters";
import type { ReactiveArray } from "@ui/types/ReactiveArray";
import type { ColDef } from "ag-grid-community";

type Props = {
  inventorySheetsList: ReactiveArray<InventorySheet>;
};

defineProps<Props>();

const columnDefs: ColDef[] = [
  {
    field: "dateStarted",
    valueFormatter: (params) => {
      console.log(params);
      return formatDate(params.data.dateStarted);
    },
  },
  // {
  //   field: "dateCompleted",
  //   valueFormatter: (params) => formatDate(params.data.dateCompleted),
  // },
];
</script>
