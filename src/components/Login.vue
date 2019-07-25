<template>
  <div>
    <div class="freeback-container">
      <div class="freeback-img-box">
        <img src="static/img/sale.png">
      </div>
      <div class="freeback-box-border">
        <div class="freeback-box">
          <div class="freeback-title">
            <h1>登录</h1>
            <h2>欢迎使用大宗商品交易平台</h2>
          </div>
           <div class="freeback-content" style="border: 3px solid #495060;width:500px;margin: 15px auto;">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px"  class="demo-ruleForm">
                <el-form-item label="用户名" prop="userName" style="width:410px;margin-top:10px">
                  <el-input v-model="ruleForm.userName"></el-input>
                </el-form-item>
                <el-form-item label="登录密码" prop="password" style="width:410px">
                  <el-input v-model="ruleForm.password" type="password"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
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
  name: 'Login',
  data () {
    return {
      ruleForm:
        {
          userName: '',
          password: ''
        },
      rules: {
        userName: [
          { required: true, message: '请填写用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请填写密码', trigger: 'change' }
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
      console.log(this.ruleForm)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // alert(this.params)
          this.postRequest('/login', this.ruleForm).then((res) => {
            console.log(res.data)
            this.res1 = res.data
            if (this.res1.code === 1) {
              if (this.ruleForm.userName === 'root') {
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
                    username: this.ruleForm.userName
                  }
                })
              }
            } else {
              alert('登录失败！')
            }
          }).catch(function (error) {
            console.log(error)
          })
          // this.axios.post('', this.params)
          //   .then(response => {
          //     console.log(response.data)
          //     if (response.data.code === '1') {
          //       if (this.ruleForm.name === 'root') {
          //         this.$router.push({
          //           path: '/Management/UserList',
          //           name: 'UserList',
          //           params: {
          //             manager: this.ruleForm.name
          //           }
          //         })
          //       } else {
          //         this.$router.push({
          //           path: '/',
          //           name: 'Home',
          //           params: {
          //             username: this.ruleForm.name
          //           }
          //         })
          //       }
          //     } else {
          //       alert('登录失败！')
          //     }
          //   })
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
