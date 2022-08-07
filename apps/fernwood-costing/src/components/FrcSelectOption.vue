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
    <input
      type="button"
      :enabled="selectedOption != null"
      @click="onAddClick"
      :value="`Add ${selectedOption?.[optionKey]}`"
    />
    <input
      type="button"
      :enabled="selectedOption != null"
      @click="onCancelClick"
      :value="`Cancel`"
    />
  </fieldset>
</template>
<script setup lang="ts">
import { ref } from "vue";

type Props = {
  label?: string;
  options: Record<string, any>[];
  optionKey: string;
};

const selectedOption = ref(null);

defineProps<Props>();

type Emits = {
  (e: "submitSelect", data: any): void;
};

const emit = defineEmits<Emits>();

const onAddClick = () => {
  emit("submitSelect", selectedOption.value);
  selectedOption.value = null;
};

const onCancelClick = () => {
  selectedOption.value = null;
};
</script>

<style scoped>
fieldset input[type="button"][enabled="true"] {
  visibility: visible;
  margin: 0;
}

fieldset input[type="button"][enabled="false"] {
  visibility: hidden;
}
</style>
