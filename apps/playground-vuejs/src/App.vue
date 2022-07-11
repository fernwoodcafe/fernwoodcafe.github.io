<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <header>
    <nav>
      <li><RouterLink to="/supplies">Supplies</RouterLink></li>
      <li><RouterLink to="/recipes">Recipes</RouterLink></li>
      <li><RouterLink to="/staff">Staff</RouterLink></li>
      <li><RouterLink to="/schedules">Schedules</RouterLink></li>
    </nav>
  </header>

  <RouterView />
</template>

<style>
@import "@/assets/base.css";
</style>
