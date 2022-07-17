<template>
  <select v-model="selectedOption">
    <option disabled :value="{}">Please select one</option>
    <option v-for="option in options" :value="option.value">
      {{ option.label }}
    </option>
  </select>
  <button @click="onClickSubmit">
    Add Ingredient - {{ selectedOption.label }}
  </button>
</template>
<script setup lang="ts">
type Props = {
  options: any[];
  selectedOption: any;
  onClickSubmit: any;
};

defineProps<Props>();
</script>
