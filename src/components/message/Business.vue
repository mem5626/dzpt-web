<template>
<div>
  <div class="jiaoyi-nav">
      <div class="jiaoyi-nav-container">
        <ul>
          <li v-if="this.count===0">
              交易消息列表
          </li>
          <li v-else>
              交易消息列表
              <el-badge :value=this.count />
          </li>

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
          prop="id"
          label="消息ID"
          align="center"
          width="80">
        </el-table-column>
        <el-table-column
          prop="senderName"
          label="消息发送者姓名"
          align="center">
        </el-table-column>
        <el-table-column
          prop="type"
          label="消息类型"
          align="center"
          width="80">
        </el-table-column>
        <el-table-column
          prop="title"
          label="消息标题"
          align="center">
        </el-table-column>
        <el-table-column
          prop="content"
          label="消息内容"
          align="center"
          width="350">
        </el-table-column>
        <el-table-column
          prop="isRead"
          label="消息状态"
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
  <el-dialog
    title="联系消息"
    :visible.sync="dialogVisible1"
    width="30%">
    <p>有货方：{{msgData.senderName}}</p>
    <p>消息类型：{{msgData.type}}</p>
    <p>消息标题：{{msgData.title}}</p>
    <p>消息内容：{{msgData.content}}</p>
    <p>时间：{{msgData.createDate}}</p>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="dialogVisible1=false">我知道了</el-button>
    </span>
  </el-dialog>
</div>
</template>

<style>
  .el-table .unread-row {
    background: rgb(247, 172, 122);
  }
  .el-table .success-row {
    background: #f0f9eb;
  }
.jiaoyi-nav {
    width: 100%;
    height: 64px;
    margin-top: 20px;
    border-bottom: 7px solid #003E3E;
  }

  .jiaoyi-nav-container {
    width: 80%;
    min-width: 1000px;
    height: 64px;
    margin: 0px auto;
    position: relative;
  }

  .jiaoyi-nav-container-90 {
    width: 90%;
  }

  .jiaoyi-nav-container ul {
    margin: 0px;
    padding-left: 0px;
    list-style: none;

  }

  .jiaoyi-nav-container li {
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

  .jiaoyi-nav-container a {
    color: black;
    text-decoration: none;
  }

  .jiaoyi-nav-container li:first-child {
    padding: 0px 38px;
    background: #003E3E;
    margin: 0px;
    color: #fff;
  }


  
</style>

<script>
import store from '@/vuex/store'
import { mapState, mapActions } from 'vuex'
  export default {
    name: 'Business',
    created () {
    this.count=0
    this.isLogin()
    this.params.userId = this.userInfo.userId
    this.getRequest('/message/getMessageList', this.params)
      .then((response) => {
        console.log('response.data')
        console.log(response.data)
        for (let i in response.data.data.messageList) {
          response.data.data.messageList[i].createDate = this.dateFormat(response.data.data.messageList[i].createDate)
          if(response.data.data.messageList[i].isRead)
          {
            response.data.data.messageList[i].isRead='已读'
          }else{
            this.count=this.count+1
            response.data.data.messageList[i].isRead='未读'
          }
        }
        this.tableData = response.data.data.messageList
        console.log(this.count)
      })
      .catch(function (error) {
        console.log(error)
      })

    
  },
    computed: {
    ...mapState(['goodInfo']),
    ...mapState(['userInfo'])
  },
    methods: {
      ...mapActions(['goodOut', 'isGood', 'isLogin']),
      tableRowClassName({row, rowIndex}) {
        if (row.isRead === '未读') {
          return 'unread-row';
        } else {
        }
      },
      isRead(){
      this.count=0
      this.isLogin()
      this.params.userId = this.userInfo.userId
      this.getRequest('/message/getMessageList', this.params)
      .then((response) => {
        console.log('response.data')
        console.log(response.data)
        for (let i in response.data.data.messageList) {
          response.data.data.messageList[i].createDate = this.dateFormat(response.data.data.messageList[i].createDate)
          if(response.data.data.messageList[i].isRead)
          {
            response.data.data.messageList[i].isRead='已读'
          }else{
            this.count=this.count+1
            response.data.data.messageList[i].isRead='未读'
          }
        }
        this.tableData = response.data.data.messageList
        console.log(this.count)
      })
      .catch(function (error) {
        console.log(error)
      })
    
    },
    look (row) {
      this.msg.messageId=row.id
      if(row.isRead==='未读'){
        this.postRequest('/message/setReadMessage', this.msg).then((res) => {
          console.log(res.data)
          this.res1 = res.data
         if (this.res1.code === '1') {
            if(row.type==='提醒'){
              this.msgData.type=row.type
              this.msgData.senderName=row.senderName
              this.msgData.title=row.title
              this.msgData.content=row.content
              this.msgData.createDate=row.createDate
              this.dialogVisible1=true
            }else{
              this.$router.push({
              path: '/Mine/MyTrading',
              name: 'MyTrading',
              params: {
                red: 'MT'
              }
            })
          }  
         }
        })
        this.isRead()
      }else{
        if(row.type==='提醒'){
              this.dialogVisible1=true
              
              this.msgData.type=row.type
              this.msgData.senderName=row.senderName
              this.msgData.title=row.title
              this.msgData.content=row.content
              this.msgData.createDate=row.createDate
              console.log('sqasqs'+this.msgData)
             
            }else{
              this.$router.push({
              path: '/Mine/MyTrading',
              name: 'MyTrading',
              params: {
                red: 'MT'
              }
            })
          }  
      }
    },
    del (row, index, tableData) {
      console.log(row)
      console.log(this.userInfo.userId)
      this.params1.userId = this.userInfo.userId
      this.params1.messageId = row.id
      console.log(this.params1)
      this.postRequest('/message/deleteMessage', this.params1).then((res) => {
        console.log(res.data)
        this.res1 = res.data
        if (this.res1.code === '1') {
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


    },
    data() {
      return {
        tableData: [],
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
      },
      count: 0,
      value: 0,
      msg: {
        messageId:''
      },
      msgData:{
        senderName:'',
        type:'',
        title:'',
        content:'',
        createDate:''
      },
      dialogVisible1:false
      }
    },
    store
  }
</script>