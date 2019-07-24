<template>
  <div>

    <div class="search-nav">
      <div class="search-nav-container">
        <ul>
          <li style="color:white">议价/联系消息列表</li>
        </ul>
      </div>
    </div>

    <div>
      <el-table
        :data="tableData"
        height="300"
        style="width: 100%"
        :row-class-name="tableRowClassName">
        <el-table-column
          fixed
          prop="date"
          label="消息接收时间"
          width="200">
        </el-table-column>
        <el-table-column
          prop="type"
          label="消息类型"
          width="150">
        </el-table-column>
        <el-table-column
          prop="title"
          label="消息标题"
          width="150">
        </el-table-column>
        <el-table-column
          prop="content"
          width="450"
          label="消息内容">
        </el-table-column>
        <el-table-column
          prop="state"
          label="消息状态">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="100">
          <template>
            <el-button type="text" size="small" @click="chat()">回复</el-button>
            <el-button type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

    </div>

    <div class="search-nav" style="margin-top:50px">
      <div class="search-nav-container">
        <ul>
          <li style="color:white">订单/合同/交收单消息列表</li>
        </ul>
      </div>
    </div>

    <div>
      <el-table
        :data="tableData1"
        height="300"
        style="width: 100%"
        :row-class-name="tableRowClassName">
        <el-table-column
          fixed
          prop="date"
          label="消息接收时间"
          width="200">
        </el-table-column>
        <el-table-column
          prop="type"
          label="消息类型"
          width="150">
        </el-table-column>
        <el-table-column
          prop="type2"
          label="交易类型">
        </el-table-column>
        <el-table-column
          prop="number"
          label="有关商品挂牌号">
        </el-table-column>
        <el-table-column
          prop="state"
          label="消息状态">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="100">
          <template>
            <el-button type="text" size="small" @click="look()">查看</el-button>
          </template>
        </el-table-column>
      </el-table>

    </div>

  </div>
</template>

<script>
export default {
  name: 'Business',
  methods: {
    tableRowClassName ({row, rowIndex}) {
      if (rowIndex === 1 || rowIndex === 3) {
        return 'warning-row'
      } else if (rowIndex === 2 || rowIndex === 0) {
        return 'success-row'
      }
      return ''
    },
    look () {
      this.$router.push({
        path: '/Order',
        name: 'Order',
        params: {
          username: this.$route.params.username,
          type: 'T002'
        }
      })
    },
    chat () {
      this.$prompt('请输入您的回复内容', '消息回复', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({value}) => {
        this.$message({
          type: 'success',
          message: '内容是: ' + value
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        })
      })
    }

  },

  data () {
    return {
      tableData: [{
        date: '2019/05/02  15：30',
        type: '议价消息',
        title: '',
        state: '未回复'
      }, {
        date: '2019-07-14  16：20',
        type: '议价消息',
        title: '',
        state: '已回复'
      }, {
        date: '2019-07-14  18：21',
        type: '联系消息',
        title: '他有货',
        content: '他的商品挂牌单号：G4564554，您可以搜索查看商品详情',
        state: '未回复'
      }, {
        date: '2019-07-14  18：21',
        type: '联系消息',
        title: '他有货',
        content: '他的商品挂牌单号：G4564554，您可以搜索查看商品详情',
        state: '未回复'
      },
      {
        date: '2019/05/02  15：30',
        type: '议价消息',
        title: '',
        state: '未回复'
      }
      ],
      tableData1: [{
        date: '2019/05/02  15：30',
        type: '订单确认',
        type2: '售出',
        number: 'D45646546',
        state: '未确认'
      }, {
        date: '2019-07-14  16：20',
        type: '合同确认',
        type2: '售出',
        number: 'H879898',
        state: '已确认'
      }, {
        date: '2019-07-14  18：21',
        type: '交收单确认',
        type2: '采购',
        number: 'Q4564654',
        state: '未确认'
      }, {
        date: '2019/05/02  15：30',
        type: '订单确认',
        type2: '采购',
        number: 'D45646546',
        state: '未确认'
      }
      ]
    }
  }
}
</script>

<style scoped>
  .search-nav {
    width: 100%;
    height: 64px;
    margin-top: 20px;
    border-bottom: 7px solid #003E3E;
  }

  .search-nav-container {
    width: 80%;
    min-width: 1000px;
    height: 64px;
    margin: 0px auto;
    position: relative;
  }

  .search-nav-container-90 {
    width: 90%;
  }

  .search-nav-container ul {
    margin: 0px;
    padding-left: 0px;
    list-style: none;

  }

  .search-nav-container li {
    cursor: pointer;
    margin-left: 30px;
    line-height: 64px;
    color: black;
    font-size: 25px;
    /*font-weight: bold;*/
    float: left;
  }

  .el-button btn {
    cursor: pointer;
    margin-left: 30px;
    line-height: 64px;
    color: black;
    font-size: 25px;
    /*font-weight: bold;*/
    float: left;
  }

  .search-nav-container a {
    color: black;
    text-decoration: none;
  }

  .search-nav-container li:first-child {
    padding: 0px 38px;
    background: #003E3E;
    margin: 0px;
    color: #fff;
  }

  .container {
    padding-top: 15px;
    margin: 0px auto;
    margin-bottom: 15px;
    width: 410px;
  }

</style>
