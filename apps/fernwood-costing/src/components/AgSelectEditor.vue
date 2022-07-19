<template>
  <select v-model="selectedOption">
    <option disabled :value="{}">Please select one</option>
    <option
      v-for="option in params.options"
      :value="option.value"
      :key="option.value"
    >
      {{ option.label }}
    </option>
  </select>
</template>
<script lang="ts">
import type { ICellEditorParams } from "ag-grid-community";
import type { OptionHTMLAttributes } from "vue";
import { ref } from "vue";

type Props = {
  params: ICellEditorParams & {
    options: OptionHTMLAttributes[];
  };
};

// We use export default here because the production vite build does not return
// the defineExpose. See also https://stackoverflow.com/q/73032489/1108891.
export default {
  setup(props: Props) {
    const selectedOption = ref(props.params.value?.valueOf());
    return {
      selectedOption,
      getValue: () => selectedOption.value,
    };
  },
};
</script>
<style scoped>
select {
  width: 100%;
}
</style>
