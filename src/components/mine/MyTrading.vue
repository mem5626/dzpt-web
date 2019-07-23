<template>
<div>
<div class="search">
  <el-form :inline="true" :model="formInline" class="demo-form-inline">
  <el-form-item label="挂牌单号：">
    <el-input v-model="formInline.user" placeholder="请输入挂牌单号"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="onSubmit">查询</el-button>
  </el-form-item>
</el-form>
</div>
<div class="address-box">
  <el-table
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column
      prop="date"
      label="交易日期"
      width="150">
    </el-table-column>
    <el-table-column
      prop="id"
      label="交易id"
      width="150">
    </el-table-column>

    <el-table-column
      prop="type"
      label="交易类型"
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
      prop="state"
      label="交易状态"
      width="150">
    </el-table-column>
    <el-table-column
      prop="number"
      label="挂牌单号"
      width="150">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="150">
      <template >
        <el-button @click="H()" type="text" size="small">查看</el-button>
        <el-button type="text" size="small">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</div>
</div>
</template>

<script>
  export default {
    methods: {
      handleClick(row) {
        console.log(row);
      },
      H(){
      this.$router.push({  
          path: '/Order',   
          name: 'Order',  
          params: {   
          username: this.$route.params.username,
          type: "T123"
          }
      })
     },
    },

    data() {
      return {
          formInline: {
          user: '',
          region: ''
        },
        tableData: [{
          date: '2019-05-02',

        }, {
          date: '2019-05-04',

        }, {
          date: '2019-05-01',

        }, {
          date: '2019-05-03',

        }]
      }
    }
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