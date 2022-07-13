<template>
  <div class="bgc">
    <div class="user login">
      <div class="head">
        <img :src="'http://liufusong.top:8080' + bodyMsg.avatar" alt="" />
      </div>
      <div class="usermsg">
        <p class="username">{{ bodyMsg.nickname }}</p>
        <van-button type="primary" @click="logout">退出</van-button>
        <p class="bianji">编辑个人资料<van-icon name="play" /></p>
      </div>
    </div>
    <div class="zujian">
      <van-grid :column-num="3" :border="false">
        <van-grid-item icon="star-o" text="我的收藏" />
        <van-grid-item icon="home-o" text="我的出租" />
        <van-grid-item icon="clock-o" text="看房记录" />
        <van-grid-item icon="credit-pay" text="成为房主" />
        <van-grid-item icon="contact" text="个人资料" />
        <van-grid-item icon="service-o" text="联系我们" />
      </van-grid>
      <div class="img">
        <img src="http://liufusong.top:8080/img/profile/join.png" alt="" />
      </div>
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
    async logout () {
      try {
        await this.$dialog.confirm({
          message: '确定退出吗'
        })
        this.$store.commit('setUser', '')
        console.log('退出成功')
      } catch (err) {
        console.log(err)
      }
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
  background: url("http://liufusong.top:8080/img/avatar.png");
  background-size: contain;
  background-repeat: no-repeat;
}
.login {
  position: relative;
  top: 165px;
  margin: 0 auto;
  width: 320px;
  height: 210px;
  background-color: #fff;
  box-shadow: 5px 5px 5px rgb(223, 222, 222);
}
.head {
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 70px;
  height: 70px;
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
  top: 39%;
  transform: translate(-50%, -50%);
  font-size: 13px;
  color: black;
  .van-button {
    background-color: #21b97a;
    border-radius: 10px;
    margin-top: 8px;
    font-size: 12px;
    font-weight: 700;
    width: 54px;
    height: 21px;
    .van-button__text {
      font-size: 12px;
      zoom: 0.91;
    }
  }
}
.van-grid {
  position: absolute;
  top: 50%;
  width: 100%;
}
// 最底下图片
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

.zujian {
  transform: translateY(175px);
}

.bianji {
  color: #999;
  transform: translateY(20px);
}
</style>
