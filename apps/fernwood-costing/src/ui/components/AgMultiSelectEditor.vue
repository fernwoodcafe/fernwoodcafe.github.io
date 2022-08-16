<template>
  <form>
    <label v-for="option in options" :key="option.key">
      <input type="checkbox" :value="option" v-model="selectedOptions" />
      {{ option.label }}
    </label>
  </form>
</template>
<script lang="ts">
import type { ICellEditorParams } from "ag-grid-community";
import { ref } from "vue";

type MultiSelectOption = {
  key: string;
  value: unknown; // TODO [maybe] Change value to model.
  label: string;
  checked: boolean;
};

type MultiSelectOptions = MultiSelectOption[];

type Props = {
  params: ICellEditorParams & {
    options: MultiSelectOptions;
    selectedOptions: MultiSelectOptions;
  };
};

export default {
  setup(props: Props) {
    const options = ref(props.params.options);
    const selectedOptions = ref(
      props.params.options.filter((opt) => opt.checked)
    );

    console.log("setup.selectedOptions", JSON.stringify(selectedOptions.value));
    return {
      options,
      selectedOptions,
      getValue: () => {
        const selectedValues = selectedOptions.value.map((opt) => opt.value);
        console.log("getValue.selectedOptions", JSON.stringify(selectedValues));
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
