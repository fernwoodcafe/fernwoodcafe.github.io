<template>
  <input type="checkbox" v-model="checked" />
</template>
<script setup lang="ts">
import type { ICellEditorParams } from "ag-grid-community";
import { ref } from "vue";
type Props = {
  params: ICellEditorParams;
};

const props = defineProps<Props>();
const checked = ref(props.params.value);
const getValue = () => checked.value;

defineExpose({
  getValue,
});
</script>
<style></style>
