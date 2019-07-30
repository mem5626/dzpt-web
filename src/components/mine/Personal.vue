<template>
  <div>
    <div class="address-box">
      <div class="address-header">
        <span>个人信息</span>
        <div class="address-action">
          <span @click="password()"> 修改用户密码</span>
          <span @click="password1()"> 修改支付密码</span>
        </div>
        <el-dialog title="修改密码" :visible.sync="dialogFormVisible">
          <el-form :model="form" :rules="rules" :ref="form">
            <el-form-item label="请输入原密码" prop="password" :label-width="formLabelWidth">
              <el-input v-model="form.password" autocomplete="off" type="password"></el-input>
            </el-form-item>
            <el-form-item label="请输入新密码" prop="newpassword" :label-width="formLabelWidth">
              <el-input v-model="form.newpassword" autocomplete="off" type="password"></el-input>
            </el-form-item>
            <el-form-item label="请确认新密码" prop="repassword" :label-width="formLabelWidth">
              <el-input v-model="form.repassword" autocomplete="off" type="password"></el-input>
            </el-form-item>
        </el-form>
         <div slot="footer" class="dialog-footer">
           <el-button @click="resetForm('form')">取 消</el-button>
           <el-button type="primary" @click="commit1()">确 定</el-button>
         </div>
       </el-dialog>
       <el-dialog title="修改手机" :visible.sync="dialogFormVisible3">
          <el-form :model="form" :rules="rules" :ref="form">
            <el-form-item label="请输入新手机号" prop="phone" :label-width="formLabelWidth">
              <el-input v-model="form.phone" autocomplete="off"></el-input>
            </el-form-item>
        </el-form>
         <div slot="footer" class="dialog-footer">
           <el-button @click="resetForm('form')">取 消</el-button>
           <el-button type="primary" @click="commit3()">确 定</el-button>
         </div>
       </el-dialog>
       <el-dialog title="修改邮箱" :visible.sync="dialogFormVisible4">
          <el-form :model="form" :rules="rules" :ref="form">
            <el-form-item label="请输入新邮箱"  prop="email" :label-width="formLabelWidth">
              <el-input v-model="form.email" autocomplete="off"></el-input>
            </el-form-item>
        </el-form>
         <div slot="footer" class="dialog-footer">
           <el-button @click="resetForm('form')">取 消</el-button>
           <el-button type="primary" @click="commit4()">确 定</el-button>
         </div>
       </el-dialog>
       <el-dialog title="修改详细地址" :visible.sync="dialogFormVisible5">
          <el-form :model="form" :rules="rules" :ref="form">
            <el-form-item label="请输入新地址" prop="address"  :label-width="formLabelWidth">
              <el-input v-model="form.address" autocomplete="off"></el-input>
            </el-form-item>
        </el-form>
         <div slot="footer" class="dialog-footer">
           <el-button @click="resetForm('form')">取 消</el-button>
           <el-button type="primary" @click="commit5()">确 定</el-button>
         </div>
       </el-dialog>

      </div>
      <div class="address-content">
        <div class="first">
        <p><span class="address-content-title">用户名 :</span>{{Info.userName}}</p>
        <p><span class="address-content-title">手机号 :</span> {{Info.phone}}</p>
        <p><span class="address-content-title">邮箱:</span> {{Info.email}}</p>
        <p><span class="address-content-title">详细地址:</span> {{Info.address}}</p>
        <p><span class="address-content-title">企业名称:</span> {{Info.companyName}}</p>
        <p><span class="address-content-title">创建时间:</span> {{Info.createDate}}</p>
        </div>
      <div class="address-action">
        <p><span class="address-content-title1" ><i class=""></i></span></p>
        <p><span class="address-content-title1" @click="phone()"><i class=""></i> 编辑</span></p>
        <p><span class="address-content-title1" @click="email()"><i class=""></i> 编辑</span></p>
        <p><span class="address-content-title1" @click="addr()"><i class=""></i> 编辑</span></p>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
