<template>
<div id="navigation">
<el-row class="tac" style="height:600px;
    width:250px;
    background-color:#545c64">
  <el-col :span="12">
    <el-menu
      default-active="$route.path"
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
           <el-avatar style="width:100px;height:100px;margin-top:30px" src="static/img/Mike.png"></el-avatar>
      </el-menu-item>
      <el-menu-item index="/Mine/Personal" @click="Personal()">
        <i class="el-icon-user-solid"></i>
        <span v-if=" this.$route.params.red==='PER'" slot="title" style="font-size:20px;color:#ffd04b">个人信息</span>
        <span v-else slot="title" style="font-size:20px">个人信息</span>
      </el-menu-item>
      <el-menu-item index="3" @click="MyTrading()">
        <i class="el-icon-document"></i>
        <span v-if=" this.$route.params.red==='MT'" slot="title" style="font-size:20px;color:#ffd04b">我的交易</span>
        <span v-else slot="title" style="font-size:20px">我的交易</span>
      </el-menu-item>
      <el-menu-item index="5" @click="MyWallet()">
        <i class="el-icon-postcard"></i>
        <span v-if=" this.$route.params.red==='MW'" slot="title" style="font-size:20px;color:#ffd04b">我的钱包</span>
        <span v-else slot="title" style="font-size:20px">我的钱包</span>
      </el-menu-item>
      <el-menu-item index="/Mine/MyCar" @click="MyCar()">
        <i class="el-icon-shopping-cart-2"></i>
         <span v-if=" this.$route.params.red==='MC'" slot="title" style="font-size:20px;color:#ffd04b">我的进货单</span>
        <span v-else slot="title" style="font-size:20px">我的进货单</span>
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
    Personal () {
      this.$router.push({
        path: '/Mine/Personal',
        name: 'Personal',
        params: {
          // username: this.$route.params.username
          red: 'PER'
        }
      })
    },
    MyTrading () {
      this.$router.push({
        path: '/Mine/MyTrading',
        name: 'MyTrading',
        params: {
          // username: this.$route.params.username
          red: 'MT'
        }
      })
    },
    MyWallet () {
      this.$router.push({
        path: '/Mine/MyWallet',
        name: 'MyWallet',
        params: {
          // username: this.$route.params.username
          red: 'MW'
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
  }
}
</script>

<style>
.navigation {
    padding: 0;
    height:500px;
    width:260px;
    background-color: #545c64
}
.el-menu-item {
    width:250px;
}
/* .el-row {
    height:600px;
    width:250px;
    background-color:"#545c64"
}
.el-menu {
    height:600px;
    width:250px;
    background-color:"#545c64"
} */

</style>
