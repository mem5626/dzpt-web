<template>
<div class="address-box">
  <el-table
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column
      prop="date"
      label="加入进货单日期"
      width="150">
    </el-table-column>
    <el-table-column
      prop="product"
      label="商品名称"
      width="150">
    </el-table-column>
     <el-table-column
      prop="number"
      label="数量"
      width="150">
    </el-table-column>
    <el-table-column
      prop="price"
      label="金额"
      width="150">
    </el-table-column>
    <el-table-column
      prop="other"
      label="卖家"
      width="120">
    </el-table-column>
    <el-table-column
      prop="addr"
      label="卖家地址"
      width="200">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="150">
      <template >
        <el-button @click="H()" type="text" size="small">去购买</el-button>
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
      },
      H(){
      this.$router.push({  
          path: '/Product',   
          name: 'Product',  
          params: {   
          username: this.$route.params.username,
          }
      })
     },
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