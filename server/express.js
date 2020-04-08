// 传统web，网页内容在服务器端渲染完成，一次性传输到浏览器。
// 属于服务端渲染，这里使用express演示传统页面渲染
const express = require('express');
const app = express();

// 导入vue
const Vue = require('vue');
// 导入vue-router
const Router = require('vue-router');
// 使用router实例
Vue.use(Router);

// 渲染器导入
const { createRenderer } = require('vue-server-renderer');

// 创建一个渲染器
const renderer = createRenderer();

app.get('*', async function(req, res) {
  // res.send('hello world')
  
  // 创建一个router实例
  const router = new Router({
    mode: 'history',
    routes: [
      {path: '/', component: { template: '<div>index page</div>' }},
      {path: '/detail', component: { template: '<div>detail page</div>' }}
    ]
  });

  // 创建一个Vue实例
  const vm = new Vue({
    data: {
      name: 'vue ssr渲染',
    },
    template: `
      <div>
        <div @click="onClick">{{name}}</div>
        <router-link to="/">index</router-link>
        <router-link to="/detail">detail</router-link>
        <router-view></router-view>
      </div>
    `,
    router,
    methods: {
      OnClick() {
        console.log('hello')
      }
    }
  });
  try {
    // 跳转至url对应路由页面
    // 首屏渲染
    router.push(req.url);
    const html = await renderer.renderToString(vm);
    // 将渲染html字符串返回给客户端
    res.send(html);
  } catch (error) {
    // 将错误信息返回给用户
    res.status(500).send('服务器渲染错误，请重试！');
  }
});

app.listen(4000);

