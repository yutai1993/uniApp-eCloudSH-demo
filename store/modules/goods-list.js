import { getGoodsList } from "../../api/api_module/goods-list";

export default {
    namespaced: true,
    state: () => ({
        goodsList: {}
    }),

    mutations: {
        GOODSLIST(state, data){
            state.goodsList = data
        },
        PUSHGOODSLIST(state, data){
            if(!data.goods.length) return;
            state.goodsList.goods.push(...data.goods)
            state.goodsList.total = data.total
            state.goodsList.pagenum = data.pagenum
         
        },
    },

    actions: {
       async fetchGoodsList({commit}, payload){
            const result = await getGoodsList(payload)
            if(result.meta.status === 200) {
                commit('GOODSLIST', result.message)
            }
        },

        async pushGoodsList({commit}, payload){
            const result = await getGoodsList(payload)
            console.log(result.message)
            if(result.meta.status === 200) {
               commit('PUSHGOODSLIST', result.message)
            }
        }
    },

    getters: {}
}