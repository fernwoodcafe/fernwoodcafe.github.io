<template>
  <div class="recipes">
    <h1>Recipes</h1>
    <header>
      <nav>
        <li><RouterLink to="/recipes/espresso">Espresso</RouterLink></li>
        <li><RouterLink to="/recipes/americano">Americano</RouterLink></li>
      </nav>
    </header>
    <RouterView />
  </div>
</template>

<script setup></script>
