<template>
  <div>

    <div class="search-nav">
      <div class="search-nav-container">
        <ul>
          <li style="color:white">交易消息列表</li>
        </ul>
      </div>
    </div>

    <div>
      <el-table
        :data="tableData"
        style="width: 100%"
        :row-class-name="tableRowClassName">
        <el-table-column
          fixed
          prop="createDate"
          label="消息接收时间"
          align="center">
        </el-table-column>
        <el-table-column
          prop="messageId"
          label="消息ID"
          align="center">
        </el-table-column>
        <el-table-column
          prop="senderName"
          label="消息发送者姓名"
          align="center">
        </el-table-column>
        <el-table-column
          prop="type"
          label="消息类型"
          align="center">
        </el-table-column>
        <el-table-column
          prop="title"
          label="消息标题"
          align="center">
        </el-table-column>
        <el-table-column
          prop="content"
          label="消息内容"
          align="center">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button @click="look(scope.row,scope.$index,tableData)" type="text" size="small">查看</el-button>
            <el-button @click="del(scope.row,scope.$index,tableData)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

    </div>

  </div>
</template>

<script>
import store from '@/vuex/store'
import { mapState, mapActions } from 'vuex'
export default {
  name: 'Business',
  data () {
    return {
      tableData: [
      ],
      params: {
        userId: ''
      },
      params1: {
        userId: '',
        messageId: ''
      },
      res1: {
        code: '',
        msg: ''
      }
    }
  },
  computed: {
    ...mapState(['goodInfo']),
    ...mapState(['userInfo'])
  },
  created () {
    this.isLogin()
    this.params.userId = this.userInfo.userId
    this.getRequest('/message/getMessageList', this.params)
      .then((response) => {
        console.log(response.data)
        this.tableData = response.data.data.messageList
      })
      .catch(function (error) {
        console.log(error)
      })
  },
  methods: {
    ...mapActions(['goodOut', 'isGood', 'isLogin']),
    tableRowClassName ({row, rowIndex}) {
      if (rowIndex === 1 || rowIndex === 3) {
        return 'warning-row'
      } else if (rowIndex === 2 || rowIndex === 0) {
        return 'success-row'
      }
      return ''
    },
    look (row) {
      this.$router.push({
        path: '/Mine/MyTrading',
        name: 'MyTrading',
        params: {
          // username: this.$route.params.username,
          red: 'MT'
        }
      })
    },
    del (row, index, tableData) {
      console.log(row)
      console.log(this.userInfo.userId)
      this.params1.userId = this.userInfo.userId
      this.params1.messageId = row.messageId
      console.log(this.parmas1)
      this.postRequest('/message/deleteMessage', this.params1).then((res) => {
        console.log(res.data)
        this.res1 = res.data
        if (this.res1.code === 1) {
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
    // chat () {
    //   this.$prompt('请输入您的回复内容', '消息回复', {
    //     confirmButtonText: '确定',
    //     cancelButtonText: '取消'
    //   }).then(({value}) => {
    //     this.$message({
    //       type: 'success',
    //       message: '内容是: ' + value
    //     })
    //   }).catch(() => {
    //     this.$message({
    //       type: 'info',
    //       message: '取消输入'
    //     })
    //   })
    // }

  },
  store
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
