import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import HelloWorld from '@/components/HelloWorld'
//test

const Bill = resolve => require(['@/components/Bill'], resolve);
const Pay = resolve => require(['@/components/Pay'], resolve);
const Hang = resolve => require(['@/components/Hang'], resolve);
const Sell = resolve => require(['@/components/Sell'], resolve);
const SignUp = resolve => require(['@/components/SignUp'], resolve);
const Login = resolve => require(['@/components/Login'], resolve);
const Mine = resolve => require(['@/components/Mine'], resolve);
const Personal = resolve => require(['@/components/mine/Personal'], resolve);
const MyAccount = resolve => require(['@/components/mine/MyAccount'], resolve);
const MyTrading = resolve => require(['@/components/mine/MyTrading'], resolve);
const MyWallet = resolve => require(['@/components/mine/MyWallet'], resolve);
const MyCar = resolve => require(['@/components/mine/MyCar'], resolve);
const Rechange = resolve => require(['@/components/mine/Rechange'], resolve);
const Withdraw = resolve => require(['@/components/mine/Withdraw'], resolve);
const Management = resolve => require(['@/components/Management'], resolve);
const UserList = resolve => require(['@/components/management/UserList'], resolve);
const BanList = resolve => require(['@/components/management/BanList'], resolve);
const Product = resolve => require(['@/components/Product'], resolve);
const Order = resolve => require(['@/components/Order'], resolve);
const Message = resolve => require(['@/components/Message'], resolve);

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
    //商品详情
    {
      path: '/Product',
      name: 'Product',
      component: Product
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
    // 个人中心
    {
      path: '/Mine',
      name: 'Mine',
      component: Mine,
      children: [
        {
          path: 'Personal',
          name: 'Personal',
          component: Personal
        },
        {
          path: 'MyAccount',
          name: 'MyAccount',
          component: MyAccount
        },
        {
          path: 'MyTrading',
          name: 'MyTrading',
          component: MyTrading
        },
        {
          path: 'MyWallet',
          name: 'MyWallet',
          component: MyWallet
        },
        {
          path: 'MyCar',
          name: 'MyCar',
          component: MyCar
        },
        {
          path: 'Rechange',
          name: 'Rechange',
          component: Rechange
        },
        {
          path: 'Withdraw',
          name: 'Withdraw',
          component: Withdraw
        }
      ]
    },
    // 消息管理
    {
      path: '/Message',
      name: 'Message',
      component: Message,
      children: [
        {
          path: 'Personal',
          name: 'Personal',
          component: Personal
        },
        {
          path: 'MyAccount',
          name: 'MyAccount',
          component: MyAccount
        }
      ]
    },
     //超级管理员后台管理
    {
      path: '/Management',
      name: 'Management',
      component: Management,
      children: [
        {
          path: 'UserList',
          name: 'UserList',
          component: UserList
        },
        {
          path: 'BanList',
          name: 'BanList',
          component: BanList
        },
      ]
    },
    //订单合同交收单
    {
      path: '/Order',
      name: 'Order',
      component: Order,
      children: [
        {
          path: 'UserList',
          name: 'UserList',
          component: UserList
        },
        {
          path: 'BanList',
          name: 'BanList',
          component: BanList
        },
      ]
    },
  ]
})
