<template>
  <AgGridComponent
    :gridData="menuItemsList"
    :gridColumns="['menuItemName']"
    :gridTools="['delete', 'edit']"
    @gridDataUpdate="onMenuItemUpdated"
    @gridRowDeleteClick="onMenuItemDeleteClick"
    @gridRowEditClick="onMenuItemEditClick"
  ></AgGridComponent>
</template>

<script setup lang="ts">
import AgGridComponent from "@/components/AgGridComponent.vue";
import type { MenuItem } from "@/types/CafeDomain";
import type { ReactiveArray } from "@/types/ReactiveArray";

type Props = {
  menuItemsList: ReactiveArray<MenuItem>;
};

type Emits = {
  (e: "menuItemUpdated", data: MenuItem): void;
  (e: "menuItemDeleted", data: MenuItem): void;
  (e: "menuItemEditClick", data: MenuItem): void;
};

const emit = defineEmits<Emits>();

defineProps<Props>();

const onMenuItemUpdated = (data) => emit("menuItemUpdated", data);
const onMenuItemDeleteClick = (data) => emit("menuItemDeleted", data);
const onMenuItemEditClick = (data) => emit("menuItemEditClick", data);
</script>
