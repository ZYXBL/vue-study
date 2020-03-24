import Link from './zRouterLink'
import View from './zRouterView'

let Vue;

class zVueRouter {
  constructor (options) {
    // 保存配置
    this.$options = options;

    // 使current变成响应式数据
    Vue.util.defineReactive(this, 'current', '/');
  
    window.addEventListener('hashchange', this.handleHash.bind(this));
    window.addEventListener('load', this.handleHash.bind(this));
    
    // 将路由表添加到当前
    this.routeMap = {}
    this.$options.routes.map(item => {
      this.routeMap[item.path] = item.component;
    });
  }

  handleHash () {
    this.current = window.location.hash.slice(1)
  }
}

zVueRouter.install = function(_Vue) {
  // 保存构造函数实例
  Vue = _Vue;

  // 绑定router到vue实例上
  // 挂载$router
  // 怎么获取router选项
  // 利用全局混入，在beforeCreate钩子函数内获取router选项
  Vue.mixin({
    beforeCreate() {
      if (this.$options.router) {
        Vue.prototype.$router = this.$options.router;
      }
    }
  });

  Vue.component('router-link', Link);
  Vue.component('router-view', View);
}

export default zVueRouter;
