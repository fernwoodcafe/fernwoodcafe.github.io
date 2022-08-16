<template>
  <form>
    <label v-for="option in options" :key="option.key">
      <input type="checkbox" :value="option" v-model="checkedOptions" />
      {{ option.label }}
    </label>
  </form>
</template>
<script lang="ts">
import type { ICellEditorParams } from "ag-grid-community";
import { ref } from "vue";

type MultiSelectOption = {
  key: string;
  value: string;
  label: string;
};

type MultiSelectOptions = MultiSelectOption[];

type Props = {
  params: ICellEditorParams & {
    options: MultiSelectOptions;
    selectedOptions: MultiSelectOption;
  };
};

export default {
  setup(props: Props) {
    const options = ref(props.params.options);
    const checkedOptions = ref(props.params.selectedOptions);
    return {
      options,
      checkedOptions,
      getValue: () => checkedOptions,
    };
  },
};
</script>

<style>
form {
  display: flex;
  flex-direction: column;
}
</style>
