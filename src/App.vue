<template>
  <v-app style="background-color: #042324">
    <v-main class="mt-14">
      <MiniPlayer class="mt-14" />
    </v-main>
  </v-app>
</template>

<script>
import MiniPlayer from "@/components/MiniPlayer.vue";

export default {
  name: "App",

  components: {
    MiniPlayer,
  },

  data: () => ({
    //
  }),
};
</script>
