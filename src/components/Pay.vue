<template>
  <div class="container1" v-loading="loading">
    <div id="title">
      <div id='payee'>请支付<span>{{this.tradeTypeName}}</span>费用
      </div>
      <div style="font-size: 1.5em;" id='money1'>

        ¥{{this.params1.money}}.00元
      </div>

    </div>

    <el-card id="card">
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" inline-message=false
        label-position="top" hide-required-asterisk=false>
        <div v-if="payTypeShow">
          <!-- <div class="tag">支付方式</div> -->
          <el-form-item inline-message=false label="支付方式" prop="targetItem">
            <el-select v-model="ruleForm.targetItem" value-key="cardNumber" style="width: 300px;" size="large">
              <el-option v-for="item in cards" :key="item" :label="`${item.cardNumber}(${item.bank})`" :value="item"
                :disabled="item.disabled"></el-option>
            </el-select>
          </el-form-item>

           <el-form-item v-if="this.ruleForm.targetItem.cardNumber === '零钱'" inline-message=false label="支付密码" prop="payPassword">
          <el-input style="width:300px" placeholder="请输入密码" v-model.lazy="ruleForm.payPassword" show-password>
          </el-input>
        </el-form-item>
        </div>
        <div v-if="payPasswordShow">
        <el-form-item inline-message=false label="支付密码" prop="payPassword">
          <el-input style="width:300px" placeholder="请输入密码" v-model.lazy="ruleForm.payPassword" show-password>
          </el-input>
        </el-form-item>
        </div>
        <div>
          <el-button class="mTop" @click="Next('ruleForm')">确认付款</el-button>
          <!-- <el-input v-model="payType"></el-input> -->

        </div>
      </el-form>
    </el-card>
<!-- <el-dialog title="输入支付密码" :visible.sync="dialogFormVisible">
          <el-form :model="form" :rules="rules" :ref="form">
            <el-form-item label="请输入支付密码" prop="payPassword" :label-width="formLabelWidth">
              <el-input v-model="form.payPassword" autocomplete="off" type="password" style="width:400px"></el-input>
            </el-form-item>
        </el-form>
         <div slot="footer" class="dialog-footer">
           <el-button @click="resetForm('form')">取 消</el-button>
           <el-button type="primary" @click="commit(form)">确 定</el-button>
         </div>
       </el-dialog> -->

  </div>
</template>

