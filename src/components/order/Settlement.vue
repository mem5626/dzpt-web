<template>
    <div class="child2">
        <div class="address">
            <div class="icon">
                <el-avatar style="width:60px;height:60px;margin-top:20px;margin-left:50px" src="static/img/交收单.png"></el-avatar>
            </div>
            <div class="content" v-bing="deliveryData">
                <p>交收单号：{{deliveryData.deliveryId}}</p>
                <p>商品名：{{deliveryData.goodsName}}</p>
                <p>交收方式：{{deliveryData.deliveryWay}}</p>
                <p>收货地址：{{deliveryData.address}}</p>
                <p>交收状态：{{deliveryData.status}}</p>

            </div>
        </div>
        <div class="Goods">
            <div class="details">
                <p class="text">交收内容：</p>
            </div>
        </div>
        <div class="Btn">
          <el-row style="margin-top:20px">
            <el-button type="success" plain class="btn" @click="buy()">发  货</el-button>
            <el-button type="success" plain class="btn" @click="buy()" style="margin-left:150px;">确认收货</el-button>
          </el-row>
      </div>
    </div>
</template>

<script>
import { postRequest, getRequest } from '../../utils/api'

export default {
  name: 'child3',
  data () {
    return {
      deliveryData: {

      },
      tradeInfo: {
        tradeId: 'trade001'
      },
      params: {
        tradeId: ''
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
          if (res.data.code == '1') {
            console.log(res.data.msg)
            this.deliveryData = res.data.data.deliveryInfo
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
