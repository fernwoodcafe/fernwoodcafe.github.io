<template>
  <AgGridComponent
    :gridData="menuItemsList"
    :gridColumns="['menuItemName']"
    :gridColumnDefs="columnDefs"
    @gridDataUpdate="onMenuItemUpdated"
    @gridRowDelete="onMenuItemDeleted"
  ></AgGridComponent>
</template>

<script setup lang="ts">
import AgGridComponent from "@/components/AgGridComponent.vue";
import { MenuItem } from "@/types/CafeDomain";
import AgRouterLinkRenderer from "./AgRouterLinkRenderer.vue";

type Props = {
  menuItemsList: ReactiveArray<MenuItem>;
};

type Emits = {
  (e: "menuItemUpdated", data: MenuItem): void;
  (e: "menuItemDeleted", data: MenuItem): void;
};

const emit = defineEmits<Emits>();

defineProps<Props>();

const onMenuItemUpdated = (data) => emit("menuItemUpdated", data);

const onMenuItemDeleted = (data) => emit("menuItemDeleted", data);

const columnDefs = [
  {
    field: "menuItemName",
    editable: false,
    cellRenderer: AgRouterLinkRenderer,
  },
];
</script>
