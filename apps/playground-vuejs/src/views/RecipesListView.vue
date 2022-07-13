CafeRecipe
<template>
  <div class="recipes">
    <h1>Recipes</h1>
    <nav>
      <li :key="item.id" v-for="item in recipesList.items">
        <RouterLink :to="`/recipes/${item.recipeId}`">{{
          item.recipeId
        }}</RouterLink>
      </li>
    </nav>
    <RouterView :key="$route.fullPath" />
  </div>
</template>

<script setup lang="ts">
type Props = {
  recipesList: ReactiveArray<CafeRecipe>;
};

defineProps<Props>();
</script>
