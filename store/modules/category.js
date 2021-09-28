import { getCategory } from "../../api/api_module/category";

export default {
  namespaced: true,
  state: () => ({
    category: [],
  }),

  mutations: {
    CATEGORY(state, data) {
      state.category = data;
    }
  },
  actions: {
    async fetchCategory({ commit }, payload) {
      const result = await getCategory();
      if (result.meta.status === 200) {
        commit("CATEGORY", result.message);
      }
    },
  },

  getters: {},
};
