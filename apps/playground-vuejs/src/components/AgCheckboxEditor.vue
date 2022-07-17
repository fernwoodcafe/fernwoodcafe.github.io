<template>
  <input type="checkbox" v-model="checked" />
</template>
<script setup lang="ts">
import { ref } from "vue";
import { ICellEditorParams } from "ag-grid-community";
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
