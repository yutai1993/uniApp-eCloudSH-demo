import Vue from 'vue'
import store from 'store'
import App from './App'

import uView from "uview-ui";
Vue.use(uView);

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App,
	store
})

// 请求拦截器
import httpInterceptor from '@/api/http.interceptor.js'
// 这里需要写在最后，是为了等Vue创建对象完成，引入"app"对象(也即页面的"this"实例)
Vue.use(httpInterceptor, app)

// 导出this实例
export const _this = app

app.$mount()
