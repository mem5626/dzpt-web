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
      width="150">
    </el-table-column>
    <el-table-column
      prop="tradingId"
      label="交易id"
      width="150">
    </el-table-column>
    <el-table-column
      prop="buyer"
      label="买方"
      width="150">
    </el-table-column>
    <el-table-column
      prop="seller"
      label="卖方"
      width="150">
    </el-table-column>
    <el-table-column
      prop="status"
      label="所处交易阶段"
      width="150">
    </el-table-column>
    <el-table-column
      prop="listedGoodsId"
      label="挂牌单号"
      width="150">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="150">
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
        userName: ''
      },
      goodData: {
        listedGoodsId: ''
      }
    }
  },
  created () {
    this.isLogin()
    this.params.userName = this.userInfo.userName
    console.log(this.params)
    this.getRequest('/mine/getMyTrading', this.params)
      .then((response) => {
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
      this.loadGood(row)
      console.log(row.listedGoodsId)
      this.$router.push({
        path: '/Order',
        name: 'Order',
        params: {

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
