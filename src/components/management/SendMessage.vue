<template>
<div class="address-box">
    <div class="freeback-title">
                <h1>发布消息</h1>
                <h2>请您填写消息内容进行发送</h2>
              </div>
<el-form ref="form" :model="form" :rules="rules"  label-width="80px">
  <el-form-item label="消息标题" prop="title">
    <el-input v-model="form.title"></el-input>
  </el-form-item>
  <el-form-item label="消息内容" prop="content">
    <el-input type="textarea" v-model="form.content"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="onSubmit('form')">立即发布</el-button>
    <el-button @click="resetForm('form')">取消</el-button>
  </el-form-item>
</el-form>
</div>
</template>

<script>
export default {

  data () {
    return {
      tableData: [],
      parmas: {
        // sender: '',
        // type: '',
        title: '',
        content: ''
      },
      res1: {
        code: '',
        msg: ''
      },
      form: {
        title: '',
        content: ''
      },
      rules: {
        title: [
          { required: true, message: '请填写标题', trigger: 'blur' }
        ],

        content: [
          { required: true, message: '请填写内容', trigger: 'change' }
        ]
      }
    }
  },

  created () {

  },
  methods: {
    onSubmit (formName) {
      if (this.form.title === '' || this.form.content === '') {
        return false
      } else {
        this.parmas.title = this.form.title
        this.parmas.content = this.form.content
        this.parmas.sender = 'root'
        this.parmas.type = '网站公告'
        console.log(this.parmas)
        this.postRequest('/message/sendMessage', this.parmas).then((res) => {
          console.log(res.data)
          this.res1 = res.data
          if (this.res1.code === 1) {
            this.$alert('发布消息成功！', '执行结果', {
              confirmButtonText: '确定'
            })
          } else {
            this.$alert('发布消息失败！', '执行结果', {
              confirmButtonText: '确定'
            })
            return false
          }
        })
      }
    },
    resetForm (formName) {
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
