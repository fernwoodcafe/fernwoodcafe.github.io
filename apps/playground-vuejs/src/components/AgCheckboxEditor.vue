<template>
  <input type="checkbox" v-model="params.value" />
</template>
<script setup lang="ts">
import { ICellEditorParams } from "ag-grid-community";
type Props = {
  params: ICellEditorParams;
};

const props = defineProps<Props>();

const getValue = () => props.params.value;

defineExpose({
  getValue,
});
</script>
<style></style>
