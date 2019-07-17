import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import HelloWorld from '@/components/HelloWorld'
const Hang = resolve => require(['@/components/Hang'], resolve);
const Sell = resolve => require(['@/components/Sell'], resolve);
const SignUp = resolve => require(['@/components/SignUp'], resolve);
const Login = resolve => require(['@/components/Login'], resolve);
const Mine = resolve => require(['@/components/Mine'], resolve);

Vue.use(Router)

export default new Router({
  routes: [
    //首页
    {
      path: '/',
      name: 'Home',
      component: Home
    },
     //登录
     {
      path: '/Login',
      name: 'Login',
      component: Login
    },
    //注册
    {
      path: '/SignUp',
      name: 'SignUp',
      component: SignUp
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
    {
      path: '/Mine', // 个人中心
      name: 'Mine',
      component: Mine,
    },
  ]
})
