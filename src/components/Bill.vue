<template>
  <div class="container">
    <div>
          <!-- <el-menu
            :default-active="activeIndex2"
            class="el-menu-demo"
            mode="horizontal"
            @select="handleSelect"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#FFFAFA">
            <el-menu-item index="1" style="font-size:28px"><i class="el-icon-s-flag" style="heignt:30px"></i>我的挂牌</el-menu-item>
          </el-menu> -->
          <!-- style="width: 100%" -->
      </div>
      <div class="date">
        <p>日期></p>
        <el-date-picker>
        </el-date-picker>
        <p>-</p>
        <el-date-picker>
        </el-date-picker>
      </div>
      <div class="table">
          <el-table
              :data="tableData"
              width="100%"
              max-height="250">
              <el-table-column

                prop="date"
                label="挂牌日期"
                width="200">
              </el-table-column>
              <el-table-column

                prop="income"
                label="收入"
                width="150">
              </el-table-column>
              <el-table-column
                prop="expense"
                label="支出"
                width="150">
              </el-table-column>
              <el-table-column
                prop="surplus"
                label="结余"
                width="200">
              </el-table-column>
              <el-table-column
                prop="related_member"
                label="相关会员"
                width="150">
              </el-table-column>
              <el-table-column
                prop="odd_number"
                label="业务单号"
                width="150">
              </el-table-column>
              <el-table-column
                prop="remark"
                label="备注"
                width="150">
              </el-table-column>
            </el-table>
      </div>

    </div>

</template>

<script>
import Search from '@/components/Search3.vue'
export default {
  components: {
    Search
  },
  data () {
    return {
      tableData: [{
        date: '2019-05-03 22:00:00',
        income: '1000.00',
        expense: '0.00',
        surplus: '20000.00',
        related_member: '李先生',
        odd_number: '0700001',
        remark: '结算货款'
      }]
    }
  }
}
</script>

<style>
  .table{
    margin:auto;
    display: block;
  }
  .container {
    display: block;
    min-height: 300px;
    width:1150px ;
    background-color: #F6F6F6;
    margin:auto;
  }
  p{
    display: inline-block;
  }
</style>
