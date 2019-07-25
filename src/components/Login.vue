<template>
  <div>
    <div class="freeback-container">
      <div class="freeback-box-border">
        <div class="freeback-box">
        <el-card shadow="always">
          <div class="freback-content">
            <div class="freeback-title">
              <h1>登录</h1>
              <h2>欢迎使用大宗商品交易平台</h2>
            </div>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm"
                     label-width="100px"  class="demo-ruleForm"
                     >
              <el-form-item label="用户名" prop="name" style="width: 450px;margin-top:10px">
                <el-input v-model="ruleForm.name"
                          prefix-icon="el-icon-user-solid"></el-input>
              </el-form-item>
              <el-form-item label="登录密码" prop="password" style="width: 450px;">
                <el-input v-model="ruleForm.password" show-password
                          prefix-icon="el-icon-lock" @keyup.enter.native="submitForm('ruleForm')"></el-input>
              </el-form-item>
            </el-form>
          <br/>
            <div slot="footer">
              <el-button type="primary" @click="submitForm('ruleForm')">登 录</el-button>
              <el-button @click="resetForm('ruleForm')">重 置</el-button>
            </div>
          </div>
        </el-card>

          </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      ruleForm: {
        name: '',
        password: ''
      },
      rules: {
        name: [
          { required: true, message: '请填写用户名', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请填写密码', trigger: 'change' }
        ]
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
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.axios.post('https://mockapi.eolinker.com/rUlUyQ363c2a9790452a95ba6656e403133f0e9b965b72e/login', {
            params: {userName: this.ruleForm.name, password: this.ruleForm.password}
          })
            .then(response => {
              console.log(response.data)
              if (response.data.code === '1') {
                if (this.ruleForm.name === 'root') {
                  this.$router.push({
                    path: '/Management/UserList',
                    name: 'UserList',
                    params: {
                      manager: this.ruleForm.name
                    }
                  })
                } else {
                  this.$router.push({
                    path: '/',
                    name: 'Home',
                    params: {
                      username: this.ruleForm.name
                    }
                  })
                }
              } else {
                alert('登录失败！')
              }
            })
            //   if(this.ruleForm.name=="Mike"&&this.ruleForm.password=="123456"){
            //       this.$router.push({
            //         path: '/',
            //         name: 'Home',
            //         params: {
            //             username: this.ruleForm.name,
            //         }
            //     })
            //   }
            //   else if(this.ruleForm.name=="Manager"&&this.ruleForm.password=="123456"){
            //       this.$router.push({
            //         path: '/Management/UserList',
            //         name: 'UserList',
            //         params: {
            //             manager: this.ruleForm.name,
            //         }
            //     })
            //   }
            //   else{
            //       alert('error submit!!');
            //       return false;
            //   }
        } else {
          // console.log('error submit!!');
          this.$Message.error('登录失败!')
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
  height: 500px;
  display: flex;
  align-items: center;
  background-color: #eeeeee;
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
  margin: 0 auto;
}
.freeback-box {
  width: 630px;
}
.freback-content {
  background-color: #ffffff;
  width:500px;
  margin: 15px auto;
  border-radius: 5px;
}

</style>
