import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Home from '@/components/Home'
import Sell from '@/components/Sell'
import Hang from '@/components/Hang'
//test
import Bill from '@/components/Bill'
import Pay from '@/components/Pay'

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
    },
    //账单明细
    {
	  path: '/Bill',
	  name: 'Bill',
	  component: Bill
    },
    //支付页面
    {
    path: '/Pay',
    name: 'Pay',
    component: Pay
    },
  ]
})
