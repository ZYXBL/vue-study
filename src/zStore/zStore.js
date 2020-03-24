let Vue;

class Store {
  constructor (options) {
    this._vm = new Vue({
      data: {
        $$state: options.state
      }
    })

    this._mutations = options.mutations;

    this._actions = options.actions;

    // this.commit = this.commit.bind(this);
    // this.dispatch = this.dispatch.bind(this);

    const Store = this;
    const { commit, dispatch } = Store;
    this.commit = function (type, payload) {
      commit.call(Store, type, payload);
    }

    this.dispatch = function (type, payload) {
      dispatch.call(Store, type, payload);
    }
  }

  set state (state) {
    console.error('禁止私修改state')
  }

  get state () {
    return this._vm._data.$$state
  }

  commit (type, payload) {
    const enrty = this._mutations[type];
    if (!enrty) {
      console.error('unkown mutation type:' + type);
      return;
    }

    enrty(this.state, payload);
  }

  dispatch (type, payload) {
    const entry = this._actions[type];
    if (!entry) {
      console.error('unkown action type:' + type);
      return;
    }

    entry(this, payload);
  }
}

export default {
  Store,
  install: function (_Vue) {
    Vue = _Vue;

    Vue.mixin({
      beforeCreate() {
        if (this.$options.store) {
          Vue.prototype.$store = this.$options.store;
        }
      }
    })
  }
}