<template>
<div class="create-box" :style="{minHeight: minHeight + 'px'}">
    <group title="新话题">
      <x-button type="primary" mini slot="button" style="position: absolute;right: 14px;font-size: 12px" @click.native="onSendArtice">发布</x-button>
      <!-- 自定义组件的 v-model -->
      <selector title="分类" :options="typeList" v-model="selectType"></selector>
      <x-input placeholder="标题，字数10字以上" v-model="title"></x-input>
      <x-textarea :height="minHeight - 42 - 44 - 22 - 40" v-model="content" name="description" placeholder="说点什么吧..."></x-textarea>
    </group>
</div>
</template>

<script type="text/javascript">
export default {
  data () {
    return {
      title: '',
      content: '',
      selectType: '',
      typeList: [
        {key: 'share', value: '分享'},
        {key: 'ask', value: '问答'},
        {key: 'job', value: '招聘'}
      ]
    }
  },
  activated () {
    this.$store.commit('SET_SHOWTABBAR', true)
    this.$store.commit('SET_ISAGAINLOADING', true)
    localStorage.setItem('isAgainLoading', true)
  },
  computed: {
    minHeight: () => {
      return (document.body.clientHeight >= 400 && document.body.clientHeight <= 736) ? document.body.clientHeight : window.screen.height
    }
  },
  methods: {
    checkLogin () {
      let accessToken = this.$store.getters.accessToken
      if (!accessToken) {
        this.$vux.toast.show({
          text: '请先登录'
        })
        this.$router.push('/login')
        return false
      } else {
        return true
      }
    },
    onSendArtice () {
      if (this.checkLogin()) {
        if (!this.title) {
          this.$vux.toast.show({
            text: '请填写标题'
          })
          return false
        }
        if (!this.content) {
          this.$vux.toast.show({
            text: '请填写内容'
          })
          return false
        }
        this.$vux.loading.show()
        this.$axios.post('/topics', {
          accessToken: this.$store.getters.accessToken,
          title: this.title,
          content: this.content,
          tab: this.selectType
        })
          .then(result => {
            this.$vux.toast.show({
              text: '发送成功'
            })
            this.$vux.loading.hide() // ?难道是加载中的图标？？？..emmm果然是，vux里面的
            this.$router.push({
              name: 'detail',
              query: {
                id: result.data.topic_id // 这个格式应该是cnode服务器返回的 API
              }
            })
          })
          .catch(e => {
            console.log(e)
            this.$vux.toast.show({
              text: '发布失败'
            })
            this.$vux.loading.hide()
          })
      }
    }
  }
}
</script>
<!-- 文章发布界面的样式在哪啊 -->
