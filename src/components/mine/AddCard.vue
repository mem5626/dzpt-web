<template>
  <el-card class="address-box">
      <div class="address-header">
         <el-button @click="MyAccount()">返回</el-button>
       </div>
       <div style="height: 20px;"></div>
       <div id="header">添加银行卡</div>
      <div style="height: 10px;"></div>
      <div class="tag">请填写银行卡信息</div>
      <div class="tag" style="position: relative; left: -15px;">银行卡卡号：<el-input style="width: 300px;" size="large"></el-input></div>
      <div class="tag">有效期：<el-input style="width: 300px;" size="large"></el-input></div>
      <div class="tag" >安全码：<el-input style="width: 300px;" size="large"></el-input></div>
      <div style="height: 30px;"></div>
      <div class="tag" style="position: relative; left: -70px;">
        <el-checkbox v-model="checked">同意</el-checkbox>
        <el-link style="position: relative; left: -34px;" type="primary">用户协议</el-link>
        </div>
      <el-button class="mTop" type="primary" @click="pay">下一步</el-button>
  </el-card>
</template>

<script>
   export default {
    data () {
      return {
        checked:false,
      };
    },
    methods: {

  	MyAccount(){
  	this.$router.push({
  	    path: '/Mine/MyAccount',
  	    name: 'MyAccount',
  	    params: {
  	    username: this.$route.params.username,
  	    }
  	})
  	}
    },
  };
</script>

<style>
  #header{
      font-weight:bold;
      font-size:1.5em;
    }
  .mTop{
      margin-top: 15px;
    }
    .tag{
      padding: 15px 0;
    }
    .sTag{
      position:relative;
      left: 50px;
      display: inline-block;
      padding: 5px 0;
      font-size:0.5em;
    }
   .address-box {
    padding: 15px;
    margin: 15px;
    border-radius: 5px;
    box-shadow: 0px 0px 10px #545c64;
    }
    .address-header {
      /* height: 35px; */
      display: flex;
      justify-content: space-between;
      /* color: #232323; */
      /* font-size: 18px; */
    }
    .address-content {
      text-align: left;
      font-size: 14px;
    }
    #money{
      position: relative;
      left: -10px;
      font-weight:bold;
      font-size:1.8em;
     }
</style>
