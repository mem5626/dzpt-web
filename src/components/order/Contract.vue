<template>
    <div class="child2">
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
                       v-if="this.agreementData.status === 0 && this.tradeInfo.buyer === this.userInfo.userName"
                       @click="buyerSign()" style="margin-left:150px">买家签名并支付货款</el-button>
            <el-button type="success" plain class="btn"
                       v-if="this.agreementData.status === 1 && this.tradeInfo.seller === '晓明'"
                       @click="sellerSign()" style="margin-left:150px">卖家签名</el-button>
            <el-button type="danger" plain class="btn" @click="dialogFormVisible = true" style="margin-left:150px">下一步</el-button>
          </el-row>
      </div>
    </div>
</template>

<script>
import { postRequest, getRequest } from '../../utils/api'
import { mapMutations, mapState, mapActions } from 'vuex'
export default {
  name: 'child2',
  computed: {
    ...mapState(['userInfo'])
  },
  data () {
    return {
      tradeInfo: {
        tradeId: 'trade001',
        buyer: 'xxxx',
        seller: '晓明'
      },
      agreementData: {

      },
      params: {
        tradeId: '',
        sign: ''
      }
    }
  },
  watch: {

  },
  created () {
    // this.isLogin()
  },
  mounted () {
    this.getAgreementInfo(this.tradeInfo.tradeId)
    console.log(this.$data)
    // console.log('tab2组件')
  },
  updated () {
    // this.getAgreementInfo()
  },
  methods: {
    getAgreementInfo: function (tradeId) {
      this.params.tradeId = tradeId
      getRequest('/order/getAgreementInfo', this.params)
        .then((res) => {
          console.log(res.data.msg)
          if (res.data.code === 1) {
            this.agreementData = res.data.data.agreementInfo
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
      this.tradeInfo.tradeId = 'trade002'
      // console.log('tradeId = ' + this.tradeInfo.tradeId)
      this.params.tradeId = this.tradeInfo.tradeId
      this.params.sign = this.userInfo.userName
      postRequest('/order/buyerSign', this.params)
        .then((res) => {
          if (res.data.code === 1) {
            // console.log(res.data.msg)
            // this.$router.push({ // 跳转支付货款到平台
            //   path: '/Pay',
            //   name: 'Pay',
            //   params: {
            //     tradeId: this.tradeInfo.tradeId,
            //     userId: this.userInfo.userName,
            //     money: 0 // 需取得orderInfo.price
            //   }
            // })
            this.getAgreementInfo(this.tradeInfo.tradeId)
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
    sellerSign: function () {
      // trade003用于模拟卖方签名
      this.tradeInfo.tradeId = 'trade003'
      // console.log('tradeId = ' + this.tradeInfo.tradeId)
      this.params.tradeId = this.tradeInfo.tradeId
      this.params.sign = this.userInfo.userName
      postRequest('/order/sellerSign', this.params)
        .then((res) => {
          if (res.data.code === 1) {
            // console.log(res.data.msg)
            this.getAgreementInfo(this.tradeInfo.tradeId)
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
    createDeliveryForm: function () {

    },
    affirm () {
      this.$router.push({
        path: '/Pay',
        name: 'Pay',
        params: {
          username: this.$route.params.username
        }
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

</style>
