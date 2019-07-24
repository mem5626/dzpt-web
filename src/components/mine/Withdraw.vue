<template>
 <el-card class="address-box">
          <el-page-header @back="MyWallet" content="零钱提现">
    </el-page-header>
     <div style="height: 20px;"></div>
    <div style="height: 10px;"></div>
     <div class="tag">到账银行卡</div>
     <el-select style="width: 300px; position:relative;left:40px" size="large"
     v-model="value">
     <el-option
     v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"></el-option>
     </el-select>
     <div class="sTag">两小时内到账</div>
     <div class="tag">提现金额</div>
      <div id=money >¥ <el-input v-model="money" style="width: 300px;" size="large"></el-input></div>
     <el-button  class="mTop" type="primary" @click="Pay">下一步</el-button>
 </el-card>

</template>

<script>
export default {
  data () {
    return {
      options: [{
        value: '选项1',
        label: '建行银行卡（6222021612002263657）'
      }, {
        value: '选项2',
        label: '工行银行卡（6222021612002266055）'
      }, {
        value: '选项3',
        label: '工行银行卡（6222020022660552425）'
      } ],
      value: '',
      money: ''
    }
  },
  methods: {
    MyWallet () {
      this.$router.push({
        path: '/Mine/MyWallet',
        name: 'MyWallet',
        params: {
          username: this.$route.params.username
        }
      })
    },
    Pay () {
      this.$router.push({
        path: '/Pay',
        name: 'Pay',
        params: {
          username: this.$route.params.username,
          payType: this.value,
          money: this.money
        }
      })
    }
  }
}
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
