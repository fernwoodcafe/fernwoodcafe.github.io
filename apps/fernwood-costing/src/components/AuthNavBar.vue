<template>
  <SignOutButton v-if="isAuthenticated" />
  <SignInButton v-else />
</template>

<script setup lang="ts">
import { useIsAuthenticated } from "@/auth-msft/useIsAuthenticated";
import SignInButton from "./AuthSignInButton.vue";
import SignOutButton from "./AuthSignOutButton.vue";

const isAuthenticated = useIsAuthenticated();
</script>
