import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/views/Layout'
const Home = () => import('@/views/Home/index.vue')
const Search = () => import('@/views/Search/index.vue')
const News = () => import('@/views/News/index.vue')
const My = () => import('@/views/My/index.vue')
const Login = () => import('@/views/Login/index.vue')
const City = () => import('@/views/CityList/index.vue')
Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    redirect: '/home',
    component: Layout,
    children: [
      { path: 'home', component: Home },
      { path: 'search', component: Search },
      { path: 'news', component: News },
      { path: 'my', component: My }
    ]
  },
  { path: '/login', component: Login },
  { path: '/city', component: City }
]
const router = new VueRouter({
  routes
})
export default router
