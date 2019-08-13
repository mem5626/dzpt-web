<template>
<div class="address-box">
  <el-table
    :data="tableData"
    style="width: 100%"
    >
    <el-table-column
      fixed
      prop="createDate"
      label="消息接收时间"
      width="150"
      align="center">
    </el-table-column>
    <el-table-column
      fixed
      prop="id"
      label="消息 ID"
      width="80"
      align="center">
    </el-table-column>
    <el-table-column
      prop="title"
      label="消息标题"
      width="150"
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
      align="center"
      width="150">
      <template slot-scope="scope">
        <el-button @click="up(scope.row,scope.$index,tableData)" type="text" size="small">编辑</el-button>
        <el-button @click="del(scope.row,scope.$index,tableData)" type="text" size="small">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-dialog title="修改已发布信息" :visible.sync="dialogFormVisible">
          <el-form :model="form" :inline="true" :rules="rules" :ref="form">
            <el-form-item label="消 息 I D" prop="id" :label-width="formLabelWidth">
              <el-input v-model="form.id" disabled=""  style="width:450px"></el-input>
            </el-form-item>
            <el-form-item label="消息标题"  prop="title" :label-width="formLabelWidth">
              <el-input v-model="form.title"  style="width:450px"></el-input>
            </el-form-item>
            <el-form-item label="消息内容" prop="content"  :label-width="formLabelWidth">
              <el-input type="textarea" v-model="form.content" autocomplete="off" style="width:450px"></el-input>
            </el-form-item>
        </el-form>
         <div slot="footer" class="dialog-footer">
           <el-button @click="resetForm('form')">取 消</el-button>
           <el-button type="primary" @click="commit()">确 定</el-button>
         </div>
       </el-dialog>
</div>
</template>

<script>
export default {
  name: 'Business',
  created () {
    this.getMsg()
  },
  data () {
    return {
      form: {
        id: '',
        title: '',
        content: ''
      },
      tableData: [
      ],
      parmas: {
        id: ''
      },
      parmas1: {
        id: '',
        title: '',
        content: ''
      },
      rules: {
        id: [
          { required: true, message: '必填项', trigger: 'blur' }
        ],
        title: [
          { required: true, message: '必填项', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '必填项', trigger: 'blur' }
        ]
      },
      dialogFormVisible: false
    }
  },
  methods: {
    getMsg () {
      this.getRequest('/message/getSystemMessage')
        .then((response) => {
          for (const i in response.data.data.messageList) {
            response.data.data.messageList[i].createDate = this.dateFormat(response.data.data.messageList[i].createDate)
          }
          console.log(response.data)
          this.tableData = response.data.data.messageList
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    del (row, index, tableData) {
      this.parmas.id = row.id
      console.log(this.parmas)
      this.postRequest('/message/deleteSystemMsg', this.parmas).then((res) => {
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
    },
    up (row, index, tableData) {
      this.form.id = row.id
      this.form.title = row.title
      this.form.content = row.content
      this.dialogFormVisible = true
    },
    commit () {
      this.parmas1.id = this.form.id
      this.parmas1.title = this.form.title
      this.parmas1.content = this.form.content
      console.log(this.parmas1)
      this.postRequest('/message/updateSystemMsg', this.parmas1).then((res) => {
        console.log(res.data)
        this.res1 = res.data
        if (this.res1.code === '1') {
          this.$alert('编辑成功！', '执行结果', {
            confirmButtonText: '确定',
            callback: action => {
              this.dialogFormVisible = false
              this.getMsg()
            }
          })
        } else {
          this.$alert('编辑失败！', '执行结果', {
            confirmButtonText: '确定'
          })
          return false
        }
      })
    },
    resetForm (formName) {
      this.dialogFormVisible = false
      this.$refs[formName].resetFields()
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
