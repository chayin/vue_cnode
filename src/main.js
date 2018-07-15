// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import VueLazyload from 'vue-lazyload'
import { AjaxPlugin, LoadingPlugin, ToastPlugin, Tabbar, TabbarItem, XInput, XTextarea, Selector, Group, XButton, Flexbox, FlexboxItem, Tab, TabItem, Scroller, Spinner, Popup } from 'vux'
import * as filters from './filters'

Vue.config.productionTip = false

const FastClick = require('fastclick')
FastClick.attach(document.body)

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.use(AjaxPlugin)
Vue.use(LoadingPlugin)
Vue.use(ToastPlugin)
Vue.component('Tab', Tab)
Vue.component('TabItem', TabItem)
Vue.component('Tabbar', Tabbar)
Vue.component('TabbarItem', TabbarItem)
Vue.component('Flexbox', Flexbox)
Vue.component('FlexboxItem', FlexboxItem)
Vue.component('XInput', XInput)
Vue.component('XTextarea', XTextarea)
Vue.component('Selector', Selector)
Vue.component('Group', Group)
Vue.component('XButton', XButton)
Vue.component('Scroller', Scroller)
Vue.component('Spinner', Spinner)
Vue.component('Popup', Popup)

// 检查localStorage
let accessToken = localStorage.getItem('accessToken')
if (!accessToken || accessToken === 'null') {
  store.commit('SET_ACCESSTOKEN', null)
} else {
  Vue.$axios.post('/accesstoken', {
    accesstoken: accessToken
  })
    .then(result => {
      console.log(result)
      store.commit('SET_LOGININFO', {
        avatarUrl: result.data.avatar_url,
        id: result.data.id,
        loginname: result.data.loginname,
        accessToken: accessToken
      })
    })
    .catch(e => {
      console.log(e)
      localStorage.setItem('accessToken', null)
      Vue.$vux.toast.show({
        text: 'AccessToken错误'
      })
    })
}

// 是否二次加载？
let isAgainLoading = localStorage.getItem('isAgainLoading')
if (!isAgainLoading) {
  store.commit('SET_ISAGAINLOADING', false)
  localStorage.setItem('isAgainLoading', true)
} else {
  store.commit('SET_ISAGAINLOADING', true)
}

// 前进后退
const history = window.sessionStorage
history.clear()
let historyCount = history.getItem('count') * 1 || 0
history.setItem('/', 0)
router.beforeEach((to, from, next) => {
  const toIndex = history.getItem(to.path)
  const fromIndex = history.getItem(from.path)
  if (toIndex) {
    if (toIndex > fromIndex || !fromIndex || (toIndex === '0' && fromIndex === '0')) {
      store.commit('SET_DIRECTION', 'forward')
    } else {
      store.commit('SET_DIRECTION', 'reverse')
    }
  } else {
    ++historyCount
    history.setItem('count', historyCount)
    to.path !== '/' && history.setItem(to.path, historyCount)
    store.commit('SET_DIRECTION', 'forward')
  }
  // 判断当前路由标签是否需要登录后权限
  if (to.meta.auth) {
    let accessToken = localStorage.getItem('accessToken')
    if (accessToken === 'null' || accessToken === null) {
      next({
        name: 'login'
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

Vue.use(VueLazyload, {
  preLoad: 1.3,
  // error: 'static/images/404.png',
  loading: 'static/images/loading-spin.svg',
  attempt: 1
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
