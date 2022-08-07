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
  value: string | number;
  type: string;
};

defineProps<Props>();
const emit = defineEmits<Emits>();
</script>

<style scoped>
fieldset {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  row-gap: 5px;
}

fieldset label {
  flex: 0 0 auto;
  font-weight: 600;
}

fieldset input {
  height: 1.2rem;
}
</style>
