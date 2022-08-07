<template>
  <fieldset>
    <label v-if="{ label }">{{ label }}</label>
    <input @change="emit.change" :value="value" :type="type" />
  </fieldset>
</template>
<script setup lang="ts">
type Emits = {
  change: (e: Event) => void;
};
type Props = {
  label?: string;
  value?: string | number;
  type: string;
};

defineProps<Props>();
const emit = defineEmits<Emits>();
</script>

<style scoped></style>
