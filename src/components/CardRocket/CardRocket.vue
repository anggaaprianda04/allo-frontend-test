<template>
  <v-card class="card-rocket" max-width="400">
    <v-img :src="image" height="200px" cover />
    <v-card-title>{{ title }}</v-card-title>
    <v-card-subtitle>{{ subtitle }}</v-card-subtitle>
    <v-card-text class="text-desc">{{ text }}</v-card-text>
  </v-card>
</template>
<script lang="ts">
export default {
  name: "CardRocket",
  props: {
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      required: true,
      default: "",
    },
    text: {
      type: String,
      required: true,
      default: "",
    },
    image: {
      type: String,
      required: true,
    },
  },
};
</script>
<style scoped src="./CardRocket.scss"></style>
