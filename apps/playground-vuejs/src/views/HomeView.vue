<template>
  <div class="home">
    <h1>Welcome</h1>
    <button @click="incrementOuter()">
      {{ counterOuter }}
    </button>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

defineProps({
  counterOuter: Number,
  incrementOuter: Function,
});
</script>
