Supply
<template>
  <AgGridComponent
    :gridData="compositeSuppliesList"
    :gridColumnDefs="columnDefs"
  ></AgGridComponent>
</template>

<script setup lang="ts">
import type { CompositeSupply } from "@packages/domain/types";
import AgGridComponent from "@ui/components/AgGridComponent.vue";
import type { ReactiveArray } from "@ui/types/ReactiveArray";
import type { ColDef } from "ag-grid-community";

type Props = {
  compositeSuppliesList: ReactiveArray<CompositeSupply>;
};

defineProps<Props>();

const columnDefs: ColDef[] = [{ field: "compositeSupplyName" }];
</script>
