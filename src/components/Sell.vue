/* eslint-disable no-unused-expressions */
<template>
  <div>
    <Search></Search>
    <div class="container">
      <el-card shadow="hover">
        <div>
          <el-menu
            :default-active="activeIndex2"
            class="el-menu-demo"
            mode="horizontal"
            @select="handleSelect"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#FFFAFA">
            <el-menu-item index="1" style="font-size:22px"><i class="el-icon-s-goods" style="heignt:20px"></i>卖方挂牌商品</el-menu-item>
          </el-menu>
        </div>
        <div>
          <el-table
            :data="tableData"
            style="width: 100%"
            max-height="250"
            :align="center">
            <el-table-column
              prop="createDate"
              label="挂牌日期"
              width="100">
            </el-table-column>
            <el-table-column
              prop="listedGoodsId"
              label="挂牌号"
              width="120">
            </el-table-column>
            <el-table-column
              prop="goodsName"
              label="商品名"
              width="110">
            </el-table-column>
            <el-table-column
              prop="supplier"
              label="挂单方ID"
              width="200">
            </el-table-column>
            <el-table-column
              prop="supplierName"
              label="挂单方姓名"
              width="200">
            </el-table-column>
            <el-table-column
              prop="address"
              label="地址"
              min-width="180">
            </el-table-column>
            <el-table-column
              prop="amount"
              label="挂单数量"
              width="100">
            </el-table-column>
            <el-table-column
              prop="price"
              label="商品单价"
              width="100">
            </el-table-column>
            <el-table-column
              prop="region"
              label="商品来源"
              width="100">
            </el-table-column>
            <el-table-column
              prop="quality"
              label="质量标准"
              width="100">
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              width="80">
              <template slot-scope="scope">
                <el-button @click.native.prevent="buy(scope.row, tableData)" type="text" size="small"> 购买</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-card>
    </div>

    <div class="container">
      <el-card shadow="hover">
        <div>
          <el-menu
            :default-active="activeIndex2"
            class="el-menu-demo"
            mode="horizontal"
            @select="handleSelect"
            background-color="#800000"
            text-color="#fff"
            active-text-color="#ffd04b">
            <el-menu-item index="1" style="font-size:22px"><i class="el-icon-s-goods" style="heignt:20px"></i>买方挂牌商品</el-menu-item>
          </el-menu>
        </div>
        <div>
          <el-table
            :data="tableData1"
            style="width: 100%"
            max-height="250">
            <el-table-column
              prop="createDate"
              label="挂牌日期"
              width="100">
            </el-table-column>
            <el-table-column
              prop="listedGoodsId"
              label="挂牌号"
              width="120">
            </el-table-column>
            <el-table-column
              prop="goodsName"
              label="商品名"
              width="110">
            </el-table-column>
            <el-table-column
              prop="supplier"
              label="挂单方ID"
              width="200">
            </el-table-column>
            <el-table-column
              prop="supplierName"
              label="挂单方姓名"
              width="200">
            </el-table-column>
            <el-table-column
              prop="address"
              label="地址"
              width="180">
            </el-table-column>
            <el-table-column
              prop="amount"
              label="需求数量"
              width="100">
            </el-table-column>
            <el-table-column
              prop="price"
              label="接受价格"
              width="100">
            </el-table-column>
            <el-table-column
              prop="region"
              label="商品来源"
              width="100">
            </el-table-column>
            <el-table-column
              prop="quality"
              label="质量标准"
              width="100">
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              width="80">
              <template >
                <el-button
                  @click.native.prevent="chat()"
                  type="text"
                  size="small">
                  联系一下
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <el-dialog title="提醒他 我有货" :visible.sync="dialogFormVisible">
          <el-form :model="form">
            <el-form-item label="请输入您的商品的挂牌单号" >
              <el-input v-model="form.password" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="请输入您的联系方式（选填）">
              <el-input v-model="form.newpassword" autocomplete="off" ></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="commit()">确 定</el-button>
          </div>
        </el-dialog>
      </el-card>
    </div>
    </div>

</template>

<script>
import Search from '@/components/search/Search2'
import store from '@/vuex/store'
import { mapMutations, mapActions, mapState } from 'vuex'
export default {
  computed: {
    ...mapState(['goodInfo', 'userInfo'])
  },
  components: {
    Search
  },
  data () {
    return {
      dataimg: [{
        src: require('../assets/img/3.jpg')
      },
      {
        src: require('../assets/img/1.jpg')

      },
      {
        src: require('../assets/img/6.jpg')
      }
      ],
      formInline: {
        user: '',
        region: ''
      },
      activeIndex: '1',
      activeIndex2: '1',
      tableData: [],
      tableData1: [],
      dialogFormVisible: false,

      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      formLabelWidth: '120px',
      params: {
        hangType: '售出'
      },
      params2: {
        hangType: '需求'
      },
      DATA: {
        listedGoodsId: '',
        status: ''
      }
    }
  },
  created () {
    this.isGood()
    this.isLogin()
    // eslint-disable-next-line no-unused-expressions
    this.getRequest('/hang/getSellerHangList', this.params)
      .then((response) => {
        console.log(response.data)
        this.tableData = response.data.data.hangList
      })
      .catch(function (error) {
        console.log(error)
      })
    this.getRequest('/hang/getBuyerHangList', this.params2)
      .then((response) => {
        console.log(response.data)
        this.tableData1 = response.data.data.hangList
      })
      .catch(function (error) {
        console.log(error)
      })
  },
  methods: {
    ...mapMutations(['SET_GOODS_INFO']),
    ...mapActions(['loadGood', 'isLogin', 'isGood']),
    ...mapState(['goodInfo']),
    onSubmit () {
      console.log('submit!')
    },
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    },
    buy (row) {
      this.DATA.listedGoodsId = row.listedGoodsId
      this.DATA.status = '订单'
      this.loadGood(this.DATA)
      this.$router.push({
        path: '/Product',
        name: 'Product'
      })
    },
    success () {
      this.dialogFormVisible = false
      //  alert("议价单已提交！")
    },
    chat () {
      this.dialogFormVisible = true
    },
    commit () {
      this.dialogFormVisible = false
      this.$alert('联系成功', '执行结果', {
        confirmButtonText: '确定'
      })
    }
  },
  store

}
</script>

<style scoped>
.nav-body {
  width: 100%;
  height: 380px;
  margin: 0px auto;
  background-color:#6e6568
}
.play {
    margin-right: 130px;
    margin-left:0px;
}
.button1 {
    width:20px;
    margin-top:20px;
}
/*导航内容*/
.nav-content {
  width: 100%;
  overflow: hidden;
  float: left;
}
/*导航图片*/
.nav-show-img {
  margin-top: 10px;
  float: left;
}
.nav-show-img:nth-child(2) {
  margin-left: 12px;
}
.container {
  margin: 30px auto 0 auto;
  padding-bottom: 20px;
  width: 1200px;
}
.content {
  width: 1008px;
  margin: 0px auto;
}

</style>
