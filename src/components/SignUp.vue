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
                <el-form-item label="用户名" prop="name" style="width:410px;margin-top:10px">
                  <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="手机号" prop="phone" style="width:410px">
                  <el-input v-model="ruleForm.phone"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email" style="width:410px">
                  <el-input v-model="ruleForm.email"></el-input>
                </el-form-item>
                <el-form-item label="企业名称" prop="company" style="width:410px">
                  <el-input v-model="ruleForm.company"></el-input>
                </el-form-item>
                <el-form-item label="企业地址" prop="addr" style="width:410px">
                  <el-input v-model="ruleForm.addr"></el-input>
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

  data() {
      return {
        formInline: {
          user: '',
          region: ''
        },
        ruleForm: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        rules: {
          name: [
            { required: true, message: '必填项', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          phone: [
            { required: true, message: '必填项', trigger: 'blur' },
          ],
          email: [
            { required: true, message: '必填项', trigger: 'blur' },
          ],
          password: [
            { required: true, message: '请填写密码', trigger: 'change' }
          ],
          repassword: [
            { required: true, message: '请确认密码', trigger: 'change' }
          ],
        }
      
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      },
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
            this.$router.push('/Login')
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }

};
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
