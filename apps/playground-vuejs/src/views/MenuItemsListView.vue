<template>
  <h1>Menu Items</h1>
  <nav>
    <li :key="item.id" v-for="item in menuItemsList.items">
      <RouterLink :to="`/menu-items/${item.menuItemId}`">{{
        item.menuItemId
      }}</RouterLink>
    </li>
  </nav>
  <RouterView :key="$route.fullPath" />
</template>

<script setup lang="ts">
type Props = {
  menuItemsList: ReactiveArray<CafeDomain.MenuItem>;
};

defineProps<Props>();
</script>
