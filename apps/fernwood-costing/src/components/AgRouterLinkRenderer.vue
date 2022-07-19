<template>
  <RouterLink :to="`/menu-items/${props.params.value}`">{{
    props.params.value
  }}</RouterLink>
</template>
<script setup lang="ts">
import { ICellRendererParams } from "ag-grid-community";

type Props = {
  params: ICellRendererParams;
};

const props = defineProps<Props>();

console.log("params", props.params);
</script>
