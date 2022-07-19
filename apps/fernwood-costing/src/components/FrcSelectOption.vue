<template>
  <fieldset>
    <label>{{ title }}</label>
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
    <button :enabled="selectedOption != null" @click="onClick">
      Add {{ selectedOption?.[optionKey] }}
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
  flex-wrap: wrap;
  align-items: baseline;
}

fieldset label {
  flex: 0 0 80px;
  font-weight: 600;
}

fieldset select {
  flex: 0 0 400px;
}

fieldset button,
fieldset button:hover {
  flex: 0 0 480px;
  color: white;
  background-color: #5a9f71;
}

fieldset button[enabled="true"] {
  visibility: visible;
}

fieldset button[enabled="false"] {
  visibility: hidden;
}
</style>
