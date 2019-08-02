<template>
<div>
<div class="search">
  <!-- <el-form :inline="true" :model="formInline" class="demo-form-inline">
  <el-form-item label="挂牌单号：">
    <el-input v-model="formInline.user" placeholder="请输入挂牌单号"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="onSubmit()">查询</el-button>
  </el-form-item>
</el-form> -->
</div>
<div class="address-box">
  <el-table
    :data="tableData"
    height="530"
    border
    style="width: 100%">
    <el-table-column
      prop="createDate"
      label="交易日期"
      align="center">
    </el-table-column>
    <el-table-column
      prop="id"
      label="交易id"
      align="center">
    </el-table-column>
    <el-table-column
      prop="buyerName"
      label="买方"
      align="center">
    </el-table-column>
    <el-table-column
      prop="sellerName"
      label="卖方"
      align="center">
    </el-table-column>
    <el-table-column
      prop="status"
      label="所处交易阶段"
      align="center">
    </el-table-column>
    <el-table-column
      prop="listedGoodsId"
      label="挂牌单号"
      align="center">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      align="center"
      width="120">
      <template slot-scope="scope">
        <el-button @click="H(scope.row)" type="text" size="small">查看</el-button>
        <!-- <el-button @click="del(scope.row,scope.$index,tableData)" type="text" size="small">删除</el-button> -->
      </template>
    </el-table-column>
  </el-table>
</div>
  <el-dialog
    title="议价单"
    :visible.sync="dialogVisible"
    width="30%">
    <p>交易号：{{negotiateData.tradingId}}</p>
    <p>议价单号：{{negotiateData.negotiateId}}</p>
    <p>挂牌商品号：{{negotiateData.listedGoodsId}}</p>
    <p>商品名称：{{negotiateData.goodsName}}</p>
    <p>买家：{{negotiateData.buyer}}</p>
    <p>原价（单价）：{{negotiateData.price}}</p>
    <p>议价（单价）：{{negotiateData.newprice}}</p>
    <p>时间：{{negotiateData.createDate}}</p>
    <span slot="footer" class="dialog-footer">
      <el-button type="danger" @click="refuse()">拒 绝</el-button>
      <el-button type="primary" @click="affirm()">同 意</el-button>
    </span>
  </el-dialog>
</div>
</template>

