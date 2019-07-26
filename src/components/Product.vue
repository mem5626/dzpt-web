<template>
  <div>
    <Search></Search>
    <div id="product">
      <div class="address-box">
        <div class="address-header">
            <div class="product-title">挂牌单号:{{goodInfo.listedGoodsId}}</div>
            <div class="address-action">
               <span @click="back()"><i class="el-icon-circle-close"></i></span>
            </div>
        </div>
        <div class="block" style="text-align:left">
            <el-image :src="src" style="width:200px"></el-image>
        </div>
        <!-- <div class="Bigtitle">
          <p><span class="product-title">挂牌号 :</span> {{info.username}}</p>
        </div>
        <div class="address-action">
          <span @click="edit()"><Icon type="edit"></Icon> 修改</span>
        </div> -->
        <div class="box">
        <div class="address-content">
           <p><span class="address-content-title">商品名称 : {{info.goodsName}}</span></p>
           <p><span class="address-content-title">挂牌数量 : {{info.amount}}</span> </p>
           <p><span class="address-content-title">质量标准 : {{info.region}}</span> </p>
           <p><span class="address-content-title">商品供应商 : {{info.supplier}}</span> </p>
        </div>
        <div class="address-content1">
           <p><span class="address-content-title">挂牌日期 : {{info.createDate}}</span> </p>
           <p><span class="address-content-title">整单价格 : {{info.price}}</span> </p>
           <p><span class="address-content-title">企业地址 : {{info.address}}</span> </p>
        </div>
        </div>
        <div>
          <el-row calss="Btn" style="margin-top:20px">
            <el-button type="primary" plain class="btn" @click="add()">加入进货单</el-button>
            <el-button type="success" plain class="btn" @click="buy()">立即购买</el-button>
            <el-button type="danger" plain class="btn" @click="dialogFormVisible = true">议  价</el-button>
          </el-row>
      </div>
      </div>

    </div>

    <el-dialog title="议价单" :visible.sync="dialogFormVisible" :center="true">
      <el-form :model="talkform" :inline="true" :rules="rules">
        <el-form-item label="期望价格" prop="price" :label-width="formLabelWidth" >
          <el-input v-model="talkform.price" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="购买数量" :label-width="formLabelWidth">
          <el-input disabled v-model="talkform.number" autocomplete="off">
            <template slot="append">/{{getunit}}</template>
          </el-input>
        </el-form-item>
        <br/>
        <el-form-item label="总价" :label-width="formLabelWidth">{{talktotalprice}} 元</el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="success()">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import Search from '@/components/search/Search2'
