<template>
  <button v-on:click="loginRedirect">Login Redirect</button>
</template>

<script setup lang="ts">
import { useMsal } from "@/composition-api/useMsal";
import { loginRequest } from "../authConfig";

const { instance } = useMsal();

const loginPopup = () => {
  instance.loginPopup(loginRequest);
};

const loginRedirect = () => {
  instance.loginRedirect(loginRequest);
};
</script>
