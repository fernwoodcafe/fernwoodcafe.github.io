<template>
  <fieldset>
    <label v-if="{ label }">{{ label }}</label>
    <select v-model="selectedOption">
      <option disabled :value="null">Please select one</option>
      <option
        v-for="option in options"
        :value="option"
        :key="option[optionKey]"
      >
        {{ option[optionKey] }}
      </option>
    </select>
    <input
      type="button"
      :enabled="selectedOption != null"
      @click="onClick"
      :value="`Add ${selectedOption?.[optionKey]}`"
    />
  </fieldset>
</template>
<script setup lang="ts">
import { ref } from "vue";

type Props = {
  label?: string;
  options: Record<string, any>[];
  optionKey: string;
};

const selectedOption = ref(null);

defineProps<Props>();

type Emits = {
  (e: "submitSelect", data: any): void;
};

const emit = defineEmits<Emits>();

const onClick = () => {
  emit("submitSelect", selectedOption.value);
  selectedOption.value = null;
};
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
}

fieldset select {
  flex: 0 0 auto;
}

fieldset input[type="button"] {
  margin: 0;
  flex: 0 0 auto;
}

fieldset input[type="button"][enabled="true"] {
  visibility: visible;
}

fieldset input[type="button"][enabled="false"] {
  visibility: hidden;
}
</style>
