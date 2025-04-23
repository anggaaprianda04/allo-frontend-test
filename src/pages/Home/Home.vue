<template>
  <Layout>
    <v-container>
      <InputSearch @update:keyword="searchKeyword = $event" />
      <div>
        <v-row v-if="filteredRocket.length">
          <v-col
            v-for="(rocket, index) in filteredRocket"
            :key="index"
            cols="12"
            sm="6"
            md="4"
            lg="3"
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

        <v-row v-if="rocketStore.isLoading && !filteredRocket.length">
          <v-col
            v-for="(rocket, index) in 4"
            :key="index"
            cols="12"
            sm="6"
            md="4"
            lg="3"
          >
            <CardRocketSkeleton :key="index" />
          </v-col>
        </v-row>
        <ButtonRefreshCard
          v-else-if="rocketStore.error && !rocketStore.isLoading"
          title="Failed get list rocket, please try again"
          @retryClick="getRocket"
        />
        <div
          v-else-if="!rocketStore.isLoading && !filteredRocket.length"
          class="empty-card"
        >
          <CardEmpty />
        </div>
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
import ButtonRefreshCard from "@/components/ButtonRefreshCard/ButtonRefreshCard.vue";

const searchKeyword = ref("");

const rocketStore = useRocketStore();
rocketStore.fetchRocketList();

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
  await rocketStore.fetchRocketList();
};

onMounted(() => {
  getRocket();
});
</script>
<style scoped src="./Home.scss"></style>
