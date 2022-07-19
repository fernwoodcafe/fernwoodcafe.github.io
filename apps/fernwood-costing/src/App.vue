<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <header>
    <nav>
      <ul>
        <li><RouterLink to="/supplies">Supplies</RouterLink></li>
        <li><RouterLink to="/menu-items">Menu Items</RouterLink></li>
      </ul>
    </nav>
  </header>

  <RouterView />
</template>

<style></style>
