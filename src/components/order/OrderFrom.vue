<template>
    <div class="child1">
        <div class="address">
            <div class="icon">
                <el-avatar style="width:60px;height:60px;margin-top:45px;margin-left:50px" src="static/img/address.png"></el-avatar>
            </div>
            <div class="content">
                <p>收件人：</p>
                <p>手机号：</p>
                <p>收件地址：</p>
            </div>
        </div>
        <div class="Goods">
            <div class="block">
              <el-image :src="src" style="width:200px"></el-image>
            </div>
            <div class="details">
                <p class="text">订单号：</p>
                <p class="text">商品名：</p>
                <p class="text">挂牌单号：</p>
                <p class="text">整单价格：</p>
            </div>
            <div class="details2">
                <p class="text">订单确认状态：</p>
                <p class="text">挂牌方：</p>
                <p class="text">数量：</p>
                <p class="text">订单时间：</p>
            </div>
        </div>
        <div calss="Btn">
          <el-row style="margin-top:50px">
            <el-button type="primary" plain class="btn" @click="add()">取消订单</el-button>
            <el-button type="success" plain class="btn" @click="Pay()" style="margin-left:150px">确认订单并支付保证金</el-button>
            <el-button type="danger" plain class="btn" @click="dialogFormVisible = true" style="margin-left:150px">下一步</el-button>
          </el-row>
      </div>
    </div>
</template>

<script>
export default {
  name: 'child1',
  data () {
    return {
      src: 'static/img/good1.jpg'

    }
  },
	  methods: {
		  Pay () {
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
	  },
  mounted () {
    console.log('tab1组件')
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
