<template>
  <input type="button" v-on:click="loginRedirect" value="Sign In" />
</template>

<script setup lang="ts">
import { useMsal } from "@/auth-msft/useMsal";
import { loginRequest } from "../authConfig";

const { instance } = useMsal();

const loginRedirect = () => {
  instance.loginRedirect(loginRequest);
};
</script>
