<template>
  <form @submit.prevent>
    <input
      type="button"
      v-if="tools.has('edit')"
      @click="onEditClick"
      value="Edit"
    />
    <input
      type="button"
      v-if="tools.has('delete')"
      @click="onDeleteClick"
      value="Delete"
    />
  </form>
</template>
<script setup lang="ts">
import type { ICellRendererParams } from "ag-grid-community";
type Props = {
  params: ICellRendererParams & {
    onDeleteClick: (data) => void;
    onEditClick: (data) => void;
    gridTools: Array<"edit" | "delete">;
  };
};

const props = defineProps<Props>();

const tools = new Set(props.params.gridTools);

const onDeleteClick = () => {
  props.params.onDeleteClick(props.params.node.data);
  props.params.api.applyTransaction({
    remove: [props.params.node.data],
  });
};

const onEditClick = () => {
  props.params.onEditClick(props.params.node.data);
};
</script>
<style></style>
