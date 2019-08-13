<template>
    <div class="child2" v-loading="loading">
        <div class="address">
            <div class="icon">
                <el-avatar style="width:60px;height:60px;margin-top:20px;margin-left:50px" src="static/img/交收单.png"></el-avatar>
            </div>
            <div class="content" v-bind="deliveryData">
                <p>交收单号：{{deliveryData.id}}</p>
                <p>商品名：{{deliveryData.goodsName}}</p>
                <p>交收方式：{{deliveryData.deliveryWay}}</p>
                <p>收货地址：{{deliveryData.address}}</p>
                <p>交收状态：{{deliveryData.statusdes}}</p>

            </div>
        </div>
        <div class="Goods">
            <div class="details">
            </div>
        </div>
        <div class="Btn">
          <el-row style="margin-top:60px">
            <el-button type="success" plain class="btn" @click="deliver"
                       v-if="this.deliveryData.status === 0 && this.agreementData.seller === this.userInfo.userName">
                       发货并支付手续费</el-button>
            <el-button type="success" plain class="btn" @click="receive"
                       v-if="this.deliveryData.status === 1 && this.agreementData.buyer === this.userInfo.userName">
                       确认收货</el-button>
<!--            <el-button type="danger" class="btn" disabled @click="sellerGetFund">测试收款</el-button>-->
          </el-row>
      </div>
    </div>
</template>

<script>
import { postRequest } from '../../utils/api'
import { mapState, mapActions } from 'vuex'
import store from '@/vuex/store'
export default {
  name: 'child3',
  computed: {
    ...mapState(['goodInfo', 'userInfo'])
  },
  data () {
    return {
      deliveryData: {
      },
      agreementData: {

      },
      orderData: {

      },
      params_order: {
        listedGoodsId: ''
      },
      params_agree: {
        tradeBillId: ''
      },
      params_fund: {
        drcrflg: '',
        money: 0,
        tradeType: '',
        tradeId: '',
        userId: ''
      },
      total: 0,
      buyData1: {
        payChannel: '',
        listedGoodsId: ''
      },
      res1: {
        code: '',
        msg: ''
      },
      loading: false
    }
  },
  created () {
    this.isLogin()
    this.isGood()
    this.getOrderInfo()
  },
  mounted () {
    this.getAgreementInfo()
    this.getDeliveryInfo()
  },
  methods: {
    ...mapActions(['isLogin', 'isGood']),
    ...mapState(['goodInfo']),
    getOrderInfo: function () { // 获得订单信息的封装函数
      console.log('gOI listedGoodsId = ' + this.goodInfo.listedGoodsId)
      this.params_order.listedGoodsId = this.goodInfo.listedGoodsId
      this.getRequest('/order/getOrderInfo', this.params_order)
        .then((res) => {
          console.log('tab3 got orderdata')
          this.orderData = res.data.data
          this.total = this.orderData.price * this.orderData.amount
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    getAgreementInfo: function () {
      this.params_agree.tradeBillId = this.goodInfo.tradingId
      this.getRequest('/order/getAgreementInfo', this.params_agree)
        .then((res) => {
          console.log(res.data.msg)
          if (res.data.code === '1') {
            this.agreementData = res.data.data
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
    getDeliveryInfo: function () {
      this.params_agree.tradeBillId = this.goodInfo.tradingId
      this.getRequest('/order/getDeliveryInfo', this.params_agree)
        .then((res) => {
          if (res.data.code === '1') {
            console.log(res.data.msg)
            this.deliveryData = res.data.data
            if (this.deliveryData.status === 0) {
              this.deliveryData.statusdes = '待卖家发货'
            } else if (this.deliveryData.status === 1) {
              this.deliveryData.statusdes = '卖家已发货，待买家收货'
            } else {
              this.deliveryData.statusdes = '买家已收货，交收完成'
            }
          } else if (res.data.code === 'E0007') {
            this.$message.error('交收信息不存在')
          }
          // else {
          //   this.$alert('合同信息获取失败', '执行结果', {
          //     confirmButtonText: '确定'
          //   })
          // }
        })
        .catch((error) => {
          console.log(error)
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
    // 卖家发货前需要支付手续费
    deliver: function () {
      this.params_agree.listedGoodsId = this.goodInfo.listedGoodsId
      postRequest('/order/deliverGoods', this.params_agree)
        .then((res) => {
          console.log('code = ', res.data.code)
          console.log(res.data)
          if (res.data.code === '1') {
            // this.$router.push({ // 跳转支付货款到平台
            //   path: '/Pay',
            //   name: 'Pay',
            //   params: {
            //     drcrflg: '1', // 1借(钱减少)2贷(钱增加)
            //     money: this.total * 0.04, // 卖家发货前支付手续费
            //     to: 'Settlement',
            //     tradeType: '5',
            //     tradeId: this.orderData.tradingId
            //   }
            // })
            // this.$message({
            //   message: '发货成功',
            //   type: 'success'
            // })

            this.mobile = this.isMobile()
            if (this.mobile === true) {
              this.buyData1.payChannel = '2'
            } else {
              this.buyData1.payChannel = '1'
            }
            this.buyData1.listedGoodsId = this.goodInfo.listedGoodsId
            console.log('this.buyData1')
            console.log(this.buyData1)
            this.postRequest('/bank/pay', this.buyData1).then((res) => {
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

            this.getDeliveryInfo()
          } else if (res.data.code === '-1') {
            this.$message.error('发货失败')
          } else {
            this.$alert('出现未知错误', '发货结果', {
              confirmButtonText: '确定'
            })
            this.getDeliveryInfo()
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
    receive: function () {
      this.params_agree.listedGoodsId = this.goodInfo.listedGoodsId
      postRequest('/order/receiveGoods', this.params_agree)
        .then((res) => {
          console.log('code = ' + res.data.code)
          if (res.data.code === '1') {
            console.log('收货成功')
            this.$message({
              message: '收货成功',
              type: 'success'
            })
            this.getDeliveryInfo()
            this.sellerGetFund()
          } else {
            this.$alert('出现未知错误', '确认收货结果', {
              confirmButtonText: '确定'
            })
            this.getDeliveryInfo()
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
    sellerGetFund: function () {
      console.log('sGF listedGoodsId = ' + this.goodInfo.listedGoodsId)
      console.log('orderData = ' + this.orderData.tradingId)
      console.log('sellerid = ' + this.agreementData.sellerId)
      console.log('money = ' + this.total)
      this.params_fund.drcrflg = '2'
      this.params_fund.money = this.total
      this.params_fund.tradeType = '3'
      this.params_fund.tradeId = this.orderData.tradingId
      this.params_fund.userId = this.agreementData.sellerId
      console.log(this.params_fund)
      this.postRequest('/pay/refund', this.params_fund)
        .then((res) => {
          if (res.data.code === '1') {
            console.log('买家已收款')
          } else {
            this.$message.error('发送收款请求错误')
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
    store
  }
}
</script>

<style>
.address {
    display:flex;
    background-color: darkgrey
}
.content {
    margin-top:10px;
    margin-left:20px;
    text-align:left;
}
.Goods {
    height: 250px;
    display: flex;
}
.block {
    margin-top: 30px;
    margin-left: 50px
}
.details {
    margin-top:7px;
    margin-left: 50px;
}
.details2 {
    margin-top: 7px;
    margin-left: 100px;
}
.text {
    font-size:20px;
    text-align:left;
}
.Btn {
  text-align: center;
  margin: 0px auto;
}
</style>
