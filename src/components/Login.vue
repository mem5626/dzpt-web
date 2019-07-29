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
              <el-form-item label="用户名" prop="userName" style="width: 450px;margin-top:10px">
                <el-input v-model="ruleForm.userName"
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
import store from '@/vuex/store'
import { mapMutations, mapActions, mapState } from 'vuex'
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
        msg: '',
        data: {
          userId: ''
        }
      },
      userData: {
        userName: '',
        userId: ''
      }
    }
  },
  methods: {
    ...mapMutations(['SET_USER_LOGIN_INFO']),
    ...mapActions(['login']),
    ...mapState(['userInfo']),
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
            console.log(this.userData)
            if (this.res1.code === 1) {
              if (this.ruleForm.userName === 'root') {
                this.userData.userName = this.ruleForm.userName
                this.login(this.userData)
                this.$router.push({
                  path: '/Management/UserList',
                  name: 'UserList',
                  params: {
                    manager: this.ruleForm.name
                  }
                })
              } else {
                this.userData.userId = this.res1.data.userId
                this.userData.userName = this.ruleForm.userName
                this.login(this.userData)
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
        } else {
          // console.log('error submit!!');
          alert('登录失败!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  },
  store
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
