<template>
  <h1>Menu Items</h1>
  <nav>
    <li :key="item.id" v-for="item in menuItemList.items">
      <RouterLink :to="`/menu-items/${item.menuItemId}`">{{
        item.menuItemId
      }}</RouterLink>
    </li>
  </nav>
  <RouterView :key="$route.fullPath" />
</template>

<script setup lang="ts">
type Props = {
  menuItemList: ReactiveArray<CafeMenuItem>;
};

defineProps<Props>();
</script>
