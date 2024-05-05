<script setup>
import Navbar from "@/components/Navbar.vue";
</script>

<template>
  <main>
    <Navbar></Navbar>
    <router-view />
  </main>
</template>

<style>
* {
  margin: 0;
  padding: 0;
}
</style>
