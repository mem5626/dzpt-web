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

            <el-tab-pane  label="合同" name="second" :key="'second'">
                <child2></child2>
            </el-tab-pane>

            <el-tab-pane  label="交收单" name="three" :key="'three'">
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
export default {
  name: 'tabZujian',
  components: {
    child1: Child1,
    child2: Child2,
    child3: Child3
  },
  data () {
    return {
      // 默认第一个选项卡
      activeName: 'first'
    }
  },
  mounted () {

  },
  methods: {
    Back () {
      if (this.$route.params.type == 'T123') {
        this.$router.push({
          path: '/Mine/MyTrading',
          name: 'MyTrading',
          params: {
            username: this.$route.params.username
          }
        })
      } else {
        this.$router.push({
          path: '/Product',
          name: 'Product',
          params: {
            username: this.$route.params.username
          }
        })
      }
    }
  }
}
</script>

<style>
.tabZujian {
  height: 600px;
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
