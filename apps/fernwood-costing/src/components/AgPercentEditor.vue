<template>
  <input type="number" v-model="percent" />
</template>
<script setup lang="ts">
import { ref } from "vue";
import type { ICellEditorParams } from "ag-grid-community";
type Props = {
  params: ICellEditorParams;
};

const props = defineProps<Props>();
const percent = ref(props.params.value);
const getValue = () => percent.value / 100;
defineExpose({
  getValue,
});
</script>
<style></style>
