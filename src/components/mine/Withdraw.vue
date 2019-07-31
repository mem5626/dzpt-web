<template>
 <el-card class="address-box">
          <el-page-header @back="MyWallet" content="零钱提现">
    </el-page-header>
     <div style="height: 20px;"></div>
    <div style="height: 10px;"></div>
     <div class="tag">到账银行卡</div>
     <el-select v-model="targetItem" value-key="cardNumber" style="width: 300px; position:relative;left:40px" size="large"
     >
     <el-option
     v-for="item in cards"
      :key="item"
      :label="`${item.cardNumber}(${item.bank})`"
      :value="item"></el-option>
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
      userId:this.$route.params.userId,
      cards:this.$route.params.cards,
      balance:this.$route.params.balance,
      cardNumber: '',
      money: '',
      targetItem: '',
      tradeWay:'',
      loading: false,
      count:1,
      change:{
        cardNumber:'零钱',
        bank:'剩余￥'+this.$route.params.balance,
      }
    }
  },
  created () {
      //this.cards.unshift(this.change)
      console.log(this.balance)
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
      // if(this.targetItem.cardNumber==='零钱'){this.tradeWay='1'}
      // else this.tradeWay='2'
      this.$router.push({
        path: '/Pay',
        name: 'Pay',
        params: {
          //参数中没有无法赋空值
          // userId:this$route.params.userId,
          // username: this.$route.params.username,
          userId:'1',
          username: '',
          money: this.money,
          tradeWayName:this.targetItem.cardNumber+"("+this.targetItem.bank+")",
          tradeWay:'1',//支付方式为零钱
          tradeType:'1',//支付类型为提现
          drcrflg:'1',
          balance:this.balance,
          to:'MyAccount'
          // tradeWayName:"`${item.cardNumber}(${item.bank})`"
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
