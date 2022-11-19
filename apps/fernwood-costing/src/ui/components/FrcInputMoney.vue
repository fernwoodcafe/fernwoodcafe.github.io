<template>
  <fieldset>
    <label v-if="{ label }" for="{{foo}}">{{ label }}</label>
    <input id="{{foo}}" v-model.lazy.number="moneyRef" type="number" />
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

// See https://eslint.vuejs.org/user-guide/#the-variables-used-in-the-template-are-warned-by-no-unused-vars-rule
// See also our local file: .eslintrc.cjs
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const inputId = ref(props.label);

const moneyRef = ref(props.value);

watch(moneyRef, () => {
  emit("changeInMoney", moneyRef.value);
});
</script>

<style scoped></style>
