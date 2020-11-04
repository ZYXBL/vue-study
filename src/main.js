import Vue from 'vue'
import App from './App.vue'
// import router from './router'
import { createRouter } from './router'
// import store from './store'
// import store from './zStore'
// import router from './zRouter'

Vue.config.productionTip = false

// new Vue({
//   router,
//   store,
//   render: h => h(App)
// }).$mount('#app')

export function createApp(context) {
  // 1.创建路由实例
  const router = createRouter()

  // 2.创建实例
  const app = new Vue({
    router,
    context,
    render: h => h(App)
  });

  return { app, router }
}