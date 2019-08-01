<template>
  <div class="container1" v-loading="loading">
    <div id="title">
      <div id='payee'>向
        <span>***</span>
        支付
      </div>
      <div style="font-size: 1.5em;" id='money1'>

        ¥{{this.params1.money}}.00元
      </div>

    </div>


    <el-card id="card">
      <div v-if="payTypeShow">
        <div class="tag">支付方式</div>
        <el-select v-model="targetItem" value-key="cardNumber" style="width: 300px;" size="large">
          <el-option v-for="item in cards" :key="item" :label="`${item.cardNumber}(${item.bank})`" :value="item"></el-option>
        </el-select>
      </div>


      <div class="tag">支付密码</div>
      <el-input style="width:300px" placeholder="请输入密码" v-model.lazy="params1.payPassword" show-password>
      </el-input>
      <div>
        <el-button class="mTop" @click="Next()">确认付款</el-button>
        <!-- <el-input v-model="payType"></el-input> -->

      </div>
    </el-card>

  </div>
</template>

<script>
  import store from '@/vuex/store'
  import {
    mapState,
    mapActions
  } from 'vuex'
  export default {
    data() {
      return {
        cards: [],
        value: '',
        targetItem: '',
        cardNumber: '',
        payTypeShow: true,
        loading: false,
        success: true,
        change: {
          cardNumber: '零钱',
          bank: '',
        },
        params: {
          userId: ''
        },
        params1: {
          payPassword: '', //交易不需要传
          // userId: '1',
          userId: '',
          balance: '',
          drcrflg: this.$route.params.drcrflg,
          money: this.$route.params.money,
          // // tradeId: '16',
          tradeId: this.$route.params.tradeId,
          tradeWayName: this.$route.params.tradeWayName,
          tradeWay: this.$route.params.tradeWay, //交易不需要传
          tradeType: this.$route.params.tradeType,
        },
        to: this.$route.params.to
      }
  },
  computed: {
      ...mapState(['userInfo'])
    },
    computed: {
      ...mapState(['userInfo'])
    },
    created() {
      this.isLogin()
      this.params.userId = this.userInfo.userId
      this.params1.userId = this.userInfo.userId
      console.log('this.params1.tradeWayName')
      console.log(this.params1.tradeWayName)
      console.log('this.userInfo')
      console.log(this.userInfo.userId)
      // this.params1.userId= this.userInfo.userId
      console.log(this.params1)
      //加载银行卡、余额
      this.getRequest('/mine/getAccount', this.params)
        .then(res => {
          console.log(res);
          console.log(res.data.data.cardList)
          this.cards = res.data.data.cardList;
          console.log("cards");
          console.log(this.cards);
          this.params1.balance = res.data.data.balance;
          this.change.bank = '剩余￥' + this.params1.balance;
        }).catch(function(error) {
          console.log(error);
        });

      if (this.params1.tradeWayName != null) {
        this.payTypeShow = false
        console.log(payTypeShow)
      } else {
        //添加零钱选项
        this.cards.unshift(this.change)
        // console.log(this.userInfo.userId)
        // console.log(this.params1.tradeWayName)
      }
    },
    methods: {
      ...mapActions(['isLogin']),
      calculateBalance() {
        //支付方式为银行卡 且不是充值时，余额不需要改变
        if (this.params1.tradeWay === '2') {
          if (this.params1.tradeType != '2') {} else {
            if (this.params1.drcrflg === '1') {
              this.params1.balance = parseInt(this.params1.balance) - parseInt(this.params1.money)
            } else
              this.params1.balance = parseInt(this.params1.balance) + parseInt(this.params1.money)
          }
        } else {
          if (this.params1.drcrflg === '1') {
            this.params1.balance = parseInt(this.params1.balance) - parseInt(this.params1.money)
          } else
            this.params1.balance = parseInt(this.params1.balance) + parseInt(this.params1.money)
        }
      },
      prepareDate(){
        this.loading = true
        this.calculateBalance()
        if (this.params1.tradeWayName === null) {
          this.params1.tradeWayName = this.targetItem.cardNumber + "(" + this.targetItem.bank + ")";
        }
        if (this.targetItem.cardNumber === '零钱') {
          this.tradeWay = '1'
        } else this.tradeWay = '2'
      },
      createAgreement() {
        postRequest('/order/createAgreement', this.params)
          .then((res) => {
            if (res.data.code === '1') {
              console.log(res.data.msg)
            } else if (res.data.code === 'E0008') {
              this.$alert('合同信息已存在', '执行结果', {
                confirmButtonText: '确认'
              })
            }
          })
          .catch((error) => {
            console.log(error)
          })
      },
      orderForm() {
        this.$router.push({
          path: '/Order',
          name: 'Order',
          params: {
            activeName: 'first'
          }
        })
      },
      MyAccount() {
        this.$router.push({
          path: '/Mine/MyWallet',
          name: 'MyWallet',
          activeName: 'second',
          params: {
            activeName: 'second',
          }
        })
      },
      Next() {
        this.prepareDate()
        this.postRequest("/pay/commit", this.params1)
          .then(response => {
            console.log(response);
            if(response.data.code==='1'){
              this.$message({
                message: '支付成功',
                type: 'success'
              })
            }else{
              this.$message({
                message: '支付失败',
                type: 'fail'
              })
            }
            switch (this.to) {
              case 'MyAccount':
                this.MyAccount();
                break;
              case 'orderForm':
                this.orderForm();
                break;
              default:
                break;
            }




          })
          .catch(function(error) {
            console.log(error);
          });
      }

    },
    store

  }
</script>

<style>
  .mTop {
    margin-top: 15px;
  }


  .tag {
    padding: 15px 0;
  }


  .table {
    margin: auto;
    display: block;
  }


  #title {
    margin: 10px;
  }

  .container1 {
    padding: 5px;
    display: block;
    width: 800px;
    min-height: 300px;
    background-color: #F6F6F6;
    margin: 50px auto;
  }


  #money1 {
    text-align: right;
    overflow: hidden;

    color: #c40000;
    font-weight: bold;
    font-size: 1.2em;
  }

  #payee {
    float: left;
  }


  #card {
    width: 100%;

  }


  span {
    font-weight: bold;
  }
</style>
