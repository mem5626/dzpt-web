<template>
<div>

    <div class="tabZujian">
      <div class="address-action">
        <span @click="Back()"><i class="el-icon-circle-close"></i></span>
      </div>
      <div>
        <el-tabs v-model="activeName">
            <el-tab-pane  label="订单" name="first" :key="'first'">
                <child1></child1>
            </el-tab-pane>
            <el-tab-pane  v-if="this.ORDERData.status === 2" label="合同" name="second" :key="'second'">
                <child2></child2>
            </el-tab-pane>
            <el-tab-pane  v-else label="合同" name="second" disabled :key="'second'">
                <child2></child2>
            </el-tab-pane>

            <!-- <el-tab-pane label="合同" name="second"  :key="'second'">
                <child2></child2>
            </el-tab-pane> -->

            <el-tab-pane   v-if="this.agreementData.status === 2" label="交收" name="three" :key="'three'">
                <child3></child3>
            </el-tab-pane>

            <el-tab-pane   v-else label="交收" name="three" disabled :key="'three'">
                <child3></child3>
            </el-tab-pane>
        </el-tabs>
      </div>

    </div>

</div>
</template>

<script>
import Child1 from '@/components/order/OrderFrom'
import Child2 from '@/components/order/Contract'
import Child3 from '@/components/order/Settlement'
import store from '@/vuex/store'
import { mapMutations, mapState, mapActions } from 'vuex'
export default {
  name: 'tabZujian',
  computed: {
    ...mapState(['goodInfo', 'userInfo'])
  },
  components: {
    child1: Child1,
    child2: Child2,
    child3: Child3
  },
  data () {
    return {
      // 默认第一个选项卡
      activeName: 'first',
      params: {
        listedGoodsId: ''
      },
      ORDERData: {
        status: ''
      },
      agreementData: {

      }
    }
  },
  created () {
    this.isGood()
    this.isLogin()
    if (this.$route.params.activeName === 'second') {
      this.activeName = this.$route.params.activeName
    } else if (this.$route.params.activeName === 'three') {
      this.activeName = this.$route.params.activeName
    }
    // console.log('商品信息')
    // console.log(this.goodInfo)
    this.params.listedGoodsId = this.goodInfo.listedGoodsId
    this.getRequest('/order/getOrderInfo', this.params)
      .then((response) => {
        // console.log(response.data)
        this.ORDERData = response.data.data
        console.log('this.OrderData1' + this.ORDERData.status)
      })
      .catch(function (error) {
        console.log(error)
      })
    this.getAgreementInfo()
  },
  mounted () {

  },
  methods: {
    ...mapMutations(['SET_GOODS_INFO']),
    ...mapActions(['loadGood', 'isLogin', 'isGood', 'goodOut']),
    ...mapState(['goodInfo']),
    getAgreementInfo: function () {
      // console.log('tab2sOrderData.tradingId = ' + this.goodInfo.tradingId)
      this.params.tradeBillId = this.goodInfo.tradingId
      this.getRequest('/order/getAgreementInfo', this.params)
        .then((res) => {
          // console.log(res.data.msg)
          if (res.data.code === '1') {
            this.agreementData = res.data.data
            console.log('get agreementInfo successfully')
          } else if (res.data.code === 'E0008') {
            this.$message.error('合同已创建')
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
    Back () {
      console.log('this.goodInfo')
      console.log(this.goodInfo)
      if (this.goodInfo.createDate !== '') {
        this.goodOut()
        this.$router.push({
          path: '/Mine/MyTrading',
          name: 'MyTrading',
          params: {
            red: 'MT'
          }
        })
      } else {
        this.$router.push({
          path: '/Product',
          name: 'Product'
        })
      }
    }
  },
  store
}
</script>

<style>
.tabZujian {
  max-width: 1200px;
  height: 650px;
  margin: 10px auto;
  padding: 15px;
  border-radius: 5px;
  box-shadow: 0px 0px 10px #545c64;
}
.el-tabs__item {
    font-size:20px
}
.address-action {
    text-align:right
}
.address-action span{
  font-size:25px;
  color: black;
}
</style>
