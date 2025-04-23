<template>
  <Layout>
    <v-container>
      <div>
        <ButtonRefreshCard
          v-if="rocketStore.error && !rocketStore.isLoading"
          title="Failed get detail rocket, please try again"
          @retryClick="getByRocketDetail"
        />
      </div>
      <v-row justify="center">
        <v-col
          v-if="!rocketStore.isLoading && rocketStore.rocket"
          cols="12"
          md="8"
        >
          <v-card>
            <v-img
              :src="rocketStore.rocket.flickr_images[0]"
              height="300px"
              cover
            ></v-img>

            <v-card-title class="text-h5">{{
              rocketStore.rocket.name
            }}</v-card-title>

            <v-card-text>
              <p class="text-body-1 mb-4">
                {{ rocketStore.rocket.description }}
              </p>
              <v-list dense>
                <v-list-item>
                  <v-list-item-title
                    ><strong>Cost per Launch:</strong> ${{
                      rocketStore.rocket.cost_per_launch.toLocaleString()
                    }}</v-list-item-title
                  >
                </v-list-item>
                <v-list-item>
                  <v-list-item-title
                    ><strong>Country:</strong>
                    {{ rocketStore.rocket.country }}</v-list-item-title
                  >
                </v-list-item>
                <v-list-item>
                  <v-list-item-title
                    ><strong>First Flight:</strong>
                    {{ rocketStore.rocket.first_flight }}</v-list-item-title
                  >
                </v-list-item>
              </v-list>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col v-else cols="12" md="8" class="text-center">
          <v-card>
            <v-skeleton-loader
              type="image, heading, text"
              :elevation="4"
              class="rocket-skeleton"
            ></v-skeleton-loader>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </Layout>
</template>
<script lang="ts">
import { useRoute } from "vue-router";
import Layout from "../../components/Layout/Layout.vue";
import { defineComponent, onMounted, ref } from "vue";
import type { IRocket } from "@/types/Rocket";
import spaceXService from "@/services/spaceXService";
import { useRocketStore } from "@/stores/rocketStore";
import ButtonRefreshCard from "@/components/ButtonRefreshCard/ButtonRefreshCard.vue";

export default defineComponent({
  setup() {
    const route = useRoute();
    const rocketId = route.params?.id ?? "";
    const rocketStore = useRocketStore();
    rocketStore.getDetailRocket(rocketId as string);

    const getByRocketDetail = async () => {
      await rocketStore.getDetailRocket(rocketId as string);
    };

    onMounted(() => {
      if (rocketId) getByRocketDetail();
    });

    return {
      getByRocketDetail,
      rocketStore,
    };
  },
});
</script>
