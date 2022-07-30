<template>
  <WelcomeName />
  <button v-on:click="logoutRedirect">Logout</button>
</template>
<script setup lang="ts">
import { useMsal } from "@/composition-api/useMsal";
import WelcomeName from "./AuthWelcomeName.vue";

const { instance } = useMsal();

const logoutRedirect = () => {
  instance.logoutRedirect();
};
</script>
