<template>
  <input @change="emit.change" :value="value" :type="type" />
</template>
<script setup lang="ts">
type Emits = {
  change: (e: Event) => void;
};
type Props = {
  value: string;
  type: "text";
};

defineProps<Props>();
const emit = defineEmits<Emits>();
</script>
