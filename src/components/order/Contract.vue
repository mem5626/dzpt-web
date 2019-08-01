<template>
    <div class="child2">
<!--      <el-dialog title="合同签名" :visible:sync="dialogFormVisible" :center="true">-->
<!--        <el-form :model="params_sign" :rules="rules">-->
<!--          <el-form-item label="签名" prop="sign">-->
<!--            <el-input v-model="params_sign"></el-input>-->
<!--          </el-form-item>-->
<!--        </el-form>-->
<!--        <div slot="footer" class="dialog-footer">-->
<!--          <el-button @click="dialogFormVisible = false">取 消</el-button>-->
<!--          <el-button type="primary" @click="commit(dialogform)">确 定</el-button>-->
<!--        </div>-->
<!--      </el-dialog>-->
        <div class="address">
            <div class="icon">
                <el-avatar style="width:60px;height:60px;margin-top:20px;margin-left:50px" src="static/img/合同.png"></el-avatar>
            </div>
            <div class="content" v-bind="agreementData">
                <p>合同号：{{agreementData.id}}</p>
                <p>合同确认状态：{{agreementData.statusdes}}</p>
                <p>买方签名：{{agreementData.buyerSign}}</p>
                <p>卖方签名：{{agreementData.sellerSign}}</p>
                <p>创建日期：{{agreementData.createDate}}</p>
            </div>
        </div>
        <div class="Goods">
            <div class="details">
                <p class="text">合同内容：</p>
            </div>
        </div>

        <div class="Btn">
          <el-row style="margin-top:20px">
            <el-button type="primary" plain class="btn" >取消合同</el-button>
            <el-button type="success" plain class="btn"
                       v-if="this.agreementData.status === 0 && this.agreementData.buyer === this.userInfo.userName"
                       @click="buyerSign" style="margin-left:150px">买家签名并支付货款</el-button>
            <el-button type="success" plain class="btn"
                       v-if="this.agreementData.status === 1 && this.agreementData.seller === this.userInfo.userName"
                       @click="sellerSign" style="margin-left:150px">卖家签名</el-button>
            <el-button type="danger" class="btn" disabled
                       @click="createDeliveryForm" style="margin-left: 150px">测试</el-button>
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
  },
  mounted () {
    console.log(this.$data)
    this.getOrderInfo()
    this.getAgreementInfo()
    console.log('listedGoodsId = ' + this.params_order.listedGoodsId)
    // console.log('tab2组件')
  },
  methods: {
    ...mapActions(['isLogin', 'isGood']),
    ...mapState(['goodInfo']),
    test: function () {
      console.log('in test function, orderData.address = ', this.orderData.address)
    },
    getOrderInfo: function () {
      this.params_order.listedGoodsId = this.goodInfo.listedGoodsId
      this.getRequest('/order/getOrderInfo', this.params_order)
        .then((res) => {
          console.log('tab3 got orderdata')
          this.orderData = res.data.data
          // console.log('orderData.address = ' + this.orderData.address)
          // console.log('created orderData = ' + this.orderData.address)
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    createDeliveryForm: function () {
      this.params_create.tradeBillId = this.goodInfo.tradingId
      this.params_create.deliveryWay = 'lulu'
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
          console.log(res.data.msg)
          if (res.data.code === '1') {
            res.data.data.createDate = this.dateFormat(res.data.data.createDate)
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
    // 买家签名后需要支付货款
    buyerSign: function () {
      // trade002用于模拟买方签名后的情况
      this.params_sign.tradeBillId = this.goodInfo.tradingId
      this.params_sign.buyerSign = this.userInfo.userName
      postRequest('/order/buyerSign', this.params_sign)
        .then((res) => {
          if (res.data.code === '1') {
            console.log('买方签名成功')
            this.$router.push({ // 跳转支付货款到平台
              path: '/Pay',
              name: 'Pay',
              params: {
                tradeId: this.tradeInfo.tradeId,
                userId: this.userInfo.userName,
                money: 0 // 需取得orderInfo.price
              }
            })
            this.getAgreementInfo()
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
      // trade003用于模拟卖方签名
      this.params_sign.tradeBillId = this.goodInfo.tradingId
      this.params_sign.sellerSign = this.userInfo.userName
      postRequest('/order/sellerSign', this.params_sign)
        .then((res) => {
          if (res.data.code === '1') {
            console.log('卖方签名成功')
            this.getAgreementInfo()
            this.createDeliveryForm()
          }
        })
        .catch((error) => {
          console.log(error)
        })
    }
    // affirm () {
    //   this.$router.push({
    //     path: '/Pay',
    //     name: 'Pay',
    //     params: {
    //       username: this.$route.params.username
    //     }
    //   })
    // }

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

</style>
