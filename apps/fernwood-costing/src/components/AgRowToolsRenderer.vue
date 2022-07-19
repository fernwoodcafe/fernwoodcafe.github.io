<template>
  <form @submit.prevent>
    <button @click="onDeleteClick">Delete</button>
    <button @click="onEditClick">Edit</button>
  </form>
</template>
<script setup lang="ts">
import type { ICellRendererParams } from "ag-grid-community";
type Props = {
  params: ICellRendererParams & {
    onDeleteClick: (data) => void;
    onEditClick: (data) => void;
  };
};

const props = defineProps<Props>();

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
