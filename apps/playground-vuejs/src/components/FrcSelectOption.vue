<template>
  <select v-model="selectedOption">
    <option disabled :value="{}">Please select one</option>
    <option v-for="option in options" :value="option">
      {{ option[labelKey] }}
    </option>
  </select>
  <button @click="onClick">
    Add Ingredient - {{ selectedOption[labelKey] }}
  </button>
</template>
<script setup lang="ts">
import { ref } from "vue";

type Props = {
  options: any[];
  labelKey: string;
};

const selectedOption = ref({});

defineProps<Props>();

type Emits = {
  (e: "submitSelect", data: any): void;
};

const emit = defineEmits<Emits>();

const onClick = () => {
  emit("submitSelect", selectedOption.value);
};
</script>
