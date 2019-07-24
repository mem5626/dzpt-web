<template>
  <div>
  <div class="address-box">
   <div class="container">
  <div class="block">
    <div style="height: 20px;"></div>
    <el-date-picker
      v-model="value"
      type="daterange"
      align="right"
      unlink-panels
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      :picker-options="pickerOptions">
    </el-date-picker>
    <!-- <el-input v-model="value"></el-input> -->
     <div style="height: 10px;"></div>
  </div>
      <div class="table">
          <el-table
              :data="tableData"
              width="100%"
              max-height="380">
              <el-table-column

                prop="date"
                label="挂牌日期"
                width="160">
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
                width="150">
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
                label="备注">
              </el-table-column>
            </el-table>
      </div>

    </div>
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
      tableData: [{
        date: '2019-05-03 22:00:00',
        income: '1000.00',
        expense: '0.00',
        surplus: '20000.00',
        related_member: '李先生',
        odd_number: '0700001',
        remark: '结算货款'
      },
      {
        date: '2019-05-03 22:00:00',
        income: '1000.00',
        expense: '0.00',
        surplus: '20000.00',
        related_member: '李先生',
        odd_number: '0700001',
        remark: '结算货款'
      },
      {
        date: '2019-05-03 22:00:00',
        income: '1000.00',
        expense: '0.00',
        surplus: '20000.00',
        related_member: '李先生',
        odd_number: '0700001',
        remark: '结算货款'
      },
      {
        date: '2019-05-03 22:00:00',
        income: '1000.00',
        expense: '0.00',
        surplus: '20000.00',
        related_member: '李先生',
        odd_number: '0700001',
        remark: '结算货款'
      },
      {
        date: '2019-05-03 22:00:00',
        income: '1000.00',
        expense: '0.00',
        surplus: '20000.00',
        related_member: '李先生',
        odd_number: '0700001',
        remark: '结算货款'
      },
      {
        date: '2019-05-03 22:00:00',
        income: '1000.00',
        expense: '0.00',
        surplus: '20000.00',
        related_member: '李先生',
        odd_number: '0700001',
        remark: '结算货款'
      }],
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      value: ''

    }
  },
  methods: {
    Rechange () {
      this.$router.push({
        path: '/Mine/Rechange',
        name: 'Rechange',
        params: {
          username: this.$route.params.username
        }
      })
    },
    Withdraw () {
      this.$router.push({
        path: '/Mine/Withdraw',
        name: 'Withdraw',
        params: {
          username: this.$route.params.username
        }
      })
    }
  }
}
</script>

<style scoped>
.address-box {
  padding: 15px;
  margin: 15px;
  border-radius: 5px;

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
.table{
    margin:auto;
    display: block;
  }
  .container {
    display: block;
    min-height: 275px;
    width:100%;
    background-color: #F6F6F6;
    margin:auto;
  }
  p{
    display: inline-block;
  }

</style>