import Distpicker from 'v-distpicker'
import store from '@/vuex/store'
import {mapState, mapActions} from 'vuex'
export default {
  computed: {
    ...mapState(['userInfo'])
  },
  data () {
    const validatePassCheck = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.form.newpassword) {
        callback(new Error('两次输入的密码不一样'))
      } else {
        callback()
      }
    }
    return {
      form: {
        address: '',
        phone: '',
        password: '',
        newpassword: '',
        repasword: '',
        email: ''

      },
      rules: {
        address: [
          { required: true, message: '必填项', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '必填项', trigger: 'blur' },
          { type: 'string', pattern: /^1[3|4|5|7|8][0-9]{9}$/, message: '手机号格式出错', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '必填项', trigger: 'blur' },
          { type: 'email', message: '邮箱格式错误', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请填写密码', trigger: 'blur' }
        ],
        newpassword: [
          { required: true, message: '请输入新密码', trigger: 'change' }
        ],
        repassword: [
          { required: true, message: '请确认新密码', trigger: 'change' },
          { validator: validatePassCheck, trigger: 'blur' }
        ]
      },
      formData: {
        nickname: '',
        age: '',
        province: '',
        city: '',
        area: '',
        address: '',
        postalcode: '',
        phone: ''
      },
      info: {},
      dialogFormVisible: false,
      dialogFormVisible2: false,
      dialogFormVisible3: false,
      dialogFormVisible4: false,
      dialogFormVisible5: false,
      formLabelWidth: '120px',
      Info: {},
      params: {
        userName: ''
      },
      res1: {
        code: '',
        msg: ''
      },
      passInfo: {
        userName: '',
        password: '',
        newPassword: ''
      },
      userData: {
        userName: '',
        email: '',
        address: '',
        phone: ''
      }
    }
  },
  created () {
    this.isLogin()
    this.params.userName = this.userInfo.userName
    console.log(this.params)
    this.getRequest('/user/getUserInfo', this.params)
      .then((response) => {
        console.log(response.data)
        response.data.data.createDate = this.dateFormat(response.data.data.createDate)
        this.Info = response.data.data
      })
      .catch(function (error) {
        console.log(error)
      })
  },
  methods: {
    ...mapActions(['isLogin']),
    password () {
      this.dialogFormVisible = true
    },
    password1 () {
      this.dialogFormVisible = true
    },
    phone () {
      this.dialogFormVisible3 = true
    },
    email () {
      this.dialogFormVisible4 = true
    },
    addr () {
      this.dialogFormVisible5 = true
    },
    commit1 (formName) {
      this.passInfo.userName = this.userInfo.userName
      this.passInfo.password = this.form.password
      this.passInfo.newPassword = this.form.newpassword
      console.log(this.passInfo)
      if (this.form.newpassword === this.form.repassword) {
        this.postRequest('/user/updatePassword', this.passInfo).then((res) => {
          console.log(res.data)
          this.res1 = res.data
          if (this.res1.code === '1') {
            this.$alert('修改密码成功！', '执行结果', {
              confirmButtonText: '确定',
              callback: action => {
                this.dialogFormVisible = false
              }
            })
          } else {
            this.$alert('修改失败！原密码输入错误！', '执行结果', {
              confirmButtonText: '确定'
            })
            return false
          }
        })
      }
    },
    commit3 () {
      this.userData.userName = this.userInfo.userName
      this.userData.email = this.Info.email
      this.userData.phone = this.form.phone
      this.userData.address = this.Info.address
      console.log(this.userData)
      this.postRequest('/user/updateUserInfo', this.userData).then((res) => {
        console.log(res.data)
        this.res1 = res.data
        if (this.res1.code === '1') {
          this.$alert('修改手机号码成功！', '执行结果', {
            confirmButtonText: '确定',
            callback: action => {
              this.dialogFormVisible3 = false
              this.Info.phone = this.userData.phone
            }
          })
        } else {
          this.$alert('修改失败！', '执行结果', {
            confirmButtonText: '确定'
          })

          return false
        }
      })
    },
    commit4 () {
      this.userData.userName = this.userInfo.userName
      this.userData.email = this.form.email
      this.userData.phone = this.Info.phone
      this.userData.address = this.Info.address
      this.postRequest('/user/updateUserInfo', this.userData).then((res) => {
        console.log(res.data)
        this.res1 = res.data
        if (this.res1.code === '1') {
          this.$alert('修改邮箱成功！', '执行结果', {
            confirmButtonText: '确定',
            callback: action => {
              this.dialogFormVisible4 = false
              this.Info.email = this.userData.email
            }
          })
        } else {
          this.$alert('修改失败！', '执行结果', {
            confirmButtonText: '确定'
          })
          return false
        }
      })
    },
    commit5 () {
      this.userData.userName = this.userInfo.userName
      this.userData.email = this.Info.email
      this.userData.phone = this.Info.phone
      this.userData.address = this.form.address
      this.postRequest('/user/updateUserInfo', this.userData).then((res) => {
        console.log(res.data)
        this.res1 = res.data
        if (this.res1.code === '1') {
          this.$alert('修改地址成功！', '执行结果', {
            confirmButtonText: '确定',
            callback: action => {
              this.dialogFormVisible5 = false
              this.Info.address = this.userData.address
            }
          })
        } else {
          this.$alert('修改失败！', '执行结果', {
            confirmButtonText: '确定'
          })
          return false
        }
      })
    },
    resetForm (formName) {
      this.dialogFormVisible = false
      this.dialogFormVisible2 = false
      this.dialogFormVisible3 = false
      this.dialogFormVisible4 = false
      this.dialogFormVisible5 = false
      this.$refs[formName].resetFields()
    }
  },
  components: {
    Distpicker
  },
  store
}
</script>

<style scoped>
.address-box {
  padding: 15px;
  margin: 15px;
  border-radius: 5px;
  box-shadow: 0px 0px 10px #545c64;
}
.address-header {
  height: 35px;
  display: flex;
  justify-content: space-between;
  color: #232323;
  font-size: 18px;
}
.address-action span{
  margin-left: 15px;
  font-size: 14px;
  color: #2d8cf0;
  cursor: pointer;
}
.address-content {
  display: flex;
  text-align: left;
  font-size: 14px;
}
.address-content-title {
  color: #999;
}
.address-content-title1 {
  color: blue;
}
.address-action span{
  margin-left: 15px;
  font-size: 14px;
  color: #2d8cf0;
  cursor: pointer;
}
.first {
    width:900px;
}
.second {
    text-align: right;
}
</style>
