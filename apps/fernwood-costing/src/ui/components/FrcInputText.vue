<template>
  <fieldset>
    <label v-if="{ label }">{{ label }}</label>
    <input v-model.lazy="textRef" type="text" />
  </fieldset>
</template>
<script setup lang="ts">
import { ref, watch } from "vue";

type Emits = {
  (e: "changeInText", data: string): void;
};
type Props = {
  label?: string;
  value?: string;
};

const emit = defineEmits<Emits>();
const props = defineProps<Props>();

const textRef = ref(props.value);

watch(textRef, () => {
  emit("changeInText", textRef.value);
});
</script>

<style scoped></style>
