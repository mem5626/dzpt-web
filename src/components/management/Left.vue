<template>
<div id="navigation">
<el-row class="tac" style="height:600px;
    width:250px;
    background-color:#545c64">
  <el-col :span="12">
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      style="height:600px;
    width:250px;
    background-color:#545c64">
      <el-menu-item index="1" style="height:148px">
           <el-avatar style="width:100px;height:100px;margin-top:30px" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
      </el-menu-item>
      <el-menu-item index="2" @click="UserList()">
        <i class="el-icon-user-solid"></i>
        <span slot="title" style="font-size:20px">用户列表</span>
      </el-menu-item>
      <el-menu-item index="3" @click="BanList()">
        <i class="el-icon-document"></i>
        <span slot="title" style="font-size:20px">封禁用户列表</span>
      </el-menu-item>
      <el-menu-item index="4" @click="Message()">
        <i class="el-icon-thumb"></i>
        <span slot="title" style="font-size:20px">发布消息</span>
      </el-menu-item>

    </el-menu>
  </el-col>
</el-row>
</div>
</template>

<script>
export default {
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    UserList () {
      this.$router.push({
        path: '/Management/UserList',
        name: 'UserList',
        params: {
          username: this.$route.params.manager
        }
      })
    },
    BanList () {
      this.$router.push({
        path: '/Management/BanList',
        name: 'BanList',
        params: {
          username: this.$route.params.manager
        }
      })
    },
    Message () {
      this.$router.push({
        path: '/Management/SendMessage',
        name: 'SendMessage',
        params: {
          username: this.$route.params.manager
        }
      })
    }
  }
}
</script>

<style>
.navigation {
    padding: 0;
    height:500px;
    width:260px;
    background-color:"#545c64"
}
.el-menu-item {
    width:250px;
}
</style>
