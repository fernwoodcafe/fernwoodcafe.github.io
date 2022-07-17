<template>
  <form @submit.prevent>
    <button @click="onClickOpen">Open</button>
    <button @click="onDeleteClick">Delete</button>
  </form>
</template>
<script setup lang="ts">
import { ICellRendererParams } from "ag-grid-community";
type Props = {
  params: ICellRendererParams & {
    onDeleteClick: Function;
    // onOpenClick: Function;
  };
};

const props = defineProps<Props>();

const onClickOpen = () => {
  // props.params.onOpenClick(props.params.node.data);
};

const onDeleteClick = () => {
  props.params.onDeleteClick(props.params.node.data);
  props.params.api.applyTransaction({
    remove: [props.params.node.data],
  });
};
</script>
