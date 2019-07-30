<template>
    <div class="child1">
        <div class="address">
            <div class="icon">
                <el-avatar style="width:60px;height:60px;margin-top:45px;margin-left:50px" src="static/img/address.png"></el-avatar>
            </div>
            <div class="content">
                <p>收件人：{{OrderData.buyerName}}</p>
                <p>手机号：{{OrderData.buyerPhone}}</p>
                <p>收件地址：{{OrderData.buyerAddress}}</p>
            </div>
        </div>
        <div class="Goods">
            <div class="block">
              <el-image :src="src" style="width:200px"></el-image>
            </div>
            <div class="details">
                <p class="text">交易号：{{OrderData.tradingId}}</p>
                <p class="text">订单号：{{OrderData.orderId}}</p>
                <p class="text">挂牌单号：{{goodInfo.listedGoodsId}}</p>
                <p class="text">商品名：{{OrderData.goodsName}}</p>
                <p class="text">整单价格：{{OrderData.price}}</p>
                <p class="text">手续费：{{OrderData.serviceCharge}}</p>
            </div>
            <div class="details2">
                <p class="text">  </p>
                <p class="text">订单状态：{{OrderData.status}}</p>
                <p class="text">挂牌方：{{OrderData.sellerName}}</p>
                <p class="text">商品来源：{{OrderData.region}}</p>
                <p class="text">数量：{{OrderData.amount}}</p>
                <p class="text">保证金：{{OrderData.deposit}}</p>
                <p class="text">订单时间：{{OrderData.createDate}}</p>
            </div>
        </div>
        <div calss="Btn">
          <el-row style="margin-top:90px">
            <el-button v-if="this.OrderData.status=== '下单成功'" type="primary" plain class="btn" disabled>取消订单</el-button>
            <el-button v-else type="primary" plain class="btn" @click="cancle()">取消订单</el-button>

            <el-button v-if="this.OrderData.buyer===this.userInfo.userId&&this.OrderData.status ==='订单创建阶段，双方均未确认订单'" type="success" plain class="btn" @click="Pay()" style="margin-left:150px">确认订单并支付保证金</el-button>
            <el-button v-else-if="this.OrderData.buyer===this.userInfo.userId&&this.OrderData.status!=='订单创建阶段，双方均未确认订单'" type="success" plain class="btn" @click="Pay()" disabled="" style="margin-left:150px">确认订单并支付保证金</el-button>

            <el-button v-else-if="this.OrderData.buyer!==this.userInfo.userId&&this.OrderData.status ==='买家已确认，等待卖家确认'" type="success" plain class="btn" @click="Pay()" style="margin-left:150px">确认订单</el-button>
            <el-button v-else type="success" plain class="btn" @click="Pay()" style="margin-left:150px" disabled >确认订单</el-button>

            <el-button v-if="this.OrderData.status=== '下单成功'" type="danger" plain class="btn" style="margin-left:150px">下一步</el-button>
            <el-button v-else type="danger" plain class="btn" style="margin-left:150px" disabled>下一步</el-button>
          </el-row>
      </div>
    </div>
</template>

<script>
import store from '@/vuex/store'
import { mapMutations, mapState, mapActions } from 'vuex'
export default {
  name: 'child1',
  computed: {
    ...mapState(['goodInfo', 'userInfo'])
  },
  data () {
    return {
      src: 'static/img/good1.jpg',
      OrderData: {},
      params: {
        listedGoodsId: ''
      },
      affrimData: {
        userId: '',
        orderId: ''
      },
      res1: {
        code: '',
        msg: ''
      },
      DTAT: {
        listedGoodsId: '',
        status: '',
        tradeId: ''
      }
    }
  },
  created () {
    this.isGood()
    this.params.listedGoodsId = this.goodInfo.listedGoodsId
    this.getRequest('/order/getOrderInfo', this.params)
      .then((response) => {
        console.log(response.data)
        this.OrderData = response.data.data.orderInfo

        // 测试数据
        // this.OrderData.status = '买家已确认，等待卖家确认'
        // this.OrderData.buyer = '333'
        // this.OrderData.status = 0

        if (this.OrderData.status === 0) {
          this.OrderData.status = '订单创建阶段，双方均未确认订单'
        } else if (this.OrderData.status === 1) {
          this.OrderData.status = '买家已确认，等待卖家确认'
        } else if (this.OrderData.status === 2) {
          this.OrderData.status = '下单成功'
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  },
  methods: {
    ...mapMutations(['SET_GOODS_INFO']),
    ...mapActions(['goodOut', 'isGood', 'loadGood', 'isLogin']),
    ...mapState(['goodInfo']),
    Pay () {
      // 如果是买家，则需要跳转到支付保证金页面
      if (this.OrderData.buyer === this.userInfo.userId) {
        this.affrimData.userId = this.userInfo.userId
        this.affrimData.orderId = this.OrderData.orderId
        this.postRequest('/order/affirmOrder', this.affrimData).then((res) => {
          console.log(res.data)
          this.res1 = res.data
          if (this.res1.code !== 1) {
            this.$alert('订单确认失败！', '执行结果', {
              confirmButtonText: '确定'
            })
            return false
          } else {
            this.loadGood()
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
        })
      } else { // 如果是卖家，则待买家确认后才确认订单
        this.affrimData.userId = this.userInfo.userId
        this.affrimData.orderId = this.OrderData.orderId
        this.postRequest('/order/affirmOrder', this.affrimData).then((res) => {
          console.log(res.data)
          this.res1 = res.data
          if (this.res1.code !== 1) {
            this.$alert('订单确认失败！', '执行结果', {
              confirmButtonText: '确定'
            })
            return false
          } else {
            this.$alert('订单确认成功！', '执行结果', {
              confirmButtonText: '确定'
            })
          }
        })
      }
    },
    cancle () {
      this.OrderData.status = '订单已取消'
    }
  },
  mounted () {
    console.log('tab1组件')
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
    display:flex;
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
    margin-left: 250px;
}
.text {
    font-size:20px;
    text-align:left;
}
.Btn {
    margin-top:100px
}
</style>
