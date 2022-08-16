<template>
  <form>
    <label v-for="option in options" :key="option[key]">
      <input type="checkbox" :value="option" v-model="selectedOptions" />
      {{ option.label }}
    </label>
  </form>
</template>
<script lang="ts">
import type { ICellEditorParams } from "ag-grid-community";
import { ref } from "vue";

type MultiSelectOption = {
  value: unknown; // TODO [maybe] Change value to model.
  label: string;
  checked: boolean;
};

type MultiSelectOptions = MultiSelectOption[];

type Props = {
  params: ICellEditorParams & {
    key: string;
    options: MultiSelectOptions;
    selectedOptions: MultiSelectOptions;
  };
};

export default {
  setup(props: Props) {
    const key = ref(props.params.key);
    const options = ref(props.params.options);
    const selectedOptions = ref(
      props.params.options.filter((opt) => opt.checked)
    );

    return {
      key,
      options,
      selectedOptions,
      getValue: () => {
        const selectedValues = selectedOptions.value.map((opt) => opt.value);
        return selectedValues;
      },
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
