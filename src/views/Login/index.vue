<template>
  <div>
    <van-nav-bar title="账号登陆" left-arrow @click-left="$router.back()" />
    <van-form @submit="onSubmit">
      <van-field
        v-model.trim="username"
        name="username"
        placeholder="请输入账号"
      />
      <van-field
        v-model="password"
        type="password"
        name="password"
        placeholder="请输入密码"
      />
      <div style="margin: 16px">
        <van-button type="submit" block>登 陆</van-button>
      </div>
    </van-form>
    <p @click="toRegiste" class="registe">还没有账号，去注册~</p>
  </div>
</template>

<script>
import { onlogin } from '@/api/my'
export default {
  created () { },
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    async onSubmit (values) {
      if (this.username === '' || this.password === '') {
        return this.$toast('用户名和密码不能为空')
      }
      console.log(values)
      try {
        const res = await onlogin(values)
        // console.log(res)

        if (res.data.status === 200) {
          this.$store.commit('setUser', res.data.body.token)
          this.$router.push('/my')
          return this.$toast('登录成功')
        }
        this.$toast('请输入正确的账号密码')
      } catch (err) {
        this.$toast('登录失败')

        console.log(err)
      }
    },
    toRegiste () {
      this.$router.push('/registe')
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.van-nav-bar {
  background-color: #21b97a;
  margin-bottom: 25px;
}
.van-button {
  background-color: #1cb676;
  border: 1px solid #1cb676;
  color: #fff;
  font-size: 16px;
  font-weight: 700;
}
.van-field {
  font-size: 16px;
}
.registe {
  position: relative;
  top: 10px;
  text-align: center;
  font-size: 14px;
  color: black;
}
</style>
