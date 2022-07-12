<template>
  <div class="recipes">
    <h2>{{ recipeId }}</h2>
    <h3></h3>
  </div>
</template>

<script setup>
import { onMounted } from "vue";

const props = defineProps(["recipeId", "suppliesList"]);

onMounted(() => {
  console.log("mounted", props);
});
</script>
