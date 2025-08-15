<script setup lang="ts">
import Header from "./components/Header.vue";
</script>

<template>
  <Header/>
  <main class="container mx-auto p-4">
    <RouterView/>
  </main>
</template>