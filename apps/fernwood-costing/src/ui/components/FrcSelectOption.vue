<template>
  <fieldset>
    <label :for="inputId" v-if="{ label }">{{ label }}</label>
    <select :id="inputId" v-model="selectedOption">
      <option disabled :value="null">Please select one</option>
      <option
        v-for="option in sortedOptions"
        :value="option"
        :key="option[optionKey]"
      >
        {{ option[optionKey] }}
      </option>
    </select>
  </fieldset>
</template>
<script setup lang="ts">
import { ref, watch } from "vue";

type Props = {
  label?: string;
  options: Record<string, any>[];
  optionKey: string;
};

const props = defineProps<Props>();

const sortedOptions = [...props.options].sort((a, b) =>
  a[props.optionKey].localeCompare(b[props.optionKey])
);

const selectedOption = ref(null);

type Emits = {
  (e: "submitSelect", data: Record<string, any>): void;
};

const inputId = ref(props.label.replace(" ", "-").toLowerCase());

const emit = defineEmits<Emits>();

watch(selectedOption, () => {
  if (selectedOption.value) {
    emit("submitSelect", selectedOption.value);

    // We wrap in an if statement to avoid firing emit twice when we reset
    // the selected option to null.
    selectedOption.value = null;
  }
});
</script>
