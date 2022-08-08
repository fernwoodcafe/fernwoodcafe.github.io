<template>
  <fieldset>
    <label v-if="{ label }">{{ label }}</label>
    <select v-model="selectedOption">
      <option disabled :value="null">Please select one</option>
      <option
        v-for="option in options"
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

const selectedOption = ref(null);

defineProps<Props>();

type Emits = {
  (e: "submitSelect", data: Record<string, any>): void;
};

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
