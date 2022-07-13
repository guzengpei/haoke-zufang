<template>
  <div>
    <!-- 头部搜索栏 -->
    <van-search
      v-model="value"
      show-action
      label="地址"
      placeholder="请输入小区或地址"
      background="#21b97a"
    >
      <template #label>
        <span @click="$router.push('/city')">{{
          $store.state.cityname.label
        }}</span
        ><van-icon name="arrow-down" /><span class="line">|</span>
      </template>
      <template #action>
        <van-icon name="map-marked" class="map" />
      </template>
      <template #left>
        <van-icon class="back" name="arrow-left" />
      </template>
    </van-search>
    <!-- 头部搜索栏结束 -->
    <!-- 搜索栏下面选择栏 -->
    <van-dropdown-menu>
      <van-dropdown-item title="区域"
        ><van-picker
          ref="area"
          show-toolbar
          toolbar-position="bottom"
          :columns="columns"
          value-key="label"
          @confirm="quyuFn"
          @cancel="quxiaoFn"
        />
      </van-dropdown-item>
      <!-- --------- -->
      <van-dropdown-item title="方式">
        <van-picker
          show-toolbar
          toolbar-position="bottom"
          :columns="columns1"
          value-key="label"
          @confirm="fangshiFn"
          @cancel="quxiaoFn"
        />
      </van-dropdown-item>
      <van-dropdown-item title="租金">
        <van-picker
          show-toolbar
          toolbar-position="bottom"
          :columns="columns2"
          value-key="label"
          @confirm="zujinFn"
          @cancel="quxiaoFn"
        />
      </van-dropdown-item>
      <van-dropdown-item title="筛选"></van-dropdown-item>
    </van-dropdown-menu>
    <!-- 选择栏结束 -->
    <!-- 房源列表 -->
    <HouseList :houseList="houseList"></HouseList>
  </div>
</template>

<script>
import HouseList from './components/HouseList.vue'
import { areaSearch, houseSearch } from '@/api/search'
export default {
  created () {
    this.areaSearch()
    this.getHouseList()
  },
  mounted () {

  },
  data () {
    return {
      // 滑动区域选项值
      fistValue: '朝阳',
      value: '',
      // 选择栏
      columns: [
        {
          label: '区域',
          children: [
          ]
        },
        {
          label: '地铁',
          children: [

          ]
        }
      ],
      // 方式栏
      columns1: [],
      columns2: [],
      // 获取到的房源列表
      houseList: [],
      price: '',
      rentType: '',
      area: ''
    }
  },
  methods: {
    async areaSearch () {
      try {
        // console.log('开始')
        const res = await areaSearch(this.$store.state.cityname.value)
        // console.log(res)
        // 区域第一层数据
        await this.columns[0].children.push(...res.data.body.area.children)
        await this.columns[1].children.push(...res.data.body.subway.children)
        // console.log(...res.data.body.rentType)
        res.data.body.rentType.forEach(item => this.columns1.push(item.label))
        res.data.body.price.forEach(item => this.columns2.push(item.label))

        // await this.columns1.push(res.data.body.rentType.forEach(item => item.label))
        // 第二层数据
        this.columns[0].children.forEach((item) => { if (!item.children) { item.children = [''] } })
        this.columns[1].children.forEach((item) => { if (!item.children) { item.children = [''] } })
        // console.log(this.columns)
      } catch (err) {
        console.log(err)
      }
    },
    quyuFn (value, index) {
      this.area = this.$refs.area.getValues()[2].value === 'null' ? this.$refs.area.getValues()[1].value === null ? '' : this.$refs.area.getValues()[1].value : this.$refs.area.getValues()[2].value
      // console.log(this.area)
      this.houseSearch()
      window.document.querySelector('.van-overlay').click()
    },
    fangshiFn (value, index) {
      this.rentType = value
      this.houseSearch()
      window.document.querySelector('.van-overlay').click()
    },
    zujinFn (value, index) {
      this.price = value
      this.houseSearch()
      window.document.querySelector('.van-overlay').click()
    },
    quxiaoFn () {
      window.document.querySelector('.van-overlay').click()
    },
    async getHouseList () {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        loadingType: 'spinner',
        duration: 0
      })
      try {
        const res = await houseSearch({ cityId: this.$store.state.cityname.value })
        console.log(res)
        this.houseList = res.data.body.list
        this.$toast.loading({
          message: '加载中...',
          forbidClick: true,
          loadingType: 'spinner',
          duration: 1
        })
      } catch (err) {
        console.log(err)
      }
    },
    async houseSearch () {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        loadingType: 'spinner',
        duration: 0
      })
      try {
        const res = await houseSearch({ rentType: this.rentType, price: this.price, area: this.area })
        console.log(res)
        this.houseList = res.data.body.list
        this.$toast.loading({
          message: '加载中...',
          forbidClick: true,
          loadingType: 'spinner',
          duration: 1
        })
      } catch (err) {
        console.log(err)
      }
    }
  },
  computed: {
  },
  watch: {
  },
  filters: {},
  components: { HouseList }
}
</script>

<style scoped lang='less'>
// 头部搜索栏
.line {
  margin-left: 5px;
  font-size: 18px;
  color: #e5e5e5;
}
.van-search {
  height: 50px;
  z-index: 9999;
  width: 100%;
}
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  background-color: #39a9ed;
}
.map {
  color: #fff;
  font-size: 25px;
}
.back {
  margin-right: 18px;
  font-size: 22px;
  color: #fff;
}
// 头部搜索栏结束
// /deep/.van-picker__toolbar {
//   display: none;
// }
/deep/.van-picker__confirm {
  width: 75%;
  background-color: #21b97a;
  color: #fff;
  font-size: 18px;
}
/deep/.van-picker__cancel {
  width: 25%;
  font-size: 18px;
  border-top: 1px solid #ccc;
}
</style>
