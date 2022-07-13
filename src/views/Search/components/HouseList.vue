<template>
  <div>
    <div class="main" v-for="(item, index) in houseList" :key="index">
      <van-image
        width="100"
        height="100"
        :src="'http://liufusong.top:8080' + item.houseImg"
      />
      <div class="left">
        <h2>{{ item.title }}</h2>
        <p>{{ item.desc }}</p>
        <van-tag
          type="primary"
          v-for="(item1, index1) in item.tags"
          :key="index1"
          >{{ item1 }}</van-tag
        >
        <h3>
          <span>{{ item.price }}</span
          >元/月
        </h3>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'houselist',
  props: {
    houseList: {
      type: Array,
      required: true
    }
  },
  created () { },
  data () {
    return {}
  },
  methods: {},
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.main {
  padding: 15px 15px;
  border-bottom: 1px solid #ccc;
  display: flex;
  .left {
    padding: 10px 10px;
    // padding-left: 10px;
    h2 {
      font-size: 16px;
    }
    p {
      font-size: 12px;
    }
    h3 {
      color: #e8634c;
    }
  }
}
</style>
