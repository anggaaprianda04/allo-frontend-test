<template>
  <v-card class="card-rocket" max-width="400" style="padding: 10px">
    <v-skeleton-loader type="image" height="200px" />

    <v-card-title>
      <v-skeleton-loader type="heading" width="70%" />
    </v-card-title>

    <v-card-text>
      <v-skeleton-loader type="text" width="100%" />
    </v-card-text>
  </v-card>
</template>
<script lang="ts">
export default {
  name: "CardRocketSkeleton",
};
</script>
