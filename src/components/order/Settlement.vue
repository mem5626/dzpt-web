<template>
    <div class="child2">
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
                <p class="text">交收内容：</p>
            </div>
        </div>
        <div class="Btn">
          <el-row style="margin-top:20px">
            <el-button type="success" plain class="btn" @click="deliver"
                       v-if="this.deliveryData.status === 0 && this.agreementData.seller === this.userInfo.userName">
                       发  货</el-button>
            <el-button type="success" plain class="btn" @click="receive"
                       v-if="this.deliveryData.status === 1 && this.agreementData.buyer === this.userInfo.userName">
                       确认收货</el-button>
          </el-row>
      </div>
    </div>
</template>

<script>
import { postRequest, getRequest } from '../../utils/api'
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
      params: {
        listedGoodsId: ''
      },
      params_get: {
        tradeBillId: ''
      }
    }
  },
  created () {
    this.isLogin()
    this.isGood()
  },
  mounted () {
    console.log(this.$data)
    this.getAgreementInfo()
    this.getDeliveryInfo()

    // this.getAgreementInfo()
    console.log('tab3组件')
  },
  methods: {
    ...mapActions(['isLogin']),
    ...mapActions(['isGood']),
    getAgreementInfo: function () {
      this.params.tradeBillId = this.goodInfo.tradingId
      this.getRequest('/order/getAgreementInfo', this.params)
        .then((res) => {
          console.log(res.data.msg)
          if (res.data.code === '1') {
            this.agreementData = res.data.data
            if (this.agreementData.status === 0) {
              this.agreementData.statusdes = '合同已生成，买家待签名'
            } else if (this.agreementData.status === 1) {
              this.agreementData.statusdes = '买家已签名，卖家待签名'
            } else {
              this.agreementData.statusdes = '合同已生效'
            }
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
    getDeliveryInfo: function () {
      console.log('goodsInfo = ' + this.goodInfo.tradingId)
      this.params_get.tradeBillId = this.goodInfo.tradingId
      getRequest('/order/getDeliveryInfo', this.params_get)
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
          } else {
            this.$message.error('交收信息查询未知错误')
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
    deliver: function () {
      this.params.listedGoodsId = this.goodInfo.listedGoodsId
      this.postRequest('/order/deliverGoods', this.params)
        .then((res) => {
          console.log('code = ', res.data.code)
          if (res.data.code === '1') {
            console.log('发货成功')
            this.$message({
              message: '发货成功',
              type: 'success'
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
      this.params.listedGoodsId = this.goodInfo.listedGoodsId
      this.postRequest('/order/receiveGoods', this.params)
        .then((res) => {
          console.log('code = ' + res.data.code)
          if (res.data.code === '1') {
            console.log('收货成功')
            this.$message({
              message: '收货成功',
              type: 'success'
            })
            this.getDeliveryInfo()
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
