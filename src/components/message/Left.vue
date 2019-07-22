<template>
<div id="navigation">
<el-row class="tac" style="height:1200px;
    width:250px;
    background-color:white">
  <el-col :span="12">
    <el-menu
      default-active=""
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="	#003E3E"
      text-color="#fff"
      active-text-color="#FF5151"
      style="height:1200px;
    width:250px;
    background-color:	#003E3E">
      <el-menu-item index="2" @click="System()">
        <i class="el-icon-chat-line-square"></i>
        <span slot="title" style="font-size:20px">系统消息</span>
      </el-menu-item>
      <el-menu-item index="1" @click="Business()">
        <i class="el-icon-chat-dot-round"></i>
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
      System(){
      this.$router.push({  
          path: '/Message/System',   
          name: 'System',  
          params: {   
          username: this.$route.params.username,
          }
      })
      },
      Business(){
      this.$router.push({  
          path: '/Message/Business',   
          name: 'Business',  
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
    height:1200px;
    width:260px;
    background-color: #01814A
}
.el-menu-item {
    width:250px;
}

</style>