<script>
import store from '@/vuex/store'
import {
  mapState,
  mapActions
} from 'vuex'
export default {
  data () {
    return {
      cards: [],
      value: '',
      targetItem: '',
      cardNumber: '',
      payTypeShow: true,
      payPasswordShow: true,
      loading: false,
      success: true,
      tradeTypeName: '',
      change: {
        cardNumber: '零钱',
        bank: '',
        disabled: false
      },
      params: {
        userId: ''
      },
      params1: {
        payPassword: '', // 交易不需要传
        // userId: '1',
        userId: '',
        sellerId: this.$route.params.sellerId,
        balance: '',
        drcrflg: this.$route.params.drcrflg,
        money: this.$route.params.money,
        // // tradeId: '16',
        tradeId: this.$route.params.tradeId,
        tradeWayName: this.$route.params.tradeWayName, // 支付充值会传该值，交易时不传
        tradeWay: this.$route.params.tradeWay, // 交易不需要传
        tradeType: this.$route.params.tradeType,
        payChannel: '',
        listedGoodsId: ''
      },
      ruleForm: {
        targetItem: '',
        payPassword: ''
      },
      rules: {
        targetItem: [{
          required: true,
          message: '请选择到账银行卡',
          trigger: 'blur'
        }],
        payPassword: [{
          required: true,
          message: '请输入支付密码',
          trigger: 'blur'
        }]
      },
      to: this.$route.params.to,
      buyData1: {
        payChannel: '',
        listedGoodsId: ''
      }
    }
  },
  computed: {
    ...mapState(['userInfo', 'goodInfo'])
  },
  watch: {
    targetItem: function (val) {
      console.log(val)
    }
  },
  created () {
    this.isGood()
    this.isLogin()

    console.log('goodInfo.listedGoodsId' + this.goodInfo.listedGoodsId)
    console.log('userInfo' + this.userInfo.userId)
    this.params.userId = this.userInfo.userId
    this.params1.userId = this.userInfo.userId
    // console.log('this.params1.tradeWayName')
    // console.log(this.params1.tradeWayName)
    // console.log('this.userInfo')
    // console.log(this.userInfo.userId)
    // this.params1.userId= this.userInfo.userId
    // console.log(this.params1)
    this.Init()
    // 加载银行卡、余额
    this.getRequest('/mine/getAccount', this.params)
      .then(res => {
        // console.log(res)
        // console.log(res.data.data.cardList)
        // console.log('cards111111111')
        // console.log(this.cards)
        this.params1.balance = res.data.data.balance
        // console.log('balance:' + this.params1.balance)
        // console.log('balance:' + parseInt(this.params1.balance))
        // console.log('money:' + parseInt(this.params1.money))
        var b = parseInt(this.params1.balance)
        var m = parseInt(this.params1.money)
        if (b < m) {
          this.change.disabled = true
          // console.log('this.change.disabled' + this.change.disabled)
        }
        this.change.bank = '剩余￥' + this.params1.balance
        // console.log(this.change.bank)
        for (let i = 0; i < res.data.data.cardList.length; i++) {
          this.cards.push(res.data.data.cardList[i])
        }
        // console.log('cards222222222')
        // console.log(this.cards)
      }).catch(function (error) {
        console.log(error)
      })
      // console.log('this.params1.tradeWayName')
      // console.log(this.params1.tradeWayName)
    if (this.params1.tradeWayName != null) {
      console.log('ififififififif')
      this.payTypeShow = false
    } else {
      console.log('elseelseelse')
      // 添加零钱选项

      this.cards.unshift(this.change)
      // console.log('cards333333333333')
      // console.log(this.cards)
    }
  },
  methods: {
    ...mapActions(['isLogin', 'isGood']),
    Init () {
      console.log('this.params1.tradeType')
      console.log(this.params1.tradeType)
      switch (this.params1.tradeType) {
        case '1':
          this.tradeTypeName = '提现'
          break
        case '2':
          this.tradeTypeName = '充值'
          break
        case '3':
          this.tradeTypeName = '货款'
          this.payPasswordShow = false
          break
        case '4':
          this.tradeTypeName = '保证金'
          this.payPasswordShow = false
          break
        case '5':
          this.tradeTypeName = '手续费'
          this.payPasswordShow = false
          break
        default:
          break
      }
      console.log('this.tradeTypeName')
      console.log(this.tradeTypeName)
    },
    calculateBalance () {
      // 支付方式为银行卡 且不是充值时，余额不需要改变
      if (this.params1.tradeWay === '2') {
        if (this.params1.tradeType !== '2') {} else {
          if (this.params1.drcrflg === '1') {
            this.params1.balance = parseInt(this.params1.balance) - parseInt(this.params1.money)
          } else {
            this.params1.balance = parseInt(this.params1.balance) + parseInt(this.params1.money)
          }
        }
      } else {
        if (this.params1.drcrflg === '1') {
          this.params1.balance = parseInt(this.params1.balance) - parseInt(this.params1.money)
        } else {
          this.params1.balance = parseInt(this.params1.balance) + parseInt(this.params1.money)
        }
      }
    },
    prepareDate () {
      this.loading = true
      if (this.params1.tradeWayName != null) {
        this.payTypeShow = false
      } else {
        if (this.ruleForm.targetItem.cardNumber === '零钱') {
          this.params1.tradeWayName = this.ruleForm.targetItem.cardNumber
          this.params1.tradeWay = '1'
        } else {
          this.params1.tradeWayName = this.ruleForm.targetItem.cardNumber + '(' + this.ruleForm.targetItem.bank + ')'
          this.params1.tradeWay = '2'
        }
      }
      this.params1.payPassword = this.ruleForm.payPassword
      this.calculateBalance()
    },
    orderForm () {
      this.$router.push({
        path: '/Order',
        name: 'Order',
        params: {
          activeName: 'first',
          ifSuccess: true
        }
      })
    },
    MyAccount () {
      this.$router.push({
        path: '/Mine/MyWallet',
        name: 'MyWallet',
        activeName: 'second',
        params: {
          activeName: 'second',
          red: 'MW'
        }
      })
    },
    Contract () {
      this.$router.push({
        path: '/Order',
        name: 'Order',
        activeName: 'second',
        params: {
          activeName: 'second',
          conSuccess: true
        }
      })
    },
    Settlement () {
      this.$router.push({
        path: '/Order',
        name: 'Order',
        activeName: 'three',
        params: {
          activeName: 'three',
          setSuccess: true
        }
      })
    },
    isMobile () {
      if (navigator.userAgent.match(/Android/i) ||
      navigator.userAgent.match(/webOS/i) ||
      navigator.userAgent.match(/iPhone/i) ||
      navigator.userAgent.match(/iPad/i) ||
      navigator.userAgent.match(/iPod/i) ||
      navigator.userAgent.match(/BlackBerry/i) ||
      navigator.userAgent.match(/Windows Phone/i)
      ) return true
      return false
    },
    Next (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.prepareDate()
          if (this.params1.tradeType === '3' && this.ruleForm.targetItem.cardNumber !== '零钱') {
            this.mobile = this.isMobile()
            if (this.mobile === true) {
              this.params1.payChannel = '2'
            } else {
              this.params1.payChannel = '1'
            }
            console.log(this.goodInfo.listedGoodsId)
            this.params1.listedGoodsId = this.goodInfo.listedGoodsId
            console.log(this.params1)
            this.postRequest('/bank/pay', this.params1).then((res) => {
              console.log(res.data)
              const res1 = res.data
              if (res1.code === '1') {
                this.loading = true
                this.url = res1.data.url
                window.location = this.url
              } else {
                this.$message({
                  message: '支付失败！',
                  type: 'error'
                })
                return false
              }
            })
          } else {
            this.postRequest('/pay/commit', this.params1)
              .then(response => {
                console.log(response)
                if (response.data.code === '1') {
                  this.$message({
                    message: '支付成功',
                    type: 'success'
                  })
                  switch (this.to) {
                    case 'MyAccount':
                      this.MyAccount()
                      break
                    case 'orderForm':
                      this.orderForm()
                      break
                    case 'Contract':
                      this.Contract()
                      break
                    case 'Settlement':
                      this.Settlement()
                      break
                    default:
                      break
                  }
                } else {
                  this.$message({
                    message: '支付失败',
                    type: 'fail'
                  })
                  this.loading = false
                }
              })
              .catch(function (error) {
                console.log(error)
              })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
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
