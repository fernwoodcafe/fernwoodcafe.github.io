<template>
  <input type="button" v-on:click="logoutRedirect" value="Sign Out" />
  <WelcomeName />
</template>
<script setup lang="ts">
import { useMsal } from "@/auth-msft/useMsal";
import WelcomeName from "./AuthWelcomeName.vue";

const { instance } = useMsal();

const logoutRedirect = () => {
  instance.logoutRedirect();
};
</script>
