<template>
  <select v-model="selectedIngredient">
    <option disabled :value="{}">Please select one</option>
    <option v-for="option in ingredientOptions" :value="option">
      {{ option.supplyName }}
    </option>
  </select>
  <button @click="onClickNewIngredient">
    Add Ingredient - {{ selectedIngredient.supplyName }}
  </button>
</template>
<script setup lang="ts">
type Props = {
  selectedIngredient: any;
  ingredientOptions: any;
};

defineProps<Props>();
</script>
