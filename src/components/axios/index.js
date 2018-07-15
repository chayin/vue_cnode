import axios from 'axios'

let options = {}
options.baseURL = `https://cnodejs.org/api/v1`

// let $axios = ''

export default {
  install (vue) {
    if (!vue.$axios) {
      vue.$axios = axios.create(options)
    }
    vue.mixin({ // 全局混入
      created: function () {
        this.$axios = vue.$axios
      }
    })
  }
}
