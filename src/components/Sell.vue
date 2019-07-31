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
              align="center">
            </el-table-column>
            <el-table-column
              prop="listedGoodsId"
              label="挂牌号"
              align="center">
            </el-table-column>
            <el-table-column
              prop="goodsName"
              label="商品名"
              align="center">
            </el-table-column>
            <el-table-column
              prop="supplier"
              label="挂单方ID"
              align="center">
            </el-table-column>
            <el-table-column
              prop="supplierName"
              label="挂单方姓名"
              align="center">
            </el-table-column>

            <el-table-column
              prop="amount"
              label="挂单数量"
              align="center">
            </el-table-column>
            <el-table-column
              prop="price"
              label="商品单价"
              align="center">
            </el-table-column>
            <el-table-column
              prop="region"
              label="商品来源"
              align="center">
            </el-table-column>
            <el-table-column
              prop="quality"
              label="质量标准"
              align="center">
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              width="100">
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
              align="center">
            </el-table-column>
            <el-table-column
              prop="listedGoodsId"
              label="挂牌号"
              align="center">
            </el-table-column>
            <el-table-column
              prop="goodsName"
              label="商品名"
              align="center">
            </el-table-column>
            <el-table-column
              prop="supplier"
              label="挂单方ID"
              align="center">
            </el-table-column>
            <el-table-column
              prop="supplierName"
              label="挂单方姓名"
              align="center">
            </el-table-column>

            <el-table-column
              prop="amount"
              label="需求数量"
              align="center">
            </el-table-column>
            <el-table-column
              prop="price"
              label="接受价格"
              align="center">
            </el-table-column>
            <el-table-column
              prop="region"
              label="商品来源"
              align="center">
            </el-table-column>
            <el-table-column
              prop="quality"
              label="质量标准"
              align="center">
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              width="100">
              <template slot-scope="scope">
                <el-button @click="chat(scope.row, tableData)" type="text" size="small"> 联系一下</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <el-dialog title="提醒他 我有货" :visible.sync="dialogFormVisible">
          <p>被提醒方：{{LXid}}</p>
          <el-form :model="form" rules="rules">
            <el-form-item label="请输入您的商品的挂牌单号" prop="listedGoodsId">
              <el-input v-model="form.listedGoodsId" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="请输入您的联系方式（QQ\微信\电话）" prop="qq">
              <el-input v-model="form.qq" autocomplete="off" ></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="commit(form)">确 定</el-button>
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
        listedGoodsId: '',
        qq: ''
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
      },
      DATA1: {
        sender: '',
        receiver: '',
        title: '',
        type: '',
        content: ''
      },
      LXid: '',
      rules: {
        listedGoodsId: [
          { required: true, message: '请填写您的商品挂牌号', trigger: 'blur' }
        ],
        qq: [
          { required: false, message: '请填写您的联系方式', trigger: 'blur' }
        ]
      },
      res1: {
        code: '',
        msg: ''
      }
    }
  },
  created () {
    this.isGood()
    this.isLogin()
    // eslint-disable-next-line no-unused-expressions
    this.getRequest('/hang/getSellerHangList', this.params)
      .then((response) => {
        for (let i in response.data.data.hangList) {
          response.data.data.hangList[i].createDate = this.dateFormat(response.data.data.hangList[i].createDate)
        }
        console.log(response.data)
        this.tableData = response.data.data.hangList
      })
      .catch(function (error) {
        console.log(error)
      })
    this.getRequest('/hang/getBuyerHangList', this.params2)
      .then((response) => {
        for (let i in response.data.data.hangList) {
          response.data.data.hangList[i].createDate = this.dateFormat(response.data.data.hangList[i].createDate)
        }
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
    ...mapState(['goodInfo', 'userInfo']),
    onSubmit () {
      console.log('submit!')
    },
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    },
    buy (row) {
      if (this.userInfo.userId === row.supplier) {
        this.$alert('不可以购买自己挂牌的商品哦~', '执行结果', {
          confirmButtonText: '我知道了'
        })
        return false
      } else {
        this.DATA.listedGoodsId = row.listedGoodsId
        this.DATA.status = 1
        this.loadGood(this.DATA)
        this.$router.push({
          path: '/Product',
          name: 'Product'
        })
      }
    },
    success () {
      this.dialogFormVisible = false
      //  alert("议价单已提交！")
    },
    chat (row, tableData1) {
      if (this.userInfo.userId === row.supplier) {
        this.$alert('你确定要联系自己吗~', '执行结果', {
          confirmButtonText: '不联系了'
        })
        return false
      } else {
        this.dialogFormVisible = true
        this.LXid = row.supplier
      }
    },
    commit (formName) {
      if (this.form.listedGoodsId === '') {
        return false
      } else {
        this.DATA1.sender = this.userInfo.userId
        this.DATA1.receiver = this.LXid
        this.DATA1.title = '有货提醒'
        this.DATA1.type = '提醒'
        if (this.form.qq === '') {
          this.DATA1.content = '您可以搜索挂牌单号：' + this.form.listedGoodsId + '了解详情'
        } else {
          this.DATA1.content = '您可以搜索挂牌单号：' + this.form.listedGoodsId + '了解详情;我的联系方式为：' + this.form.qq
        }
        console.log(this.DATA1)
        this.postRequest('/message/sendMessage', this.DATA1).then((res) => {
          console.log(res.data)
          this.res1 = res.data
          if (this.res1.code === '1') {
            this.dialogFormVisible = false
            this.$alert('联系成功!', '执行结果', {
              confirmButtonText: '确定'
            })
          } else {
            this.$alert('联系失败！', '执行结果', {
              confirmButtonText: '确定'
            })
            return false
          }
        })
      }
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
  max-width: 1200px;
}
.content {
  width: 1008px;
  margin: 0px auto;
}

</style>
