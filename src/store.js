import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    length: 20,
    index: 0,
    songs: [],
    loadingShow: true
  },
  mutations: {
    setLength(state, length) {
      state.length = length;
    },

    setSongs(state, data) {
      state.songs = data;
    },

    setIndex(state, i) {
      state.index = i;
    },

    setLoadingShow(state, flag) {
      state.loadingShow = flag;
    }
  },
  actions: {}
});
