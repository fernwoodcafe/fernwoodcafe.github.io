Supply
<template>
  <AgGridComponent
    :gridData="compositeSuppliesList"
    :gridColumnDefs="columnDefs"
    :gridTools="['delete']"
    @gridRowDeleteClick="onCompositeSupplyDeleteClick"
    @gridDataUpdate="onCompositeSupplyUpdated"
  ></AgGridComponent>
</template>

<script setup lang="ts">
import type { CompositeSupply, Supply } from "@packages/domain/types";
import AgGridComponent from "@ui/components/AgGridComponent.vue";
import AgMultiSelectEditor from "@ui/components/AgMultiSelectEditor.vue";
import type { ReactiveArray } from "@ui/types/ReactiveArray";
import type { ColDef } from "ag-grid-community";

type Emits = {
  (e: "compositeSupplyUpdated", data: CompositeSupply): void;
  (e: "compositeSupplyDeleted", data: CompositeSupply): void;
};

const emit = defineEmits<Emits>();

type Props = {
  compositeSuppliesList: ReactiveArray<CompositeSupply>;
  suppliesList: ReactiveArray<Supply>;
};

const props = defineProps<Props>();

const columnDefs: ColDef[] = [
  { field: "compositeSupplyName" },
  {
    field: "supplies",
    cellEditor: AgMultiSelectEditor,
    cellEditorParams: (params: { value: Supply[] }) => {
      console.log("cellEditorParams.value", JSON.stringify(params?.value));
      return {
        selectedOptions: params?.value ?? [],
        options: props.suppliesList.items.map((item) => ({
          key: item.uniqueId,
          value: item,
          label: item.supplyName,
        })),
      };
    },
    cellEditorPopup: true,
    cellRenderer: (params: { value: Supply[] }) => {
      console.log("cellRenderer", JSON.stringify(params.value));
      return params?.value?.length.toString();
    },
  },
];

const onCompositeSupplyUpdated = (data: CompositeSupply) =>
  emit("compositeSupplyUpdated", data);

const onCompositeSupplyDeleteClick = (data: CompositeSupply) =>
  emit("compositeSupplyDeleted", data);
</script>
