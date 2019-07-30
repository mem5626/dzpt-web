<template>
<div>
<div class="search">
  <el-form :inline="true" :model="formInline" class="demo-form-inline">
  <el-form-item label="挂牌单号：">
    <el-input v-model="formInline.user" placeholder="请输入挂牌单号"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="onSubmit()">查询</el-button>
  </el-form-item>
</el-form>
</div>
<div class="address-box">
  <el-table
    :data="tableData"
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
      prop="buyer"
      label="买方"
      align="center">
    </el-table-column>
    <el-table-column
      prop="seller"
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
      width="120">
      <template slot-scope="scope">
        <el-button @click="H(scope.row)" type="text" size="small">查看</el-button>
        <el-button @click="del(scope.row,scope.$index,tableData)" type="text" size="small">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</div>
</div>
</template>

<script>
import Distpicker from 'v-distpicker'
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
        status: ''
      },
      res1: {
        code: '',
        msg: ''
      },
      parmas1: {
        userId: '',
        tradingId: ''
      }
    }
  },
  created () {
    this.isLogin()
    this.params.userId = this.userInfo.userId
    console.log(this.params)
    this.getRequest('/mine/getMyTrading', this.params)
      .then((response) => {
        for (let i in response.data.data.tradingList) {
          response.data.data.tradingList[i].createDate = this.dateFormat(response.data.data.tradingList[i].createDate)
        }
        console.log(response.data)
        this.tableData = response.data.data.tradingList
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
    H (row) {
      this.info.listedGoodsId = row.listedGoodsId
      this.info.tradingId = row.tradingId
      this.info.status = row.status
      this.loadGood(this.info)
      console.log(this.info)
      this.$router.push({
        path: '/Order',
        name: 'Order',
        params: {

        }
      })
    },
    del (row, index, tableData) {
      this.parmas1.userId = this.userInfo.userId
      this.parmas1.tradingId = row.tradingId
      console.log(this.parmas1)
      this.postRequest('/mine/daleteMyTrading', this.parmas1).then((res) => {
        console.log(res.data)
        this.res1 = res.data
        if (this.res1.code === 1) {
          this.$alert('删除成功！', '执行结果', {
            confirmButtonText: '确定'
          })
          tableData.splice(index, 1)
        } else {
          this.$alert('删除失败！', '执行结果', {
            confirmButtonText: '确定'
          })
          return false
        }
      })
    }
  },
  components: {
    Distpicker
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
