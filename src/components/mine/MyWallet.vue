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
            <el-button @click="Rechange()" type="primary" round >余额充值</el-button>
            <el-button @click="Withdraw()" type="success" round >零钱提现</el-button>
        </div>
      </div>
    </div>
    <div class="address-box">
      <div class="address-header">
        <span>我的账单</span>
      </div>
  <div class="container">
    <div>
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
                width="150">
              </el-table-column>
              <el-table-column

                prop="income"
                label="收入"
                width="120">
              </el-table-column>
              <el-table-column
                prop="expense"
                label="支出"
                width="120">
              </el-table-column>
              <el-table-column
                prop="surplus"
                label="结余"
                width="120">
              </el-table-column>
              <el-table-column
                prop="related_member"
                label="相关会员"
                width="120">
              </el-table-column>
              <el-table-column
                prop="odd_number"
                label="业务单号"
                width="150">
              </el-table-column>
              <el-table-column
                prop="remark"
                label="备注"
              >
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
      tableData:[{
          date:'2019-05-03 22:00:00',
          income:'1000.00',
          expense:'0.00',
          surplus:'20000.00',
          related_member:'李先生',
          odd_number:'0700001',
          remark:'结算货款'
        }]

    };
  },
  methods: {
  	Rechange() {
      this.$router.push({
          path: '/Mine/Rechange',
          name: 'Rechange',
          params: {
          username: this.$route.params.username,
          }
      })
  	},
	Withdraw() {
    this.$router.push({
        path: '/Mine/Withdraw',
        name: 'Withdraw',
        params: {
        username: this.$route.params.username,
        }
    })
	}
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
