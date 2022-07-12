<template>
  <select v-model="selectedOption">
    <option v-for="item in options" :value="item.key">{{ item.value }}</option>
  </select>
</template>
<script setup>
import { ref } from "vue";

const props = defineProps(["params"]);

const options = props.params.values;

const selectedOption = ref({});

const getValue = () => {
  console.log("getValue", selectedOption);
  return selectedOption.value;
};
</script>
<style>
select {
  width: 100%;
}
</style>
