<template>
    <el-card class="address-box">
      <el-page-header @back="MyWallet" content="余额充值">
</el-page-header>
       <div style="height: 20px;"></div>
      <div style="height: 10px;"></div>
      <div class="tag">请选择储蓄卡</div>
      <el-select v-model="value" style="width: 300px;" size="large">
        <el-option
        v-for="item in options"
         :key="item.value"
         :label="item.label"
         :value="item.value"></el-option>
      </el-select>
      <div class="tag">充值金额</div>
       <div id=money>¥ <el-input v-model="money" style="width: 300px;" size="large"></el-input></div>
      <el-button class="mTop" type="primary" @click="Pay">下一步</el-button>
  </el-card>

</template>

<script>
  export default {
    data () {
      return {
        cardNumber:'',
        money:'',
        options: [{
          value: '建行银行卡（6222021612002263657）',
          label: '建行银行卡（6222021612002263657）'
        }, {
          value: '工行银行卡（6222021612002266055）',
          label: '工行银行卡（6222021612002266055）'
        }, {
          value: '工行银行卡（6222020022660552425）',
          label: '工行银行卡（6222020022660552425）'
        }, ],
        value: '',
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
  	},
    Pay(){
    this.$router.push({
        path: '/Pay',
        name: 'Pay',
        params: {
        username: this.$route.params.username,
        payType:this.value,
        money:this.money,
        }
    })
    },
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
