<template>
  <v-container>
    <v-row>
      <v-col cols="12" style="border: 5px solid #ff80ab">
        <v-card color="#E3F2FD" outlined elevation="50" hover>
          <!-- <v-card-title>Mini Player</v-card-title> -->
          <v-card-text>
            <v-row>
              <v-col cols="6">
                <v-img
                  :src="musicStore.getCurrentSong.image"
                  height="400px"
                  width="400px"
                  position="center center "
                  @click="playSong(musicStore.getCurrentSong)"
                ></v-img>
              </v-col>
              <v-col cols="6">
                <h1 class="text-h5 font-weight-bold mb-3">
                  {{ musicStore.getCurrentSong.artist }} - 🎤
                </h1>
                <v-virtual-scroll
                  :items="musicStore.getMusic"
                  :item-height="50"
                  :height="400"
                >
                  <template v-slot="{ item }">
                    <v-list-item
                      @click="playSong(item)"
                      color="red"
                      :key="item.id"
                    >
                      <v-list-item-content>
                        <v-list-item-title>
                          {{ item.name }}
                        </v-list-item-title>
                        <v-list-item-subtitle>
                          {{ item.artist }}
                        </v-list-item-subtitle>
                      </v-list-item-content>
                      <!-- <v-list-item-action>
                        <v-btn icon>
                          <v-icon @click="playSong(item)">mdi-play</v-icon>
                        </v-btn>
                      </v-list-item-action> -->
                    </v-list-item>
                  </template>
                </v-virtual-scroll>
              </v-col>

              <v-col cols="12">
                <v-row>
                  <v-col cols="12">
                    <v-card-title>
                      {{ musicStore.getCurrentSong.artist }} - 🎤

                      <v-spacer></v-spacer>

                      <v-btn icon v-if="musicStore.isFavorited">
                        <v-icon color="red"> mdi-heart </v-icon>
                      </v-btn>
                      <v-btn icon v-else>
                        <v-icon @click="favorite"> mdi-heart </v-icon>
                      </v-btn>
                    </v-card-title>
                  </v-col>
                  <v-col cols="12">
                    <v-card-subtitle>
                      {{ musicStore.getCurrentSong.name }} - 🎵
                    </v-card-subtitle>

                    <!-- end
                    {{ musicStore.getCurrentlyTimer }}

                    total
                    {{ musicStore.getDurationMinandSecs }} -->
                    <!-- <v-slider
                      v-model="musicStore.getCurrentlyTimer"
                      :max="musicStore.totalTime"
                      :min="musicStore.getCurrentlyTimer"
                      step="1"
                      thumb-label
                      thumb-color="primary"
                      track-color="primary"
                      @change="musicStore.currentlyTimer"
                    ></v-slider> -->
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions class="justify-center">
            <v-tooltip bottom color="success">
              <template v-slot:activator="{ on }">
                <v-btn icon v-on="on">
                  <v-icon @click="playSong(musicStore.getCurrentSong)"
                    >mdi-play</v-icon
                  >
                </v-btn>
              </template>
              <span>play</span>
            </v-tooltip>

            <v-tooltip bottom color="warning">
              <template v-slot:activator="{ on }">
                <v-btn icon v-on="on">
                  <v-icon @click="pause">mdi-pause</v-icon>
                </v-btn>
              </template>
              <span>pause</span>
            </v-tooltip>

            <v-tooltip bottom color="primary">
              <template v-slot:activator="{ on }">
                <v-btn icon v-on="on">
                  <v-icon @click="next">mdi-skip-next-circle</v-icon>
                </v-btn>
              </template>
              <span>next Song</span>
            </v-tooltip>

            <v-tooltip bottom color="primary">
              <template v-slot:activator="{ on }">
                <v-btn icon v-on="on">
                  <v-icon @click="previous">mdi-skip-previous-circle</v-icon>
                </v-btn>
              </template>
              <span>previous Song</span>
            </v-tooltip>

            <!-- <v-spacer></v-spacer> -->
            <v-tooltip bottom color="warning">
              <template v-slot:activator="{ on }">
                <v-btn icon v-on="on">
                  <v-icon @click="shuffle">mdi-shuffle</v-icon>
                </v-btn>
              </template>
              <span>shuffle</span>
            </v-tooltip>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { useMusicStore } from "@/store/useMusicStore";
// import { sourceContentFor } from "@jridgewell/trace-mapping";
export default {
  name: "MiniPlayer",

  setup() {
    const musicStore = useMusicStore();

    const getAllMusic = () => {
      musicStore.getMusic();
    };

    // computed property to get the current song

    const current = () => {
      musicStore.getCurrentSong();
    };

    // function to play the music
    const playSong = (song) => {
      musicStore.playMusic(song);
      console.log("play song");
    };

    const pause = () => {
      musicStore.pauseMusic();
    };

    const stop = () => {
      musicStore.stopMusic();
    };

    const next = () => {
      musicStore.playNext();
    };

    const previous = () => {
      musicStore.playPrevious();
    };

    //shaffle the music
    const shuffle = () => {
      musicStore.shuffleMusic();
    };

    //mark as favorite
    const favorite = (song) => {
      musicStore.favoriteSong(song);
    };

    return {
      musicStore,
      shuffle,
      favorite,
      playSong,
      pause,
      stop,
      next,
      previous,
      getAllMusic,
      current,
    };
  },
};
</script>

<style></style>
