<template>
  <AgGridComponent
    :gridData="inventorySheetsList"
    :gridTools="['delete', 'edit']"
    :gridColumnDefs="columnDefs"
    @gridRowEditClick="onInventorySheetEditClick"
    @gridRowDeleteClick="onInventorySheetDeleteClick"
  ></AgGridComponent>
</template>

<script setup lang="ts">
import type { InventorySheet } from "@packages/domain/types";
import AgEditorDate from "@ui/components/AgEditorDate.vue";
import AgGridComponent from "@ui/components/AgGridComponent.vue";
import { formatDate } from "@ui/formatters";
import type { ReactiveArray } from "@ui/types/ReactiveArray";
import type { ColDef } from "ag-grid-community";

type Props = {
  inventorySheetsList: ReactiveArray<InventorySheet>;
};

type Emits = {
  (e: "inventorySheetEditClick", data: InventorySheet): void;
  (e: "inventorySheetDeleteClick", data: InventorySheet): void;
};

defineProps<Props>();

const emit = defineEmits<Emits>();

const onInventorySheetEditClick = (data) =>
  emit("inventorySheetEditClick", data);

const onInventorySheetDeleteClick = (data) =>
  emit("inventorySheetDeleteClick", data);

const columnDefs: ColDef[] = [
  {
    field: "dateStarted",
    valueFormatter: (params) => formatDate(params.data.dateStarted),
    cellEditor: AgEditorDate,
  },
  {
    field: "dateCompleted",
    valueFormatter: (params) => formatDate(params.data.dateCompleted),
  },
];
</script>
