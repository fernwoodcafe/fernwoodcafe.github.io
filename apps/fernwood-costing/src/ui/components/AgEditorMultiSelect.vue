<template>
  <fieldset>
    <label v-for="option in options" :key="option[key]" for="{{key}}">
      <input
        id="{{key}}"
        type="checkbox"
        :value="option"
        v-model="selectedOptions"
      />
      {{ option[label] }}
    </label>
  </fieldset>
</template>
<script lang="ts">
import type { ICellEditorParams } from "ag-grid-community";
import { ref } from "vue";

type Props = {
  params: ICellEditorParams & {
    key: string;
    label: string;
    options: unknown[];
  };
};

export default {
  setup(props: Props) {
    const key = ref(props.params.key);
    const label = ref(props.params.label);
    const options = ref(props.params.options);
    const selectedOptions = ref(
      options.value.filter((opt) =>
        props.params.value.find((val) => val[key.value] === opt[key.value])
      )
    );

    return {
      key,
      label,
      options,
      selectedOptions,
      getValue: () => selectedOptions.value,
    };
  },
};
</script>

<style>
form {
  display: grid;
  grid-template-rows: repeat(5, 24px);
  column-gap: 10px;
  grid-auto-flow: column;
  padding: 5px;
}
</style>
