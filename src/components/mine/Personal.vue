<template>
  <div>
    <div class="address-box">
      <div class="address-header">
        <span>个人信息</span>
        <div class="address-action">
          <span @click="password()"><Icon type="edit"></Icon> 修改用户密码</span>
          <span ><Icon type="edit"></Icon> 修改支付密码</span>
        </div>
        <el-dialog title="修改密码" :visible.sync="dialogFormVisible">
          <el-form :model="form" :rules="rules">
            <el-form-item label="请输入原密码" prop="password" :label-width="formLabelWidth">
              <el-input v-model="form.password" autocomplete="off" type="password"></el-input>
            </el-form-item>
            <el-form-item label="请输入新密码" prop="password" :label-width="formLabelWidth">
              <el-input v-model="form.newPassword" autocomplete="off" type="password"></el-input>
            </el-form-item>
            <el-form-item label="请确认新密码" prop="password" :label-width="formLabelWidth">
              <el-input v-model="form.rePassword" autocomplete="off" type="password"></el-input>
            </el-form-item>
        </el-form>
         <div slot="footer" class="dialog-footer">
           <el-button @click="dialogFormVisible = false">取 消</el-button>
           <el-button type="primary" @click="commit1()">确 定</el-button>
         </div>
       </el-dialog>
        <!-- <el-dialog title="修改用户名" :visible.sync="dialogFormVisible2">
          <el-form :model="form" :rules="rules">
            <el-form-item label="请输入新用户名" prop="username" :label-width="formLabelWidth">
              <el-input v-model="form.userName" autocomplete="off"></el-input>
            </el-form-item>
        </el-form>
         <div slot="footer" class="dialog-footer">
           <el-button @click="dialogFormVisible2 = false">取 消</el-button>
           <el-button type="primary" @click="commit2()">确 定</el-button>
         </div>
       </el-dialog> -->
       <el-dialog title="修改手机" :visible.sync="dialogFormVisible3">
          <el-form :model="form" :rules="rules">
            <el-form-item label="请输入新手机号" prop="phone" :label-width="formLabelWidth">
              <el-input v-model="form.phone" autocomplete="off"></el-input>
            </el-form-item>
        </el-form>
         <div slot="footer" class="dialog-footer">
           <el-button @click="dialogFormVisible3 = false">取 消</el-button>
           <el-button type="primary" @click="commit3()">确 定</el-button>
         </div>
       </el-dialog>
       <el-dialog title="修改邮箱" :visible.sync="dialogFormVisible4">
          <el-form :model="form" :rules="rules">
            <el-form-item label="请输入新邮箱"  prop="email" :label-width="formLabelWidth">
              <el-input v-model="form.email" autocomplete="off"></el-input>
            </el-form-item>
        </el-form>
         <div slot="footer" class="dialog-footer">
           <el-button @click="dialogFormVisible4 = false">取 消</el-button>
           <el-button type="primary" @click="commit4()">确 定</el-button>
         </div>
       </el-dialog>
       <el-dialog title="修改详细地址" :visible.sync="dialogFormVisible5">
          <el-form :model="form" :rules="rules">
            <el-form-item label="请输入新地址" prop="address"  :label-width="formLabelWidth">
              <el-input v-model="form.address" autocomplete="off"></el-input>
            </el-form-item>
        </el-form>
         <div slot="footer" class="dialog-footer">
           <el-button @click="dialogFormVisible5 = false">取 消</el-button>
           <el-button type="primary" @click="commit5()">确 定</el-button>
         </div>
       </el-dialog>



      </div>
      <div class="address-content">
        <div class="first">
        <p><span class="address-content-title">用户名 :</span>{{userInfo.userName}}</p>
        <p><span class="address-content-title">手机号 :</span> {{userInfo.phone}}</p>
        <p><span class="address-content-title">邮箱:</span> {{userInfo.email}}</p>
        <p><span class="address-content-title">详细地址:</span> {{userInfo.address}}</p>
        <p><span class="address-content-title">企业名称:</span> {{userInfo.companyName}}</p>
        <p><span class="address-content-title">创建时间:</span> {{userInfo.createDate}}</p>
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
export default {
  data () {
    return {
      rules: {
          name: [
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
          password: [
            { required: true, message: '请填写密码', trigger: 'change' }
          ],
        },
      formData: {
        nickname: '',
        age: '',
        province: '',
        city: '',
        area: '',
        address: '',
        postalcode: '',
        phone: '',
      },
      info: {},
      dialogFormVisible: false,
      dialogFormVisible2: false,
      dialogFormVisible3: false,
      dialogFormVisible4: false,
      dialogFormVisible5: false,

      form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
      },
      formLabelWidth: '120px',
      userInfo: {},
    };
  },
  created () {
    this.axios.get('http://10.2.2.24:8080/user/getUserInfo',{
      params:{userName: this.$route.params.username}
    },{withCredentials : true})
    .then(response => {
        console.log(response.data);
        this.userInfo = response.data.data;     
    })
  },
  methods:{
      password(){
          this.dialogFormVisible = true;
      },
      phone(){
          this.dialogFormVisible3 = true;
      },
      email(){
          this.dialogFormVisible4 = true;
      },
      addr(){
          this.dialogFormVisible5 = true;
      },
      commit1(){
          if(this.form.newPassword!=this.form.rePassword){
                alert('修改失败！两次输入的密码不一致！');
            }
            else{
                this.axios.post('http://10.2.2.24:8080/user/updatePassword',{
                    userName: this.userInfo.userName,
                    password: this.form.password,
                    newPassword: this.form.newPassword
                })
                .then((response) => {
                    console.log(response.data);
                    // this.$router.push('/Login')
                    if(response.data.code=='1'){
                        alert('修改成功！');
                        this.dialogFormVisible = false;
                    }
                    else{
                        alert('修改失败！原密码输入错误！');
                        return false
                    }
                }) 
            }
      },
    //   commit2(){
    //       this.dialogFormVisible2 = false;
    //       this.axios.post('http://10.2.2.24:8080/user/updateUserInfo',{
    //             userName: this.form.userName,
    //             password: this.userInfo.password,
    //             email: this.userInfo.email,
    //             phone: this.userInfo.phone,
    //             address: this.userInfo.address,
    //         })
    //         .then((response) => {
    //             console.log(response.data);
    //             // this.$router.push('/Login')
    //             if(response.data.code=='1'){
    //                 alert('修改成功！');
    //             }
    //             else{
    //                 alert('修改失败！');
    //                 return false
    //             }
    //         })
    //   },
      commit3(){
          this.dialogFormVisible3 = false;
          this.axios.post('http://10.2.2.24:8080/user/updateUserInfo',{
                userName: this.userInfo.userName,
                password: this.userInfo.password,
                email: this.userInfo.email,
                phone: this.form.phone,
                address: this.userInfo.address,
            })
            .then((response) => {
                console.log(response.data);
                // this.$router.push('/Login')
                if(response.data.code=='1'){
                    alert('修改成功！');
                }
                else{
                    alert('修改失败！');
                    return false
                }
            })
      },
      commit4(){
          this.dialogFormVisible4 = false;
          this.axios.post('http://10.2.2.24:8080/user/updateUserInfo',{
                userName: this.userInfo.userName,
                password: this.userInfo.password,
                email: this.form.email,
                phone: this.userInfo.phone,
                address: this.userInfo.address,
            })
            .then((response) => {
                console.log(response.data);
                // this.$router.push('/Login')
                if(response.data.code=='1'){
                    alert('修改成功！');
                }
                else{
                    alert('修改失败！');
                    return false
                }
            })
      },
      commit5(){
          this.dialogFormVisible5 = false;
          this.axios.post('http://10.2.2.24:8080/user/updateUserInfo',{
                userName: this.userInfo.userName,
                password: this.userInfo.password,
                email: this.userInfo.email,
                phone: this.userInfo.phone,
                address: this.form.address,
            })
            .then((response) => {
                console.log(response.data);
                // this.$router.push('/Login')
                if(response.data.code=='1'){
                    alert('修改成功！');
                }
                else{
                    alert('修改失败！');
                    return false
                }
            })
      },
  }
};
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
