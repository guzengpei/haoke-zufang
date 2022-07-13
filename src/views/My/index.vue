<template>
  <div>
    <Login v-if="token"></Login>
    <NotLogin v-else></NotLogin>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Login from '@/components/login.vue'
import NotLogin from '@/components/NotLogin.vue'
export default {
  created () { },
  data () {
    return {}
  },
  methods: {},
  computed: {
    ...mapState(['token'])
  },
  watch: {},
  filters: {},
  components: { Login, NotLogin }
}
</script>

<style scoped lang='less'>
</style>
