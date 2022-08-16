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
    cellEditorParams: (params: { data: CompositeSupply }) => {
      return {
        options: props.suppliesList.items.map((item) => ({
          key: item.uniqueId,
          value: item,
          label: item.supplyName,
          checked: params?.data?.supplies?.find(
            (supply) => supply.uniqueId === item.uniqueId
          ),
        })),
      };
    },
    cellEditorPopup: true,
    cellEditorPopupPosition: "over",
    valueGetter: (params: { data: CompositeSupply }) => {
      return params?.data?.supplies?.length?.toString();
    },
  },
];

const onCompositeSupplyUpdated = (data: CompositeSupply) => {
  console.log(
    "onCompositeSupplyUpdated",
    JSON.stringify(data.supplies, undefined, 2)
  );
  emit("compositeSupplyUpdated", data);
};

const onCompositeSupplyDeleteClick = (data: CompositeSupply) =>
  emit("compositeSupplyDeleted", data);
</script>
