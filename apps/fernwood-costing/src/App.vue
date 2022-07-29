<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import NavBar from "@/components/AuthNavBar.vue";
</script>

<template>
  <main>
    <header>
      <NavBar />
      <nav>
        <ul>
          <li><RouterLink to="/supplies">Supplies</RouterLink></li>
          <li><RouterLink to="/menu-items">Menu Items</RouterLink></li>
        </ul>
      </nav>
    </header>
    <article>
      <RouterView />
    </article>
  </main>
</template>

<style></style>
