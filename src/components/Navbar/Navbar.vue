<script setup lang="ts">
import { RouterLink } from "vue-router";
</script>

<template>
  <div class="navbar">
    <RouterLink to="/" style="text-decoration: none; color: white">
      <div class="navbar-title">
        <h1>Space X</h1>
      </div>
    </RouterLink>
  </div>
</template>

<style scoped src="./Navbar.scss"></style>
