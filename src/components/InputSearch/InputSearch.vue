<template>
  <v-text-field
    v-model="keyword"
    label="Search Rocket"
    @input="onInputChange"
  />
</template>
<script setup lang="ts">
import { ref } from "vue";

const keyword = ref("");

const emit = defineEmits<{
  (e: "update:keyword", value: string): void;
}>();

const onInputChange = () => {
  emit("update:keyword", keyword.value);
};
</script>
<style scoped src="./InputSearch.scss"></style>
