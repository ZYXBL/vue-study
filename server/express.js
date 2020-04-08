// 传统web，网页内容在服务器端渲染完成，一次性传输到浏览器。
// 属于服务端渲染，这里使用express演示传统页面渲染
const express = require('express');
const app = express();

// 导入vue
const Vue = require('vue');

// 渲染器导入
const { createRenderer } = require('vue-server-renderer');

// 创建一个渲染器
const renderer = createRenderer();

app.get('/', async function(req, res) {
  // res.send('hello world')

  // 创建一个Vue实例
  const vm = new Vue({
    data: {
      name: 'vue ssr渲染',
    },
    template: '<div>{{name}}</div>'
  });
  try {
    const html = await renderer.renderToString(vm);
    // 将渲染html字符串返回给客户端
    res.send(html);
  } catch (error) {
    // 将错误信息返回给用户
    res.status(500).send('服务器渲染错误，请重试！');
  }
});

app.listen(4000);

