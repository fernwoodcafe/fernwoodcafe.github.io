<template>
  <div class="recipes">
    <h1>Recipes</h1>
    <header>
      <nav>
        <li :key="item.id" v-for="item in recipesList.items">
          <RouterLink :to="`/recipes/${item.recipeId}`">{{
            item.recipeId
          }}</RouterLink>
        </li>
      </nav>
    </header>
    <RouterView />
  </div>
</template>

<script setup>
defineProps(["recipesList"]);
</script>
