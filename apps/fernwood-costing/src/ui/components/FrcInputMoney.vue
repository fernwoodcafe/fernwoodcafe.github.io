<template>
  <fieldset>
    <label v-if="{ label }">{{ label }}</label>
    <input v-model.lazy.number="moneyRef" type="number" />
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

const moneyRef = ref(props.value);

watch(moneyRef, () => {
  emit("changeInMoney", moneyRef.value);
});
</script>

<style scoped></style>
