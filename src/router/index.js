import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Home from '@/components/Home'
import Sell from '@/components/Sell'
import Hang from '@/components/Hang'

Vue.use(Router)

export default new Router({
  routes: [
    //首页
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    //商品采购
    {
      path: '/Sell',
      name: 'Sell',
      component: Sell
    },
    //我要挂牌
    {
      path: '/Hang',
      name: 'Hang',
      component: Hang
    }
  ]
})
