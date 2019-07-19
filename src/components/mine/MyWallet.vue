<template>
  <div>
    <div class="address-box" >
      <div class="address-header" >
        <span >钱包余额</span>
      </div>
      <div class="address-content" >
        <div>
            <p style="font-size:50px">￥8000</p>
        </div>
        <div style="margin-left:600px;margin-top:70px">
            <el-button type="primary" round>余额充值</el-button>
            <el-button type="success" round>零钱提现</el-button>
        </div>
      </div>
    </div>
    <div class="address-box">
      <div class="address-header">
        <span>我的账单</span>
      </div>
  <el-table
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column
      prop="date"
      label="账单日期"
      width="200">
    </el-table-column>
    <el-table-column
      prop="type"
      label="账单类型"
      width="200">
    </el-table-column>

    <el-table-column
      prop="price"
      label="账单金额"
      width="200">
    </el-table-column>
    <el-table-column
      prop="other"
      label="余额"
      width="212">
    </el-table-column>
    <el-table-column
      label="操作"
      width="200">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      formData: {
      },
      info: {},
    };
  },
};
</script>

<style scoped>
.address-box {
  padding: 15px;
  margin: 15px;
  border-radius: 5px;
  box-shadow: 0px 0px 10px #545c64;
}
.address-header {
  height: 35px;
  display: flex;
  justify-content: space-between;
  color: #232323;
  font-size: 18px;
}
.address-content {
  display: flex;
  text-align: left;
  font-size: 14px;
}
.address-content-title {
  color: #999;
}
.address-action span{
  margin-left: 15px;
  font-size: 14px;
  color: #2d8cf0;
  cursor: pointer;
}
</style>
