<template>
  <form @submit.prevent>
    <button @click="onDeleteClick">Delete</button>
  </form>
</template>
<script setup lang="ts">
import { ICellRendererParams } from "ag-grid-community";
type Props = {
  params: ICellRendererParams & {
    onDeleteClick: Function;
  };
};

const props = defineProps<Props>();

const onDeleteClick = () => {
  props.params.onDeleteClick(props.params.node.data);
  props.params.api.applyTransaction({
    remove: [props.params.node.data],
  });
};
</script>
