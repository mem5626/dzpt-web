<template>
<div id="navigation">
<el-row class="tac" style="height:600px;
    width:250px;
    background-color:#01814A">
  <el-col :span="12">
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="	#003E3E"
      text-color="#fff"
      active-text-color="#FF5151"
      style="height:600px;
    width:250px;
    background-color:	#003E3E">
      <el-menu-item index="1" @click="System()">
        <i class="el-icon-user-solid"></i>
        <span slot="title" style="font-size:20px">系统消息</span>
      </el-menu-item>
      <el-menu-item index="2" @click="Business()">
        <i class="el-icon-document"></i>
        <span slot="title" style="font-size:20px">交易消息</span>
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
      
    }
  }
</script>

<style>
.navigation {
    padding: 0;
    height:500px;
    width:260px;
    background-color: #01814A
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