<template>
  <RouterLink :to="`/menu-items/${params.formatLink(params.value)}`">{{
    params.value
  }}</RouterLink>
</template>
<script setup lang="ts">
import type { ICellRendererParams } from "ag-grid-community";

type Props = {
  params: ICellRendererParams & { formatLink: (v: string) => string };
};

defineProps<Props>();
</script>
