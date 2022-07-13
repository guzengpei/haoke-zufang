<template>
  <div>
    <!-- 标题 -->
    <van-nav-bar title="城市列表" left-arrow @click-left="$router.back()" />
    <div class="zhanwei"></div>
    <!-- 标题结束 -->
    <!-- 城市列表开始 -->
    <van-index-bar :index-list="objKeys" :sticky-offset-top="46">
      <div v-for="(item, index) in objKeys" :key="index">
        <van-index-anchor>{{ item.toUpperCase() }}</van-index-anchor>
        <van-cell
          v-for="(item1, index1) in obj[item]"
          :title="item1.label"
          :key="index1"
          @click="
            $store.commit('setCityName', item1);
            $router.push('/search');
          "
        />
      </div>
    </van-index-bar>
  </div>
</template>

<script>
import { getAllCity } from '@/api/city'

export default {
  created () {
    this.getAllCity()
  },
  data () {
    return {
      cityName: [],
      obj: {},
      objKeys: []
    }
  },
  methods: {
    async getAllCity () {
      try {
        const res = await getAllCity(1)
        // console.log(res)
        const arr = []
        // const obj = {}
        this.cityName = res.data.body
        res.data.body.forEach(item => arr.push(item.short))
        // console.log(arr)
        res.data.body.forEach((item) => {
          if (this.obj[item.short[0]]) {
            this.obj[item.short[0]].push(item)
          } else {
            this.obj[item.short[0]] = [item]
          }
        })
        console.log(this.obj)
        // this.$store.commit('setAllCity', this.obj)
        this.objKeys = Object.keys(this.obj).sort()
        // console.log(this.objKeys)
      } catch (err) {
        console.log(err)
      }
    },
    fn (title) {
      console.log(title)
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
/deep/.van-nav-bar__content {
  background-color: #21b97a;
}
.van-nav-bar {
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 9999;
}
.van-index-bar {
  padding-top: 46px;
}
</style>
