<template>
  <fieldset>
    <label v-if="{ label }">{{ label }}</label>
    <input v-model="percentValue" type="number" />
  </fieldset>
</template>
<script setup lang="ts">
import { ref, watch } from "vue";

type Emits = {
  (e: "percentChange", data: number): void;
};
type Props = {
  label?: string;
  value?: number;
};

const emit = defineEmits<Emits>();
const props = defineProps<Props>();

const percentValue = ref(props.value * 100);

watch(percentValue, () => {
  emit("changeInPercent", percentValue.value / 100);
});
</script>

<style scoped></style>
