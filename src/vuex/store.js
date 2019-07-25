import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as mutations from './mutations'
import * as getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoading: false, // 是否展示loading动画

    userInfo: { // 用户信息
      userName: ''
    }
  },
  getters,
  actions,
  mutations
})
