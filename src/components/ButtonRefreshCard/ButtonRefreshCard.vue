<template>
  <div class="error-card">
    <p class="text-h6 mt-2">{{ title }}</p>
    <v-btn
      prepend-icon="mdi-refresh"
      color="red"
      @click="retryButton"
      class="mt-3"
      >Retry</v-btn
    >
  </div>
</template>
<script lang="ts">
export default {
  name: "ButtonRefreshCard",
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  methods: {
    retryButton() {
      this.$emit("retryClick");
    },
  },
};
</script>
<style scoped src="./ButtonRefreshCard.scss"></style>
