<template>
  <select v-model="selectedOption">
    <option disabled :value="{}">Please select one</option>
    <option v-for="option in params.options" :value="option.value">
      {{ option.label }}
    </option>
  </select>
</template>
<script setup lang="ts">
import { ICellEditorParams } from "ag-grid-community";
import { OptionHTMLAttributes, ref } from "vue";

type Props = {
  params: ICellEditorParams<any, OptionHTMLAttributes> & {
    options: OptionHTMLAttributes[];
  };
};

const props = defineProps<Props>();

const selectedOption = ref(props.params.value);

const getValue = () => selectedOption.value;

defineExpose({
  getValue,
});
</script>
<style scoped>
select {
  width: 100%;
}
</style>
