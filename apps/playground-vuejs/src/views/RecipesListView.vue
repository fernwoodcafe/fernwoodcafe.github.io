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
    <RouterView />
  </div>
</template>

<script setup lang="ts">
type Recipe = {
  id: string;
  recipeId: string;
};
type Props = {
  recipesList: {
    items: Recipe[];
  };
};

defineProps<Props>();
</script>
