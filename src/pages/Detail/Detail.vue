<template>
  <Layout>
    <v-container>
      <v-row justify="center">
        <v-col cols="12" md="8" v-if="!isLoading">
          <v-card>
            <v-img
              v-if="rocket?.flickr_images?.length"
              :src="rocket.flickr_images[0]"
              height="300px"
              cover
            ></v-img>

            <v-card-title class="text-h5">{{ rocket?.name }}</v-card-title>

            <v-card-text>
              <p class="text-body-1 mb-4">{{ rocket?.description }}</p>
              <v-list dense>
                <v-list-item>
                  <v-list-item-title
                    ><strong>Cost per Launch:</strong> ${{
                      rocket?.cost_per_launch.toLocaleString()
                    }}</v-list-item-title
                  >
                </v-list-item>
                <v-list-item>
                  <v-list-item-title
                    ><strong>Country:</strong>
                    {{ rocket?.country }}</v-list-item-title
                  >
                </v-list-item>
                <v-list-item>
                  <v-list-item-title
                    ><strong>First Flight:</strong>
                    {{ rocket?.first_flight }}</v-list-item-title
                  >
                </v-list-item>
              </v-list>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" md="8" v-else-if="error">
          <v-card class="pa-4 text-center" color="red lighten-5">
            <p class="text-h6 mt-2">{{ error }}</p>
            <v-btn color="red" class="mt-3" @click="getByRocketDetail"
              >Retry</v-btn
            >
          </v-card>
        </v-col>

        <v-col cols="12" md="8" class="text-center" v-else>
          <v-card>
            <v-skeleton-loader
              type="image, heading, text"
              :elevation="4"
              color="secondary"
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

export default defineComponent({
  setup() {
    const route = useRoute();
    const rocketId = route.params?.id ?? "";

    const error = ref<string | null>(null);
    const rocket = ref<IRocket | null>(null);
    const isLoading = ref(false);

    const getByRocketDetail = async () => {
      isLoading.value = true;
      error.value = null;
      try {
        const response = await spaceXService.getDetailByIdRocket(
          rocketId as string
        );
        rocket.value = response.data;
      } catch (err) {
        error.value = "Failed get detail rocket, please try again";
        console.error(err);
      } finally {
        isLoading.value = false;
      }
    };

    onMounted(() => {
      if (rocketId) getByRocketDetail();
    });

    return {
      rocket,
      isLoading,
      error,
      getByRocketDetail,
    };
  },
});
</script>
<style scoped>
.v-img {
  border-bottom: 1px solid #ddd;
}
</style>
