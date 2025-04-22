<template>
  <Layout>
    <v-container>
      <InputSearch @update:keyword="searchKeyword = $event" />
      <div v-if="filteredRocket.length > 0">
        <v-row v-if="!rocketStore.isLoading">
          <v-col
            v-for="(rocket, index) in filteredRocket"
            :key="index"
            cols="12"
            sm="6"
            md="4"
          >
            <RouterLink :key="rocket.id" :to="`/detail/${rocket.id}`">
              <CardRocket
                :image="rocket.flickr_images[0]"
                :title="rocket.name"
                :subtitle="rocket.country"
                :text="rocket.description"
              />
            </RouterLink>
          </v-col>
        </v-row>
        <v-row v-else>
          <v-col
            v-for="(rocket, index) in 4"
            :key="index"
            cols="12"
            sm="6"
            md="4"
          >
            <CardRocketSkeleton :key="index" />
          </v-col>
        </v-row>
      </div>
      <div class="error-card" v-else-if="rocketStore.error">
        <p class="text-h6 mt-2">{{ rocketStore.error }}</p>
        <v-btn color="red" class="mt-3" @click="getRocket">Retry</v-btn>
      </div>
      <div v-else class="empty-card">
        <CardEmpty />
      </div>
    </v-container>
  </Layout>
</template>
<script setup lang="ts">
import spaceXService from "../../services/spaceXService";
import { computed, onMounted, ref } from "vue";
import InputSearch from "../../components/InputSearch/InputSearch.vue";
import Layout from "../../components/Layout/Layout.vue";
import { RouterLink } from "vue-router";
import CardRocketSkeleton from "../../components/CardRocketSkeleton/CardRocketSkeleton.vue";
import CardEmpty from "../../components/CardEmpty/CardEmpty.vue";
import { useRocketStore } from "../../stores/rocketStore";

const searchKeyword = ref("");

const rocketStore = useRocketStore();
rocketStore.fetchRocketList();
console.log(rocketStore.rockets);
const filteredRocket = computed(() =>
  rocketStore.rockets.filter((rocket) => {
    const keyword = searchKeyword.value.toLowerCase();
    return (
      rocket.name.toLowerCase().includes(keyword) ||
      rocket.country.toLowerCase().includes(keyword)
    );
  })
);

const getRocket = async () => {
  rocketStore.isLoading = true;
  rocketStore.error = null;
  try {
    const response = await spaceXService.getAllRocket();
    rocketStore.rockets = response.data;
  } catch (err) {
    rocketStore.error = "Failed get list rocket, please try again";
    console.log(err);
  } finally {
    rocketStore.isLoading = false;
  }
};

onMounted(() => {
  getRocket();
});
</script>
<style scoped src="./Home.scss"></style>
