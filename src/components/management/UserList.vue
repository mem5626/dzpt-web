<template>
<div class="address-box">
  <el-table
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column
      prop="id"
      label="用户Id"
      width="150">
    </el-table-column>
    <el-table-column
      prop="userName"
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
      prop="companyName"
      label="企业名称"
      width="120">
    </el-table-column>
    <el-table-column
      prop="address"
      label="地址"
      width="120">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="160">
      <template slot-scope="scope">
        <el-button @click="ban(scope.row,scope.$index,tableData)" type="text" size="small">封禁</el-button>
        <el-button @click="del(scope.row,scope.$index,tableData)" type="text" size="small">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</div>
</template>

<script>
  export default {

    data() {
      return {
        tableData: [],
      }
    },

    created() {
      this.axios.get('http://192.168.100.30/user/getUserList')
      .then(response => {
        console.log(response.data);
        this.tableData = response.data.data.userList;
      })
    },
    methods: {
      ban(row,index,tableData) {
        console.log(row);
        this.axios.post('http://192.168.100.30/user/banUser',{
              id: row.id,
              ifBan: '1'
        })
        .then(response => {
           console.log(response.data);
           if(response.data.code=='1'){
              alert('封禁成功！');
              tableData.splice(index, 1);
            }
              else{
                alert('封禁失败！');
                return false
              }
         })
      },
      del(row,index,tableData) {
        console.log(row);
        this.axios.post('http://192.168.100.30/user/deleteUser',{
            userName: row.userName,
        })
        .then((response) => {
            console.log(response.data);
            if(response.data.code=='1'){
                alert('删除成功！');
                tableData.splice(index, 1);
            }
            else{
                alert('删除失败！');
                return false
            }
        })

      }
    },
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
