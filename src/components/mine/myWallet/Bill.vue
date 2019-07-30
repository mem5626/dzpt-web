<template>
  <div>
  <div class="address-box">
   <div class="container">
  <div class="block">
    <div style="height: 20px;"></div>
    <el-date-picker
      v-model="value"
      value-format="yyyy-MM-dd hh:mm:ss"
      type="daterange"
      align="right"
      unlink-panels
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      :picker-options="pickerOptions">
    </el-date-picker>
    <el-input  v-model="value"></el-input>
    <el-button @click="value1=split()"></el-button>
    <el-input  v-model="value1"></el-input>
     <div style="height: 10px;"></div>
  </div>
      <div class="table">
          <el-table
              :data="tableData"
              width="100%"
              max-height="380">
              <el-table-column
                prop="createDate"
                label="时间"
                width="160">
              </el-table-column>
              <el-table-column
                prop="money"
                label="金额"
                width="150">
              </el-table-column>
              <el-table-column
                prop="balance"
                label="余额"
                width="150">
              </el-table-column>
              <el-table-column
                prop="tradeWayName"
                label="支付方式"
                width="300">
              </el-table-column>
              <el-table-column
                prop="tradeId"
                label="交易单号"
                width="150">
              </el-table-column>
              <el-table-column
                prop="tradeType"
                label="支付类型">
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
      tableData:[],
      unrepearDate:[],
         pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        value: '',
        value1: [],
        params:{
          userId:'1'
        }

    }
  },

  created(){
    this.getRequest("/mine/getBill", this.params)
      .then(response => {
        console.log(response);
        this.unrepearDate = response.data.data.billList;
        for (var i = 0; i < this.unrepearDate.length; i++) {
          if(this.unrepearDate[i].drcrflg===1)
          this.unrepearDate[i].money='-'+this.unrepearDate[i].money
          else if(this.unrepearDate[i].drcrflg===2)
          this.unrepearDate[i].money='+'+this.unrepearDate[i].money
          switch (this.unrepearDate[i].tradeType){
            case 1:
              this.unrepearDate[i].tradeType='提现'
              break;
              case 2:
                this.unrepearDate[i].tradeType='充值'
                break;
                case 3:
                  this.unrepearDate[i].tradeType='货款'
                  break;
                  case 4:
                    this.unrepearDate[i].tradeType='保证金'
                    break;
                    case 5:
                      this.unrepearDate[i].tradeType='手续费'
                      break;
            default:
              break;
          }
        }
        this.tableData=this.unrepearDate
      })
      .catch(function(error) {
        console.log(error);
      });
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
	},
  split(){
    //this.value1=this.value.split(',')
    console.log(this.value.split(','))
  }

  },
};

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
