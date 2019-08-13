<template>
  <div class="child2">
    <div class="address">
      <div class="icon">
        <el-avatar style="width:60px;height:60px;margin-top:20px;margin-left:50px" src="static/img/合同.png"></el-avatar>
      </div>
      <div class="content" v-bind="agreementData">
        <p>合同号：{{agreementData.agreementId}}</p>
        <p>合同确认状态：{{agreementData.statusdes}}</p>
        <p>创建日期：{{agreementData.createDate}}</p>
      </div>
    </div>
    <div class="details">
      <p class="text">合同内容：</p>
      <p>
        甲方 <b>{{agreementData.seller}}</b> 向乙方 <b>{{agreementData.buyer}}</b>
        出售商品<b> {{orderData.goodsName}}，</b>共{{orderData.amount}} 吨。
      </p>
      <p>
        商品单价为 <b>{{orderData.price}}</b> 元人民币每吨，
        合计总金额为 <b>{{this.total}}</b>元人民币。
      </p>
      <br/>
      <p>甲方签名：{{agreementData.sellerSign}}</p>
      <p>乙方签名：{{agreementData.buyerSign}}</p>

    </div>

    <div class="Btn">
      <el-row style="margin-top:60px">
        <el-button type="primary" plain class="btn" >取消合同</el-button>
        <el-button type="success" plain class="btn"
                   v-if="this.agreementData.status === 0 && this.agreementData.buyer === this.userInfo.userName"
                   @click="pay" style="margin-left:150px">买家签名并支付货款</el-button>
        <el-button type="success" plain class="btn"
                   v-if="this.agreementData.status === 1 && this.agreementData.seller === this.userInfo.userName"
                   @click="sellerSign" style="margin-left:150px">卖家签名</el-button>
        <!--            <el-button type="danger" class="btn" disabled-->
        <!--                       @click="createDeliveryForm" style="margin-left: 150px">测试</el-button>-->
      </el-row>
    </div>
  </div>
</template>

<script>
import { postRequest, getRequest } from '../../utils/api'
import { mapState, mapActions } from 'vuex'
import store from '@/vuex/store'

export default {
  name: 'child2',
  computed: {
    ...mapState(['goodInfo', 'userInfo'])
  },
  data () {
    return {
      rules: {
        sign: [
          { required: true, message: '请签名', trigger: 'blur' }
        ]
      },
      total: 0,
      agreementData: {

      },
      orderData: {

      },
      params_order: {
        listedGoodsId: ''
      },
      params_goods: {

      },
      params_get: {
        tradeBillId: ''
      },
      params_sign: {
        tradeBillId: '',
        buyersign: '',
        sellersign: ''
      },
      params_create: {

      }
    }
  },
  created () {
    this.isLogin()
    this.isGood()
    this.getOrderInfo()
    this.ifPaySuccess()
  },
  mounted () {
    this.getAgreementInfo()
  },
  methods: {
    ...mapActions(['isLogin', 'isGood']),
    ...mapState(['goodInfo']),
    test: function () {
      console.log('in test function, orderData.address = ', this.orderData.address)
    },
    getOrderInfo: function () { // 获得订单信息的封装函数
      this.params_order.listedGoodsId = this.goodInfo.listedGoodsId
      this.getRequest('/order/getOrderInfo', this.params_order)
        .then((res) => {
          this.orderData = res.data.data
          this.total = this.orderData.price * this.orderData.amount
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    createDeliveryForm: function () {
      this.params_create.tradeBillId = this.goodInfo.tradingId
      this.params_create.deliveryWay = '陆路运输'
      this.params_create.address = this.orderData.address
      this.params_create.goodsName = this.orderData.goodsName
      postRequest('/order/createDelivery', this.params_create)
        .then((res) => {
          if (res.data.code === '1') {
            console.log('create deliveryForm successfully')
            this.$message({
              message: '交收信息创建成功',
              type: 'success'
            })
          } else if (res.data.code === 'E0013') {
            this.$alert('交收信息已存在', '创建结果', {
              confirmButtonText: '确定'
            })
          } else {
            this.$alert('交收单创建出现未知错误', '创建结果', {
              confirmButtonText: '确定'
            })
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
    getAgreementInfo: function () {
      this.params_get.tradeBillId = this.goodInfo.tradingId
      this.getRequest('/order/getAgreementInfo', this.params_get)
        .then((res) => {
          if (res.data.code === '1') {
            res.data.data.createDate = this.dateFormat(res.data.data.createDate)
            this.agreementData = res.data.data
            if (this.agreementData.status === 0) {
              this.agreementData.statusdes = '合同已生成，买家待签名'
            } else if (this.agreementData.status === 1) {
              this.agreementData.statusdes = '买家已签名，卖家待签名'
            } else if (this.agreementData.status === 2) {
              this.agreementData.statusdes = '合同已生效'
            }
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
    // 买家支付货款成功后才执行签名
    buyerSign: function () {
      this.params_sign.tradeBillId = this.goodInfo.tradingId
      this.params_sign.buyerSign = this.userInfo.userName
      postRequest('/order/buyerSign', this.params_sign)
        .then((res) => {
          if (res.data.code === '1') {
            this.getAgreementInfo()
            this.$message('签名成功')
            console.log('买方签名成功')
          } else {
            this.$alert('签名失败', '签名结果', {
              confirmButtonText: '确定'
            })
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
    sellerSign: function () {
      this.params_sign.tradeBillId = this.goodInfo.tradingId
      this.params_sign.sellerSign = this.userInfo.userName
      postRequest('/order/sellerSign', this.params_sign)
        .then((res) => {
          if (res.data.code === '1') {
            console.log('卖方签名成功')
            this.createDeliveryForm()
            this.getAgreementInfo()
            this.$router.push({
              path: '/Order',
              name: 'Order',
              activeName: 'three',
              params: {
                activeName: 'three'
              }
            })
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
    pay () { // 买家支付货款
      this.$router.push({ // 跳转支付货款到平台
        path: '/Pay',
        name: 'Pay',
        params: {
          drcrflg: '1', // 1借(钱减少)2贷(钱增加)
          money: this.total,
          to: 'Contract',
          tradeType: '3',
          tradeId: this.orderData.tradingId
        }
      })
    },
    ifPaySuccess () {
      console.log(this.$route.params.conSuccess)
      if (this.$route.params.conSuccess === true) {
        this.buyerSign()
      }
    }
  },
  store
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

}
.block {
    margin-top: 30px;
    margin-left: 50px
}
.details {
    height: 300px;
    margin-top:7px;
    font-size: 17px;
    text-align: left;
}

</style>
