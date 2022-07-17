<template>
  <fieldset>
    <label>{{ title }}</label>
    <select v-model="selectedOption">
      <option disabled :value="null">Please select one</option>
      <option v-for="option in options" :value="option">
        {{ option[optionKey] }}
      </option>
    </select>
    <button v-if="selectedOption" @click="onClick">
      Add {{ selectedOption[optionKey] }}
    </button>
  </fieldset>
</template>
<script setup lang="ts">
import { ref } from "vue";

type Props = {
  title: string;
  options: any[];
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
  align-items: baseline;
  align-content: space-between;
}

fieldset label {
  flex: 1 1 auto;
  font-weight: 500;
}
fieldset select {
  flex: 1 1 auto;
}
fieldset button {
  flex: 1 1 auto;
}

button,
button:hover {
  color: white;
  background-color: #5a9f71;
}
</style>
