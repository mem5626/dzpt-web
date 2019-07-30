<template>
<div>
    <div class="address-action">
        <span @click="Back()"><i class="el-icon-circle-close"></i></span>
    </div>
    <div class="tabZujian">
      <div>
        <el-tabs v-model="activeName">
            <el-tab-pane  label="订单" name="first" :key="'first'">
                <child1></child1>
            </el-tab-pane>

            <!-- <el-tab-pane  v-if="this.OrderData.status === 2" label="合同" name="second" :key="'second'">
                <child2></child2>
            </el-tab-pane>

            <el-tab-pane  v-else label="合同" name="second" disabled :key="'second'">
                <child2></child2>
            </el-tab-pane> -->

            <el-tab-pane label="合同" name="second"  :key="'second'">
                <child2></child2>
            </el-tab-pane>

            <el-tab-pane   v-if="this.OrderData.status === 2 " label="交收单" name="three" :key="'three'">
                <child3></child3>
            </el-tab-pane>

            <el-tab-pane   v-else label="交收单" name="three" disabled :key="'three'">
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
      OrderData: {

      }
    }
  },
  created () {
    this.isGood()
    this.isLogin()
    console.log(this.goodInfo)
    this.params.listedGoodsId = this.goodInfo.listedGoodsId
    this.getRequest('/order/getOrderInfo', this.params)
      .then((response) => {
        console.log(response.data.data.orderInfo.status)
        this.OrderData = response.data.data.orderInfo

        // 测试数据
        this.OrderData.status = 2
      })
      .catch(function (error) {
        console.log(error)
      })
  },
  mounted () {

  },
  methods: {
    ...mapMutations(['SET_GOODS_INFO']),
    ...mapActions(['loadGood', 'isLogin', 'isGood', 'goodOut']),
    ...mapState(['goodInfo']),
    Back () {
      console.log(this.goodInfo)
      if (this.goodInfo.tradingId) {
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
  height: 600px;
  margin: 5px;
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
