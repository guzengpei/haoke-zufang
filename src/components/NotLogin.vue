<template>
  <div class="bgc">
    <div class="user notlogin">
      <div class="head">
        <img src="http://liufusong.top:8080/img/profile/avatar.png" alt="" />
      </div>
      <div class="usermsg">
        <p class="username">游客</p>
        <van-button type="primary" @click="$router.push('/login')"
          >去登陆</van-button
        >
      </div>
    </div>
    <van-grid :column-num="3" :border="false">
      <van-grid-item @click="error" icon="star-o" text="我的收藏" />
      <van-grid-item @click="error" icon="home-o" text="我的出租" />
      <van-grid-item @click="error" icon="clock-o" text="看房记录" />
      <van-grid-item @click="error" icon="credit-pay" text="成为房主" />
      <van-grid-item @click="error" icon="contact" text="个人资料" />
      <van-grid-item @click="error" icon="service-o" text="联系我们" />
    </van-grid>
    <div class="img">
      <img src="http://liufusong.top:8080/img/profile/join.png" alt="" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getUserMsg } from '@/api/my'
export default {
  name: 'My',
  created () {
    this.getUserMsg()
  },
  data () {
    return {
      bodyMsg: {}
    }
  },
  methods: {
    async getUserMsg () {
      try {
        // console.log(this.$store.state.token)
        const res = await getUserMsg(this.$store.state.token)
        this.bodyMsg = res.data.body
        console.log(this.bodyMsg)
        console.log(res)
      } catch (err) {
        console.log(err)
      }
    },
    error () {
      this.$toast.setDefaultOptions({ duration: 500 })
      this.$toast('请登录')
    }
  },
  computed: {
    ...mapState(['token'])
  },
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.bgc {
  position: relative;
  height: 617px;
  background: url("@/assets/bg.png");
  background-size: contain;
  background-repeat: no-repeat;
}
.user {
  position: relative;
  top: 140px;
  margin: 0 auto;
  width: 320px;
  height: 160px;
  background-color: #fff;
  box-shadow: 5px 5px 5px rgb(223, 222, 222);
}
.head {
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60px;
  height: 60px;
  background-color: #f5f5f5;
  border-radius: 100%;
  padding: 5px 5px;
  box-shadow: 2px 2px 2px rgb(223, 222, 222);
  img {
    width: 100%;
    height: 100%;
  }
}
.usermsg {
  text-align: center;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  font-size: 14px;
  color: black;
  .van-button {
    width: 69px;
    height: 30px;
    background-color: #21b97a;
    border-radius: 5px;
    font-size: 12px;
    font-weight: 700;
    margin-top: 20px;
  }
}
.van-grid {
  position: absolute;
  top: 50%;
  width: 100%;
}
.img {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, 220%);
  width: 345px;
  height: 85px;
  background-color: #ccc;
  img {
    width: 100%;
    height: 100%;
  }
}

.login {
  position: relative;
  top: 140px;
  margin: 0 auto;
  width: 320px;
  height: 160px;

  .van-button {
    width: 54px;
    height: 21px;
    .van-button__text {
      zoom: 0.91;
    }
  }
}
</style>
