<template>
  <div>
    <div class="address-box">
      <div class="container">
        <div class="block">
          <div style="height: 20px;"></div>
          <el-date-picker v-model="value" value-format="yyyy-MM-dd HH:mm:ss" type="daterange" align="right" @change="split()"
            unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions"
            >
          </el-date-picker>
          <div style="height: 10px;"></div>
        </div>
        <div class="table">
          <el-table :data="tableData.slice((pageData.currentPage-1)*pageData.pagesize,pageData.currentPage*pageData.pagesize)" width="100%" max-height="380">
          <!-- <el-table :data="tableData" width="100%" max-height="380"> -->
            <el-table-column prop="createDate" label="时间" width="250">
            </el-table-column>
            <el-table-column prop="tradeType" label="交易类型" width="150">
            </el-table-column>
            <el-table-column prop="money" label="金额" width="150">
            </el-table-column>
            <el-table-column prop="balance" label="余额" width="150">
            </el-table-column>
            <el-table-column prop="tradeWayName" label="支付方式" width="250">
            </el-table-column>
            <el-table-column prop="tradeId" label="交易单号" width="100">
              <template slot-scope="scope">
                <el-button @click.native.prevent="deleteRow(scope.row.tradeId)" type="text" size="small">
                  {{scope.row.tradeId}}
                </el-button>
              </template>
            </el-table-column>

          </el-table>
          <div class="block">
            <el-pagination :page-size="10" :pager-count="6" layout="prev, pager, next" :total="pageData.total" @current-change="current_change">
            </el-pagination>
          </div>
        </div>

      </div>
    </div>
  </div>

</template>

<script>
import store from '@/vuex/store'
import {
  mapState,
  mapActions
} from 'vuex'
export default {
  data () {
    return {
      formData: {},
      info: {},
      tableData: [],
      DateData: [],
      unrepearDate: [],
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
      value: [],
      value1: [],
      params: {
        userId: ''
      },
      StartTime: '',
      EndTime: '',
      pageData: {
        total: 0,
        pagesize: 6,
        currentPage: 1
      }
    }
  },
  created () {
    this.isLogin()
    this.params.userId = this.userInfo.userId
    console.log(this.userInfo.userId)
    // this.params.userId=this.userInfo.userId
  },
  computed: {
    ...mapState(['userInfo'])
  },

  mounted () {
    console.log('发起请求之前')
    console.log(this.params.userId)
    this.getRequest('/mine/getBill', this.params)
      .then(response => {
        console.log(response)
        this.unrepearDate = response.data.data.billList
        this.pageData.total = response.data.data.total
        for (var i = 0; i < this.unrepearDate.length; i++) {
          if (this.unrepearDate[i].drcrflg === 1) { this.unrepearDate[i].money = '-' + this.unrepearDate[i].money } else if (this.unrepearDate[i].drcrflg === 2) { this.unrepearDate[i].money = '+' + this.unrepearDate[i].money }
          switch (this.unrepearDate[i].tradeType) {
            case 1:
              this.unrepearDate[i].tradeType = '提现'
              break
            case 2:
              this.unrepearDate[i].tradeType = '充值'
              break
            case 3:
              this.unrepearDate[i].tradeType = '货款'
              break
            case 4:
              this.unrepearDate[i].tradeType = '保证金'
              break
            case 5:
              this.unrepearDate[i].tradeType = '手续费'
              break
            default:
              break
          }
        }
        this.tableData = this.unrepearDate
      })
      .catch(function (error) {
        console.log(error)
      })
  },

  methods: {
    ...mapActions(['isLogin']),
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
    },
    split () {
      this.DateData = []
      this.StartTime = this.value[0]
      this.EndTime = this.value[1]
      console.log(this.StartTime)
      console.log(this.EndTime)
      for (var i = 0; i < this.unrepearDate.length; i++) {
        var startTime = new Date(Date.parse(this.StartTime))
        var endTime = new Date(Date.parse(this.EndTime))
        var nowTime = new Date(Date.parse(this.unrepearDate[i].createDate))
        if (nowTime >= startTime && nowTime <= endTime) {
          console.log(startTime)
          console.log(nowTime)
          console.log(endTime)
          this.DateData.push(this.unrepearDate[i])
        }
      }
      this.tableData = []
      this.tableData = this.DateData
      this.pageData.total = this.DateData.length
      console.log('this.pageData.total')
      console.log(this.pageData.total)
      console.log('this.pageData.currentPage')
      console.log(this.pageData.currentPage)
    },
    deleteRow (index, rows) {
      rows.splice(index, 1)
    },
    current_change: function (currentPage) {
      console.log('currentPage')
      console.log(currentPage)
      this.pageData.currentPage = currentPage
    }
  },
  store
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

  .address-action span {
    margin-left: 15px;
    font-size: 14px;
    color: #2d8cf0;
    cursor: pointer;
  }

  .table {
    margin: auto;
    display: block;
  }

  .container {
    display: block;
    min-height: 275px;
    width: 100%;
    background-color: #F6F6F6;
    margin: auto;
  }

  p {
    display: inline-block;
  }
</style>
