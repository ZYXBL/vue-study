// 客户端激活
import { createApp } from './main'

// 创建Vue实例
const { app, router } = createApp();

// 路由就绪事件，执行挂载
router.onReady(() => {
  app.$mount('#app');
});
