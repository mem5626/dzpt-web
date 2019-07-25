<template>
  <div>
    <div class="freeback-container">
      <div class="freeback-img-box">
        <img src="static/img/signup-sale.png">
      </div>
      <div class="freeback-box-border">
        <div class="freeback-box">
          <div class="freeback-title">
            <h1>注册账号</h1>
            <h2>欢迎使用大宗商品交易平台</h2>
          </div>
          <div class="freeback-content" style="border: 3px solid #495060;width:500px;margin: 15px auto;">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px"  class="demo-ruleForm">
                <el-form-item label="用户名" prop="userName" style="width:410px;margin-top:10px">
                  <el-input v-model="ruleForm.userName"></el-input>
                </el-form-item>
                <el-form-item label="手机号" prop="phone" style="width:410px">
                  <el-input v-model="ruleForm.phone"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email" style="width:410px">
                  <el-input v-model="ruleForm.email"></el-input>
                </el-form-item>
                <el-form-item label="企业名称" prop="companyName" style="width:410px">
                  <el-input v-model="ruleForm.companyName"></el-input>
                </el-form-item>
                <el-form-item label="企业地址" prop="address" style="width:410px">
                  <el-input v-model="ruleForm.address"></el-input>
                </el-form-item>
                <el-form-item label="登录密码" prop="password" style="width:410px">
                  <el-input v-model="ruleForm.password" type="password"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="repassword" style="width:410px">
                  <el-input v-model="ruleForm.repassword" type="password"></el-input>
                </el-form-item>

                <el-form-item>
                  <el-button type="primary" @click="submitForm('ruleForm')">立即注册</el-button>
                  <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
              </el-form>
            </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {

  data () {
    const validatePassCheck = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.password) {
        callback(new Error('两次输入的密码不一样'))
      } else {
        callback()
      }
    }
    return {
      formInline: {
        user: '',
        region: ''
      },
      ruleForm: {
        userName: '',
        phone: '',
        email: '',
        companyName: '',
        address: '',
        password: '',
        repassword: ''
      },
      parmas: {
        userName: '',
        phone: '',
        email: '',
        companyName: '',
        address: '',
        password: ''
      },
      rules: {
        userName: [
          { required: true, message: '必填项', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '必填项', trigger: 'blur' },
          { type: 'string', pattern: /^1[3|4|5|7|8][0-9]{9}$/, message: '手机号格式出错', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '必填项', trigger: 'blur' },
          { type: 'email', message: '邮箱格式错误', trigger: 'blur' }
        ],
        companyName: [
          { required: true, message: '请填写企业名称', trigger: 'change' }
        ],
        address: [
          { required: true, message: '请填写企业地址', trigger: 'change' }
        ],
        password: [
          { required: true, message: '请填写密码', trigger: 'change' }
        ],
        repassword: [
          { required: true, message: '请确认密码', trigger: 'change' },
          { validator: validatePassCheck, trigger: 'blur' }
        ]
      },
      res1: {
        code: '',
        msg: ''
      }

    }
  },
  methods: {
    onSubmit () {
      console.log('submit!')
    },
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    },
    submitForm (formName) {
      this.parmas.userName = this.ruleForm.userName
      this.parmas.password = this.ruleForm.password
      this.parmas.phone = this.ruleForm.phone
      this.parmas.email = this.ruleForm.email
      this.parmas.companyName = this.ruleForm.companyName
      this.parmas.address = this.ruleForm.address
      console.log(this.ruleForm)
      console.log(this.parmas)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.postRequest('/signup', this.parmas).then((res) => {
            console.log(res.data)
            this.res1 = res.data
            if (this.res1.code === 1) {
              alert('注册成功！')
              this.$router.push({
                path: '/Login',
                name: 'Login'
              })
            } else {
              alert('注册失败')
              return false
            }
          })
        } else {
          this.$Message.error('注册失败')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style scoped>
.freeback-container {
  margin: 0px auto;
  width: 100%;
  height: 700px;
  display: flex;
  align-items: center;
  /* background-color: #ccc; */
}
.freeback-img-box {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.freeback-img-box img {
  width: 80%;
}
.freeback-box-border {
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.freeback-box {
  width: 630px;
}
.freback-content {
  margin: 15px auto;
}

</style>