import store from '@/vuex/store'
import { mapState, mapActions } from 'vuex'
export default {
  components: {
    Search
  },
  data () {
    return {
      formData: {
        nickname: '',
        age: '',
        province: '',
        city: '',
        area: '',
        address: '',
        postalcode: '',
        phone: ''
      },
      src: 'static/img/good1.jpg',
      info: {},
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
        product_name: '',
        product_type: '',
        price: 0, // 单价
        number: 0, // 数量/质量
        unit: 'Kg', // 单位
        region: '', // 来源地（进/出口）
        qs: '', // 质量标准
        date1: '',
        date2: '',
        delivery: false,
        hang_type: '', // 挂牌类型（买/卖方）
        resource: '',
        desc: ''
      },
      talkform: {
        price: 0,
        number: 100
      },
      formLabelWidth: '100px',
      rules: {
        price: [
          {required: true, message: '请输入议价的期望价格', trigger: 'blur'},
          {min: 1, message: '最小价格为1', trigger: 'blur'}
        ]
      },
      params: {
        listedGoodsId: ''
      },
      addCar: {
        userId: '',
        listedGoodsId: ''
      },
      buyData: {
        buyer: '',
        listedGoodsId: ''
      },

      res1: {
        code: '',
        msg: ''
      }
    }
  },
  computed: {
    ...mapState(['goodInfo']),
    ...mapState(['userInfo']),
    talktotalprice: function () {
      return this.talkform.price * this.talkform.number
    },
    getunit: function () {
      return this.form.unit
    }
  },
  created () {
    this.isLogin()
    this.isGood()
    this.params.listedGoodsId = this.goodInfo.listedGoodsId
    this.getRequest('/search/searchHangGood', this.params)
      .then((response) => {
        console.log(response.data)
        this.info = response.data.data
      })
      .catch(function (error) {
        console.log(error)
      })
  },
  methods: {
    ...mapActions(['goodOut', 'isGood', 'isLogin']),
    back () {
      console.log(this.goodInfo)
      this.goodOut()
      this.$router.push({
        path: '/Sell',
        name: 'Sell'
      })
      // if (this.$route.params.type === 'c123') {
      //   this.$router.push({
      //     path: '/Mine/MyCar',
      //     name: 'MyCar',
      //     params: {
      //       username: this.$route.params.username
      //     }
      //   })
      // } else {
      //   this.$router.push({
      //     path: '/Sell',
      //     name: 'Sell',
      //     params: {
      //       username: this.$route.params.username
      //     }
      //   })
      // }
    },
    buy () {
      this.buyData.buyer = this.userInfo.userId
      this.buyData.listedGoodsId = this.goodInfo.listedGoodsId
      console.log(this.buyData)
      this.postRequest('/order/createOrder', this.buyData).then((res) => {
        console.log(res.data)
        this.res1 = res.data
        if (this.res1.code === 1) {
          this.$alert('生成订单成功！', '执行结果', {
            confirmButtonText: '确定'
          })
          this.$router.push({
            path: '/Order',
            name: 'Order'
          })
        } else if (this.res1.code === 'E0006') {
          this.$alert('进入已存在订单', '执行结果', {
            confirmButtonText: '确定'
          })
          this.$router.push({
            path: '/Order',
            name: 'Order'
          })
        } else {
          this.$alert('生成订单失败！', '执行结果', {
            confirmButtonText: '确定'
          })
          return false
        }
      })
    },
    success () {
      this.dialogFormVisible = false
      //  alert("议价单已提交！")
      this.$alert('议价单提价成功', '执行结果', {
        confirmButtonText: '确定'
      })
    },
    add () {
      this.addCar.userId = this.userInfo.userId
      this.addCar.listedGoodsId = this.goodInfo.listedGoodsId
      this.postRequest('/mine/addMyCar', this.addCar).then((res) => {
        console.log(res.data)
        this.res1 = res.data
        if (this.res1.code === 1) {
          this.$alert('加入进货单成功', '执行结果', {
            confirmButtonText: '确定'
          })
        } else {
          this.$alert('加入进货单成功', '执行结果', {
            confirmButtonText: '确定'
          })
          return false
        }
      })
    }
  },
  store
}
</script>

<style scoped>
.address-header {
    display:flex;
}
.product {
    background-color: black;
    width:100%;
    height:800px
}

.address-box {
  padding: 15px;
  margin: 15px;
  border-radius: 5px;
  background-color: darkslategray;
  box-shadow: 0px 0px 10px #545c64;
}
.box {
  display: flex;
}
.address-content-title {
  color: white;
  font-size:18px
}
.product-title {
  color: white;
  font-size:22px
}
.Bigtitle {
  text-align: left;
  display: flex;
}
.address-content {
    width:650px;
    text-align: left;
}
.address-content1 {
    width:500px;
    text-align: left;
}
.Btn {
    margin-top:20px;
}
.btn {
    margin-left:100px
}
.address-action span{
  margin-left: 15px;
  font-size: 20px;
  color: white;
  cursor: pointer;
}
.address-header {
  height: 35px;
  display: flex;
  justify-content: space-between;
  color: #232323;
  font-size: 18px;
}
</style>
