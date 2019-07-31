<template>
    <div class="child2">
        <div class="address">
            <div class="icon">
                <el-avatar style="width:60px;height:60px;margin-top:20px;margin-left:50px" src="static/img/交收单.png"></el-avatar>
            </div>
            <div class="content" v-bind="deliveryData">
                <p>交收单号：{{deliveryData.deliveryId}}</p>
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
            <el-button type="success" plain class="btn" @click="deliver('111')"
                       v-if="this.deliveryData.status === 0 && this.tradeInfo.buyer === this.userInfo.userName">
                       发  货</el-button>
            <el-button type="success" plain class="btn" @click="receive('111')"
                       v-if="this.deliveryData.status === 1 && this.tradeInfo.seller === '晓明'">
                       确认收货</el-button>
            <el-button type="danger" class="btn"
                       v-if="this.deliveryData.status === 2">完成</el-button>
          </el-row>
      </div>
    </div>
</template>

<script>
import { postRequest, getRequest } from '../../utils/api'
import { mapState } from 'vuex'
export default {
  name: 'child3',
  computed: {
    ...mapState(['userInfo'])
  },
  data () {
    return {
      deliveryData: {

      },
      tradeInfo: {
        tradeId: 'trade001',
        buyer: 'xxxx',
        seller: '晓明'
      },
      params: {

      }
    }
  },
  mounted () {
    this.getDeliveryInfo(this.tradeInfo.tradeId)
    console.log('tab3组件')
  },
  methods: {
    getDeliveryInfo: function (tradeId) {
      this.params.tradeId = tradeId
      getRequest('/order/getDeliveryInfo', this.params)
        .then((res) => {
          if (res.data.code === 1) {
            console.log(res.data.msg)
            this.deliveryData = res.data.data.deliveryInfo
            if (this.deliveryData.status === 0) {
              this.deliveryData.statusdes = '待卖家发货'
            } else if (this.deliveryData.status === 1) {
              this.deliveryData.statusdes = '卖家已发货，待买家收货'
            } else {
              this.deliveryData.statusdes = '买家已收货，交收完成'
            }
          } else if (res.data.code === 'E0007') {
            this.$alert('合同信息不存在', '执行结果', {
              confirmButtonText: '确定'
            })
          } else {
            this.$alert('合同信息获取失败', '执行结果', {
              confirmButtonText: '确定'
            })
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
    deliver: function (listedGoodsId) {
      this.tradeInfo.tradeId = 'trade002' // 用于模拟买家发货的状态变化
      this.params.listedGoodsId = listedGoodsId
      this.postRequest('/order/deliverGoods', this.params)
        .then((res) => {
          if (res.data.code === 1) {
            console.log(res.data.msg)
            this.getDeliveryInfo(this.tradeInfo.tradeId)
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
    receive: function (listedGoodsId) {
      this.tradeInfo.tradeId = 'trade003' // 用于模拟买家发货的状态变化
      this.params.listedGoodsId = listedGoodsId
      this.postRequest('/order/receiveGoods', this.params)
        .then((res) => {
          if (res.data.code === 1) {
            console.log(res.data.msg)
            this.getDeliveryInfo(this.tradeInfo.tradeId)
          }
        })
        .catch((error) => {
          console.log(error)
        })
    }
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
    margin-left: 310px;
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
