import {
  getSwiperData,
  getNavigation,
  getFloor,
} from "@/api/api_module/home.js";

export default {
  namespaced: true,
  state: () => ({
    swiperData: [],
    navigation: [],
    floor: [],
  }),

  mutations: {
    SWIPERDATA(state, data) {
      state.swiperData = data;
    },

    NAVIGATION(state, data) {
      state.navigation = data;
    },

    FLOOR(state, data) {
      state.floor = data;
    },
  },

  actions: {
    /* 轮播图 */
    async fetchSwiperData({ commit }, payload) {
      const result = await getSwiperData();
      if (result.meta.status === 200) {
        commit("SWIPERDATA", result.message);
      }
    },

    /* 导航 */
    async fetchNavigation({ commit }, payload) {
      const result = await getNavigation();
      if (result.meta.status === 200) {
        commit("NAVIGATION", result.message);
      }
    },

    /* 楼层 */
    async fetchFloor({ commit }, payload) {
      const result = await getFloor();
      if (result.meta.status === 200) {
        commit("FLOOR", result.message);
      }
    },
  },

  getters: {},
};