<script>
import store from '@/vuex/store'
import { mapMutations, mapActions, mapState } from 'vuex'
export default {
  computed: {
    ...mapState(['userInfo'])
  },
  data () {
    return {
      formInline: {
        user: '',
        region: ''
      },
      tableData: [],
      params: {
        userId: ''
      },
      goodData: {
        listedGoodsId: ''
      },
      info: {
        listedGoodsId: '',
        tradingId: '',
        status: '',
        createDate: ''
      },
      res1: {
        code: '',
        msg: ''
      },
      parmas1: {
        userId: '',
        tradingId: ''
      },
      negotiateData: {
        tradingId: '',
        negotiateId: '',
        listedGoodsId: '',
        goodsName: '',
        buyer: '',
        price: '',
        newprice: '',
        createDate: ''
      },
      dialogVisible: false,
      affirmData: {
        tradingId: '',
        negotiateId: ''
      },
      DATA: {
        id: ''
      }
    }
  },
  created () {
    this.isLogin()
    this.params.userId = this.userInfo.userId
    console.log(this.params)
    this.getRequest('/mine/getMyTrading', this.params)
      .then((response) => {
        console.log(response.data.data.tradingList)
        for (const i in response.data.data.tradingList) {
          response.data.data.tradingList[i].createDate = this.dateFormat(response.data.data.tradingList[i].createDate)
        }
        console.log(response.data.data.tradingList)
        console.log(response.data)
        this.tableData = response.data.data.tradingList
        for (const i in this.tableData) {
          if (this.tableData[i].status === 0) {
            this.tableData[i].status = '议价'
          } else if (this.tableData[i].status === 1) {
            this.tableData[i].status = '订单'
          } else if (this.tableData[i].status === 2) {
            this.tableData[i].status = '合同'
          } else if (this.tableData[i].status === 3) {
            this.tableData[i].status = '交收单'
          } else if (this.tableData[i].status === -1) {
            this.tableData[i].status = '交易已取消'
          }
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  },
  methods: {
    ...mapMutations(['SET_GOODS_INFO']),
    ...mapActions(['loadGood', 'isLogin']),
    ...mapState(['goodInfo']),

    handleClick (row) {
      console.log(row)
    },
    get () {
      this.params.userId = this.userInfo.userId
      console.log(this.params)
      this.getRequest('/mine/getMyTrading', this.params)
        .then((response) => {
          console.log(response.data.data.tradingList)
          for (const i in response.data.data.tradingList) {
            response.data.data.tradingList[i].createDate = this.dateFormat(response.data.data.tradingList[i].createDate)
          }
          console.log(response.data.data.tradingList)
          console.log(response.data)
          this.tableData = response.data.data.tradingList
          for (const i in this.tableData) {
            if (this.tableData[i].status === 0) {
              this.tableData[i].status = '议价'
            } else if (this.tableData[i].status === 1) {
              this.tableData[i].status = '订单'
            } else if (this.tableData[i].status === 2) {
              this.tableData[i].status = '合同'
            } else if (this.tableData[i].status === 3) {
              this.tableData[i].status = '交收单'
            } else if (this.tableData[i].status === -1) {
              this.tableData[i].status = '交易已取消'
            }
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    affirm () {
      this.affirmData.tradingId = this.negotiateData.tradingId
      this.affirmData.negotiateId = this.negotiateData.negotiateId
      console.log(this.affirmData)
      this.postRequest('/message/affirm', this.affirmData).then((res) => {
        console.log(res.data)
        this.res1 = res.data
        if (this.res1.code === '1') {
          this.$alert('已同意', '执行结果', {
            confirmButtonText: '确定',
            callback: action => {
              this.dialogVisible = false
              this.get()
            }
          })
        } else {
          this.$alert('操作失败！', '执行结果', {
            confirmButtonText: '确定'
          })
          return false
        }
      })
    },
    refuse () {
      this.affirmData.tradingId = this.negotiateData.tradingId
      this.affirmData.negotiateId = this.negotiateData.negotiateId
      this.postRequest('/message/refuse', this.affirmData).then((res) => {
        console.log(res.data)
        this.res1 = res.data
        if (this.res1.code === '1') {
          this.$alert('已拒绝', '执行结果', {
            confirmButtonText: '确定',
            callback: action => {
              this.dialogVisible = false
              this.get()
            }
          })
        } else {
          this.$alert('操作失败！', '执行结果', {
            confirmButtonText: '确定'
          })
          return false
        }
      })
    },
    H (row) {
      if (row.status === '议价') {
        // this.$alert('议价中，还未生成订单~', '执行结果', {
        //   confirmButtonText: '确定',
        //   callback: action => {
        //     return false
        //   }
        // })
        console.log(row.id)
        this.DATA.id = row.id
        this.getRequest('/message/getNegotiate', this.DATA)
          .then((response) => {
            console.log(response.data)
            this.negotiateData.price = response.data.data.price
            this.negotiateData.newprice = response.data.data.newprice
            this.negotiateData.negotiateId = response.data.data.negotiateId
            this.negotiateData.goodsName = response.data.data.goodsName
            this.negotiateData.createDate = row.createDate
            this.negotiateData.buyer = row.buyerName
            this.negotiateData.tradingId = row.id
            this.negotiateData.listedGoodsId = row.listedGoodsId
          })
          .catch(function (error) {
            console.log(error)
          })
        this.dialogVisible = true
      } else {
        this.info.listedGoodsId = row.listedGoodsId
        this.info.tradingId = row.id
        this.info.status = row.status
        this.info.createDate = row.createDate
        this.loadGood(this.info)
        console.log(this.info)
        this.$router.push({
          path: '/Order',
          name: 'Order',
          params: {

          }
        })
      }
    }
    // del (row, index, tableData) {
    //   this.parmas1.userId = this.userInfo.userId
    //   this.parmas1.tradingId = row.tradingId
    //   console.log(this.parmas1)
    //   this.postRequest('/mine/daleteMyTrading', this.parmas1).then((res) => {
    //     console.log(res.data)
    //     this.res1 = res.data
    //     if (this.res1.code === 1) {
    //       this.$alert('删除成功！', '执行结果', {
    //         confirmButtonText: '确定'
    //       })
    //       tableData.splice(index, 1)
    //     } else {
    //       this.$alert('删除失败！', '执行结果', {
    //         confirmButtonText: '确定'
    //       })
    //       return false
    //     }
    //   })
    // }
  },
  store
}
</script>

<style>
.address-box {
  padding: 15px;
  margin: 15px;
  margin-top: 5px;
  border-radius: 5px;
  box-shadow: 0px 0px 10px #545c64;
}
.search {
    margin-top: 20px;
}
</style>
