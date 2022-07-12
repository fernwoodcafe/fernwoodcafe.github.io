<template>
  <select v-model="selectedOption">
    <option v-for="item in options" :value="item.key">{{ item.value }}</option>
  </select>
</template>
<script setup>
import { ref } from "vue";

const props = defineProps(["params"]);

console.log(props);

const options = props.params.supplySelectOptions;

const selectedOption = ref({});

const getValue = () => selectedOption.value;

defineExpose({
  getValue,
});
</script>
<style>
select {
  width: 100%;
}
</style>
