import { defineStore } from "pinia";

export const useMusicStore = defineStore("music", {
  state: () => ({
    audio: null,
    // barwidth: null,
    // currentTimer: null,
    duration: null,
    isPlaying: false,
    index: 0,
    currentSong: null,
    player: new Audio(),
    currentlyTimer: "00:00",
    volume: 30,
    snackbarText: " increasing the volume might cause damage to your ears",
    snackbar: false,

    music: [
      {
        name: "Reckless Love",
        artist: "Cory Asbury",
        source: require("../assets/reckless love.mp3"),
        favorited: false,
        image: require("../assets/loj.jpg"),
      },
      {
        name: "Tasha cobbs",
        artist: "Your Spirit",

        source: require("../assets/Your Spirit .mp3"),

        favorited: false,
        image: require("../assets/music.jpg"),
      },
      {
        name: "All that matters",
        artist: "Guc",
        source: require("../assets/All That Matters .mp3"),
        favorited: false,

        image: require("../assets/j.jpg"),
      },
      {
        name: "Here I am to worship",
        artist: "Chris Tomlin",
        source: require("../assets/Here I Am To Worship .mp3"),

        favorited: false,

        image: require("../assets/save.jpg"),
      },
      {
        name: "I surrender",
        artist: "Hillsong",
        source: require("../assets/I Surrender .mp3"),

        favorited: true,

        image: require("../assets/cross.jpg"),
      },
      {
        name: "S-Class Riddim",
        artist: "Dj Superrific",
        source: require("../assets/sclass .mp3"),

        favorited: false,

        image: require("../assets/sclass.jpg"),
      },
      {
        name: "Speedometer Riddim",
        artist: "Dj Superrific",
        source: require("../assets/Speedometer Riddim .mp3"),

        favorited: false,

        image: require("../assets/speed.jpg"),
      },
      {
        name: "Money Box Riddim",
        artist: "Dj RetroActive",
        source: require("../assets/Money Box Riddim .mp3"),

        favorited: false,

        image: require("../assets/moneybox.jpeg"),
      },
      {
        name: "Yataniua",
        artist: "Mbosso feat Diamond Platnumz",
        source: require("../assets/mboso.mp3"),

        favorited: false,

        image: require("../assets/players.jpg"),
      },
      {
        name: "NitoNgoze",
        artist: "Raynanny feat Diamond Platnumz",
        source: require("../assets/rayvanny .mp3"),

        favorited: false,

        image: require("../assets/players.jpg"),
      },
    ],
  }),

  actions: {
    //format the time
    formatTime(time) {
      let minutes = Math.floor(time / 60);
      let seconds = Math.floor(time - minutes * 60);
      seconds = seconds < 10 ? "0" + seconds : seconds;
      minutes = minutes < 10 ? "0" + minutes : minutes;
      return minutes + ":" + seconds;
    },

    listenersWhenPlaying() {
      this.audio.addEventListener("timeupdate", () => {
        this.currentlyTimer = this.formatTime(this.audio.currentTime);
      });

      this.audio.addEventListener("ended", () => {
        this.playNext();
      });

      this.audio.addEventListener("pause", () => {
        this.isPlaying = false;
      });

      this.audio.addEventListener("play", () => {
        this.isPlaying = true;
      });
    },

    playMusic(song) {
      if (typeof song !== "undefined") {
        this.audio = new Audio(song.source);
        this.currentSong = song;
      }
      this.audio.play();
      this.isPlaying = true;
      this.listenersWhenPlaying();
      //volume = 30;

      this.audio.volume = this.volume / 100;
    },

    pauseMusic() {
      this.audio.pause();
      this.isPlaying = false;
    },

    playNext() {
      this.audio.pause();
      this.index++;
      if (this.index > this.music.length - 1) {
        this.index = 0;
        //stop the music
        this.isPlaying = false;
      }
      this.audio = new Audio(this.music[this.index].source);
      //make sure to update the currentSong
      this.currentSong = this.music[this.index];
      this.audio.play();
      this.isPlaying = true;
    },

    playPrevious() {
      this.audio.pause();
      this.index--;
      if (this.index < 0) {
        this.index = this.music.length - 1;
      }
      this.audio = new Audio(this.music[this.index].source);
      //make sure to update the currentSong
      this.currentSong = this.music[this.index];
      this.audio.play();
      this.isPlaying = true;
    },

    //change the currentsong favorited status to true
    favoriteSong() {
      this.currentSong.favorited = true;
    },
    //shaffle the music
    shuffleMusic() {
      this.music.sort(() => Math.random() - 0.5);
    },
    musicvolume() {
      this.audio.volume = this.volume / 100;
    },
    repeatCurentSong() {
      this.audio.loop = true;
    },
    repeatAllSongs() {
      this.audio.loop = true;
    },
  },
  getters: {
    //getthe time in minutes and seconds of the onplay song
    getCurrentlyTimer: (state) => state.currentlyTimer,

    //get the total time of the song in minutes and seconds format of the curremt playing song
    totalTime: (state) => {
      if (state.currentSong) {
        return state.formatTime(state.currentSong.duration);
      }
    },

    //get the total duration of of the current playing song in minutes and seconds format
    getDurationMinandSecs: (state) => {
      if (state.currentSong) {
        return state.formatTime(state.currentSong.duration / 1000);
      }
    },

    getMusic: (state) => state.music,

    //check if the current song is favorited
    isFavorited: (state) => {
      if (state.currentSong) {
        return state.currentSong.favorited;
      }
    },

    getCurrentSong: (state) => state.currentSong || state.music[0], // if currentSong is null, return the first song in the music array

    setSnakcbarTrue: (state) => {
      state.snackbar = true;
    },

    //if volume == 50% open the snackbar
    opentheSnackbarwhenVolumeis50() {
      if (this.volume == 50) {
        this.setSnakcbarTrue;
      }
    },

    //currenttime of the song
    getCurrentTime: (state) => {
      if (state.audio) {
        return state.audio.currentTime;
      }
    },

    //get current song duration
    getDuration: (state) => {
      if (state.currentSong) {
        return state.currentSong.duration;
      }
    },
  },
});
