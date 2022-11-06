<template>
  <fieldset>
    <label v-if="{ label }">{{ label }}</label>
    <input v-model.lazy="numberRef" type="number" />
  </fieldset>
</template>
<script setup lang="ts">
import { ref, watch } from "vue";

type Emits = {
  // Consider making this changeInValue (along with FrcInputString) to enable polymorphism.
  (e: "changeInNumber", data: number): void;
};
type Props = {
  label?: string;
  value?: number;
};

const emit = defineEmits<Emits>();
const props = defineProps<Props>();

const numberRef = ref(props.value);

watch(numberRef, () => {
  emit("changeInNumber", numberRef.value);
});
</script>

<style scoped></style>
