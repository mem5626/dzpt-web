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
          <el-upload
            action="https://jsonplaceholder.typicode.com/posts/"
            list-type="picture-card"
            style="margin-top:30px"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove">
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
      </el-menu-item>
      <el-menu-item index="2" @click="Personal()">
        <i class="el-icon-user-solid"></i>
        <span slot="title" style="font-size:20px">个人信息</span>
      </el-menu-item>
      <el-menu-item index="3" @click="MyTrading()">
        <i class="el-icon-document"></i>
        <span slot="title" style="font-size:20px">我的交易</span>
      </el-menu-item>
      <el-menu-item index="4" @click="MyAccount()">
        <i class="el-icon-bank-card"></i>
        <span slot="title" style="font-size:20px">我的账户</span>
      </el-menu-item>
      <el-menu-item index="5" @click="MyWallet()">
        <i class="el-icon-postcard"></i>
        <span slot="title" style="font-size:20px">我的钱包</span>
      </el-menu-item>
      
    </el-menu>
  </el-col>
</el-row>
</div>
</template>

<script>
  export default {
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      Personal(){
      this.$router.push({  
          path: '/Mine/Personal',   
          name: 'Personal',  
          params: {   
          username: this.$route.params.username,
          }
      })
      },
      MyTrading(){
      this.$router.push({  
          path: '/Mine/MyTrading',   
          name: 'MyTrading',  
          params: {   
          username: this.$route.params.username,
          }
      })
      },
      MyAccount(){
      this.$router.push({  
          path: '/Mine/MyAccount',   
          name: 'MyAccount',  
          params: {   
          username: this.$route.params.username,
          }
      })
      },
      MyWallet(){
      this.$router.push({  
          path: '/Mine/MyWallet',   
          name: 'MyWallet',  
          params: {   
          username: this.$route.params.username,
          }
      })
      },
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