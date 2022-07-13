import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: '',
    cityname: ''
  },
  getters: {
  },
  mutations: {
    setUser (state, payload) {
      state.token = payload
    },
    // 设置点击城市列表后 找房区域的标题的城市名字
    setCityName (state, payload) {
      state.cityname = payload
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [vuexLocal.plugin]
})
