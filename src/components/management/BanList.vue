<template>
<div class="address-box">
  <el-table
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column
      prop="username"
      label="用户名"
      width="150">
    </el-table-column>
    <el-table-column
      prop="phone"
      label="手机号"
      width="150">
    </el-table-column>
    <el-table-column
      prop="email"
      label="邮箱"
      width="150">
    </el-table-column>
     <el-table-column
      prop="password"
      label="登陆密码"
      width="150">
    </el-table-column>
    <el-table-column
      prop="account"
      label="绑定账户"
      width="150">
    </el-table-column>
    <el-table-column
      prop="other"
      label="企业名称"
      width="120">
    </el-table-column>
    <el-table-column
      prop="addr"
      label="地址"
      width="120">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="160">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small">解除封禁</el-button>
        <el-button type="text" size="small">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</div>
</template>

<script>
  export default {
    methods: {
      handleClick(row) {
        console.log(row);
      }
    },

    data() {
      return {
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
  border-radius: 5px;
  box-shadow: 0px 0px 10px #545c64;
}
</style>