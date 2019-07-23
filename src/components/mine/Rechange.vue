<template>
    <el-card class="address-box">
      <el-page-header @back="MyWallet" content="余额充值">
</el-page-header>
       <div style="height: 20px;"></div>
      <div style="height: 10px;"></div>
      <div class="tag">请选择储蓄卡</div>
      <el-select v-model="cardNumber" style="width: 300px;" size="large"></el-select>
      <div class="tag">充值金额</div>
       <div id=money>¥ <el-input v-model="money" style="width: 300px;" size="large"></el-input></div>
      <el-button class="mTop" type="primary" @click="pay">下一步</el-button>
  </el-card>

</template>

<script>
  export default {
    data () {
      return {
        cardNumber:'',
        money:'',
      };
    },
    methods: {

  	MyWallet(){
  	this.$router.push({
  	    path: '/Mine/MyWallet',
  	    name: 'MyWallet',
  	    params: {
  	    username: this.$route.params.username,
  	    }
  	})
  	}
    },
  };
</script>

<style>
  .mTop{
    margin-top: 15px;
  }
  .tag{
    padding: 15px 0;
  }
 .address-box {
  padding: 15px;
  margin: 15px;
  border-radius: 5px;
  box-shadow: 0px 0px 10px #545c64;
  }
  .address-header {
    height: 35px;
    display: flex;
    justify-content: space-between;
    color: #232323;
    font-size: 18px;
  }
  .address-content {
    text-align: left;
    font-size: 14px;
  }
  #money{
    position: relative;
    left: -10px;
    font-weight:bold;
    font-size:1.5em;
   }
</style>
