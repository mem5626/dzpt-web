<template>
  <div class="box">
    <div class="nav">
      <ul class="location">
        <li>大宗商品交易平台</li>
      </ul>
      <ul class="details">
        <li class="first" v-show="!userInfo.userName">
          欢迎您！  <router-link to="/Login"><i class="el-icon-user"></i> 登录</router-link>  <span class="text-color-red"><router-link to="/SignUp">免费注册 </router-link></span>
        </li>
        <li v-show="!!userInfo.userName&&userInfo.userName!=='root'" @click="Mine()" >
          欢迎您！ <router-link to=""> <i class="el-icon-s-custom"></i> {{userInfo.userName}}</router-link>
        </li>
        <li v-show="userInfo.userName==='root'">
          欢迎您！ <i class="el-icon-s-custom"></i> 超级管理员 {{userInfo.userName}}
        </li>
        <li v-show="userInfo.userName!=='root'" ><router-link to="/"> 网站导航</router-link></li>
        <li v-show="!!userInfo.userName&&userInfo.userName!=='root'" @click="MyCar"><router-link to=""><i class="el-icon-shopping-cart-2"></i> 进货单</router-link></li>
        <li v-show="!!userInfo.userName&&userInfo.userName!=='root'&&messageInfo.count!==0" ><router-link to="/Message/System"><i class="el-icon-s-comment"></i> 消息 <el-badge class="mark" :value=this.messageInfo.count /></router-link></li>
        <li v-show="!!userInfo.userName&&userInfo.userName!=='root'&&messageInfo.count===0" ><router-link to="/Message/System"><i class="el-icon-s-comment"></i> 消息 </router-link></li>
        <li v-show="!!userInfo.userName" @click="signOutFun">
          <router-link to=""> <i class="el-icon-caret-right"></i> 退出登录</router-link>
        </li>
        </ul>
    </div>
  </div>
</template>

<script>
import store from '@/vuex/store'
import { mapMutations, mapState, mapActions } from 'vuex'
export default {
  created () {
    this.isLogin()
    this.isMessage()
  },
  data () {
    return {
      count: 0,
      params: {
        userId: ''
      },
      dot: false,
      COUNT: {
        count: '123132'
      },
      tableData: {}
    }
  },
  computed: {
    ...mapState(['userInfo']),
    ...mapState(['messageInfo'])
  },
  methods: {
    ...mapMutations(['SET_MESSAGE_INFO']),
    ...mapState(['messageInfo', 'userInfo']),
    ...mapActions(['setMsg', 'isMessage', 'isLogin', 'signOut', 'goodOut']),
    signOutFun () {
      this.$alert('是否确认注销登录?', '执行结果', {
        confirmButtonText: '确定',
        callback: action => {
          this.signOut()
          this.goodOut()
          this.$router.push('/')
        }
      })
      // this.$router.push({
      //   path: '/Order',
      //   name: 'Order',
      //   params: {
      //     activeName: 'first'
      //   }

      // })
    },
    Mine () {
      this.$router.push({
        path: '/Mine/Personal',
        name: 'Personal',
        params: {
          // username: this.$route.params.username
          red: 'PER'
        }
      })
    },
    MyCar () {
      this.$router.push({
        path: '/Mine/MyCar',
        name: 'MyCar',
        params: {
          // username: this.$route.params.username
          red: 'MC'
        }
      })
    }
  },
  store
}
</script>

<style scoped>
.box {
  width: 100%;
  height: 50px;
  background-color: #4488a7;
}
.nav {
  margin: 0% auto;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.nav ul {
  list-style: none;
}
.nav li {
  float: left;
  font-size: 14px;
  line-height: 35px;
  margin-right: 15px;
  font-weight: bold;
}
.nav a {
  text-decoration: none;
  color: #F8F8FF;
  padding-left: 15px;
  border-left: 1px solid #ccc;
  cursor: pointer;
}
.location a {
  border-left: none;
}
.username-p {
  cursor: pointer;
}
.location li {
  font-size:35px;
}
.nav a:hover {
  color: #d9534f;
}
.location {
  margin-top: 6px;
  margin-left: 20px;
  color: #F8F8FF;
}
.details {
    margin-top: 9px;
}
.details li{
    color: #F8F8FF;
}

</style>
