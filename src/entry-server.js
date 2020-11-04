// 服务端入口：
// 1.导航至首页

import { createApp } from './main'

export default context => {

  return new Promise((resolve, reject) => {

    const { app, router } = createApp(context);
  
    // 导航到首屏
    router.push(context.url);

    // 导航过程可能是异步的
    router.onReady(() => {
      // 就绪后可能有异步数据请求
      resolve(app);
    }, reject);
  });
}