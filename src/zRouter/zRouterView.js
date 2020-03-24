export default {
  render (h) {
    // let component = null

    // 循环遍历获取当前路由component
    // const route = this.$router.$options.routes.find(item => item.path === this.$router.current);
    // if (route) {
    //   component = route.component
    // }

    // 获取当前routeMap内的route对象
    let component = this.$router.routeMap[this.$router.current];

    return h(component)
  }
}