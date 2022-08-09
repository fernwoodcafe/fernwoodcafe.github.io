<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import type { AppStatus } from "./types/AppStatus";

type Props = {
  status: AppStatus;
};

defineProps<Props>();
</script>

<template>
  <main>
    <header>
      <nav>
        <ul>
          <li><RouterLink to="/supplies">Supplies</RouterLink></li>
          <li><RouterLink to="/menu-items">Menu Items</RouterLink></li>
        </ul>
      </nav>
      <aside>
        {{ status.message }}
      </aside>
    </header>
    <article>
      <RouterView />
    </article>
  </main>
</template>
