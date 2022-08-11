<template>
  <fieldset>
    <label v-if="{ label }">{{ label }}</label>
    <input v-model="moneyValue" type="number" step="0.01" />
  </fieldset>
</template>
<script setup lang="ts">
import { ref, watch } from "vue";

type Emits = {
  (e: "changeInMoney", data: number): void;
};
type Props = {
  label?: string;
  value?: number;
};

const emit = defineEmits<Emits>();
const props = defineProps<Props>();

const moneyValue = ref(props.value.toFixed(2));

watch(moneyValue, () => {
  emit("changeInMoney", parseFloat(moneyValue.value));
});
</script>

<style scoped></style>
