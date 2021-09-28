import Vue from 'vue';
import Vuex from 'vuex';
import index from './modules'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},
	modules:{
		...index
	}
})

export default store