<template>
<div class="address-box">
  <el-table
    :data="tableData"
    height="530"
    border
    style="width: 100%">
    <el-table-column
      prop="id"
      label="用户Id"
      align="center">
    </el-table-column>
    <el-table-column
      prop="userName"
      label="用户名"
      align="center">
    </el-table-column>
    <el-table-column
      prop="phone"
      label="手机号"
      align="center">
    </el-table-column>
    <el-table-column
      prop="email"
      label="邮箱"
      align="center">
    </el-table-column>
    <el-table-column
      prop="companyName"
      label="企业名称"
      align="center">
    </el-table-column>
    <el-table-column
      prop="address"
      label="地址"
      align="center">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      align="center"
      width="120">
      <template slot-scope="scope">
        <el-button @click="ban(scope.row,scope.$index,tableData)" type="text" size="small">封禁</el-button>
        <!-- <el-button @click="del(scope.row,scope.$index,tableData)" type="text" size="small">删除</el-button> -->
      </template>
    </el-table-column>
  </el-table>
</div>
</template>

<script>
export default {

  data () {
    return {
      tableData: [],
      parmas: {
        id: '',
        ifBan: ''
      },
      parmas1: {
        id: ''
      },
      res1: {
        code: '',
        msg: ''
      }
    }
  },

  created () {
    this.getRequest('/user/getUserList')
      .then((response) => {
        console.log(response.data.data)
        this.tableData = response.data.data.userList
      })
      .catch(function (error) {
        console.log(error)
      })
  },
  methods: {
    ban (row, index, tableData) {
      this.parmas.id = row.id
      this.parmas.ifBan = 1
      console.log(this.parmas)
      this.postRequest('/user/banUser', this.parmas).then((res) => {
        console.log(res.data)
        this.res1 = res.data
        if (this.res1.code === '1') {
          this.$alert('封禁成功！', '执行结果', {
            confirmButtonText: '确定'
          })
          tableData.splice(index, 1)
        } else {
          this.$alert('封禁失败！', '执行结果', {
            confirmButtonText: '确定'
          })
          return false
        }
      })
    },
    del (row, index, tableData) {
      this.parmas1.id = row.id
      console.log(this.parmas1)
      this.postRequest('/user/deleteUser', this.parmas1).then((res) => {
        console.log(res.data)
        this.res1 = res.data
        if (this.res1.code === '1') {
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
