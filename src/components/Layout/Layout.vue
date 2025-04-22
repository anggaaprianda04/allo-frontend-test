<template>
  <v-app class="main-page">
    <Navbar />
    <main class="main-body">
      <slot />
    </main>
  </v-app>
</template>
<script lang="ts">
import Navbar from "../Navbar/Navbar.vue";

export default {
  name: "Layout",
  components: {
    Navbar,
  },
};
</script>
<style scoped src="./Layout.scss"></style>
