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
      <van-dropdown-item title="区域">
        <template #default>
          <van-picker
            show-toolbar
            title="标题"
            :columns="columns"
            :value="fistValue"
            value-key="label"
            @confirm="fn"
          >
            <template #confirm
              ><van-button plain class="btn-queding" type="primary"
                >确定</van-button
              ></template
            >
          </van-picker>
          <van-button plain class="btn-quixao" type="primary">取消</van-button>
        </template>
      </van-dropdown-item>
      <!-- --------- -->
      <van-dropdown-item title="方式"
        ><van-picker title="标题" show-toolbar :columns="fangshi" />
        <van-button plain class="btn-quixao" type="primary">取消</van-button>
        <van-button plain class="btn-queding" type="primary"
          >确定</van-button
        ></van-dropdown-item
      >
      <van-dropdown-item title="租金"></van-dropdown-item>
      <van-dropdown-item title="筛选"></van-dropdown-item>
    </van-dropdown-menu>
  </div>
</template>

<script>
// import SearchNav from './components/SearchNav.vue'
import { areaSearch } from '@/api/search'
export default {
  created () { this.areaSearch() },
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
      fangshi: ['不限', '整租', '合租']
    }
  },
  methods: {
    async areaSearch () {
      try {
        console.log('开始')
        const res = await areaSearch(this.$store.state.cityname.value)
        console.log(res)
        // 区域第一层数据
        await this.columns[0].children.push(...res.data.body.area.children)
        await this.columns[1].children.push(...res.data.body.subway.children)
        // 第二层数据
        this.columns[0].children.forEach((item) => { if (!item.children) { item.children = [] } })
        this.columns[1].children.forEach((item) => { if (!item.children) { item.children = [] } })
        console.log(123)
      } catch (err) {
        console.log(err)
      }
    },
    fn (value, index) {
      console.log(value)
    }
  },
  computed: {
  },
  watch: {
  },
  filters: {},
  components: {}
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
/deep/.van-picker__toolbar {
  display: none;
}
.quxiao {
  height: 50px;
  width: 25%;
  background-color: #fff;
  border: 1px solid #ccc;
  color: #21b97a;
  font-size: 18px;
}
.queding {
  height: 50px;
  width: 75%;
  font-size: 18px;
}
.btn-quixao {
  width: 25%;
  border: none;
  border-top: 1px solid #ccc;
}
.btn-queding {
  width: 75%;
  font-size: 18px;
  background-color: #21b97a;
  color: #fff;
}
.van-picker {
  padding-bottom: 15px;
}
</style>
