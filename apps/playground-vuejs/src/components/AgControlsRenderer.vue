<template>
  <button @click="onDeleteClick">Delete</button>
</template>
<script setup lang="ts">
import { ICellRendererParams } from "ag-grid-community";
type Props = {
  params: ICellRendererParams;
};

const props = defineProps<Props>();

const onDeleteClick = () => {
  props.params.api.applyTransaction({
    remove: [props.params.node.data],
  });
};
</script>
