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
          <el-row style="margin-top:50px">
            <el-button v-if="this.OrderData.status==='下单成功'" type="primary" plain class="btn" style="margin-left:150px" disabled @click="cancle()">取消订单</el-button>
            <el-button v-else type="primary" plain class="btn" style="margin-left:150px">取消订单</el-button>
            <el-button type="success" plain class="btn" @click="Pay()" style="margin-left:150px">确认订单并支付保证金</el-button>
            <el-button v-if="this.OrderData.status==='下单成功'" type="danger" plain class="btn" style="margin-left:150px">下一步</el-button>
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
        if (this.OrderData.status === '订单创建') {
          this.OrderData.status = '订单创建阶段，买卖双方均未确认订单'
        } else if (this.OrderData.status === '买家确认') {
          this.OrderData.status = '买家已确认，等待卖家确认'
        } else if (this.OrderData.status === '下单成功') {
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
    margin-left: 310px;
}
.text {
    font-size:20px;
    text-align:left;
}
.Btn {
    margin-top:100px
}
</style>
