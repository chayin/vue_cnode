import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({

  // 初始化状态
  state: {
    loading: false,
    isShowTabbar: true,
    loginInfo: {
      avatarUrl: null, // 头像链接
      id: null,
      loginname: '',
      accessToken: ''
    },
    direction: 'forward',
    isAgainLoading: false
  },

  // Action 提交的是 mutation，而不是直接变更状态。
  // fetch: 取得；获取提交登录状态
  actions: {
    FETCH_LOADING: ({commit, state}) => {
      return state.loading
    }
  },

  // 变更状态
  mutations: {
    SET_LOADING: (state, bool) => {
      state.loading = bool
    },
    SET_SHOWTABBAR: (state, bool) => {
      state.isShowTabbar = bool
    },
    SET_ACCESSTOKEN: (state, str) => {
      state.loginInfo.accessToken = str
    },
    SET_LOGININFO: (state, object) => {
      state.loginInfo = object
    },
    SET_DIRECTION: (state, str) => {
      state.direction = str
    },
    SET_ISAGAINLOADING: (state, bool) => {
      state.isAgainLoading = bool
    }
  },

  // 计数
  getters: {
    loading (state, getters) {
      return state.loading
    },
    isShowTabbar (state, getters) {
      return state.isShowTabbar
    },
    accessToken (state, getters) {
      return state.loginInfo.accessToken
    },
    loginInfo (state, getters) {
      return state.loginInfo.accessToken
    },
    direction (state, getters) {
      return state.direction
    },
    isAgainLoading (state, getters) {
      return state.isAgainLoading
    }
  }

})

export default store
