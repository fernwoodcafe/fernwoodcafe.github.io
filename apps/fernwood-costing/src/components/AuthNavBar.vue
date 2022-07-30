<template>
  <SignOutButton v-if="isAuthenticated" />
  <SignInButton v-else />
</template>

<script setup lang="ts">
import { useIsAuthenticated } from "@/composition-api/useIsAuthenticated";
import SignInButton from "./AuthSignInButton.vue";
import SignOutButton from "./AuthSignOutButton.vue";

const isAuthenticated = useIsAuthenticated();
</script>
