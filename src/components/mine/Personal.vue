<template>
  <div>
    <div class="address-box">
      <div class="address-header">
        <span>个人信息</span>
        <div class="address-action">
          <span @click="password()"><Icon type="edit"></Icon> 修改用户密码</span>
          <span @click="password()"><Icon type="edit"></Icon> 修改支付密码</span>
        </div>
        <el-dialog title="修改密码" :visible.sync="dialogFormVisible">
          <el-form :model="form">
            <el-form-item label="请输入原密码" :label-width="formLabelWidth">
              <el-input v-model="form.password" autocomplete="off" type="password"></el-input>
            </el-form-item>
            <el-form-item label="请输入新密码" :label-width="formLabelWidth">
              <el-input v-model="form.newpassword" autocomplete="off" type="password"></el-input>
            </el-form-item>
            <el-form-item label="请确认新密码" :label-width="formLabelWidth">
              <el-input v-model="form.repassword" autocomplete="off" type="password"></el-input>
            </el-form-item>
        </el-form>
         <div slot="footer" class="dialog-footer">
           <el-button @click="dialogFormVisible = false">取 消</el-button>
           <el-button type="primary" @click="commit()">确 定</el-button>
         </div>
       </el-dialog>
        <el-dialog title="修改用户名" :visible.sync="dialogFormVisible2">
          <el-form :model="form">
            <el-form-item label="请输入新用户名" :label-width="formLabelWidth">
              <el-input v-model="form.password" autocomplete="off"></el-input>
            </el-form-item>
        </el-form>
         <div slot="footer" class="dialog-footer">
           <el-button @click="dialogFormVisible = false">取 消</el-button>
           <el-button type="primary" @click="commit()">确 定</el-button>
         </div>
       </el-dialog>
       <el-dialog title="修改手机" :visible.sync="dialogFormVisible3">
          <el-form :model="form">
            <el-form-item label="请输入新手机号" :label-width="formLabelWidth">
              <el-input v-model="form.password" autocomplete="off"></el-input>
            </el-form-item>
        </el-form>
         <div slot="footer" class="dialog-footer">
           <el-button @click="dialogFormVisible = false">取 消</el-button>
           <el-button type="primary" @click="commit()">确 定</el-button>
         </div>
       </el-dialog>
       <el-dialog title="修改邮箱" :visible.sync="dialogFormVisible4">
          <el-form :model="form">
            <el-form-item label="请输入新邮箱" :label-width="formLabelWidth">
              <el-input v-model="form.password" autocomplete="off"></el-input>
            </el-form-item>
        </el-form>
         <div slot="footer" class="dialog-footer">
           <el-button @click="dialogFormVisible = false">取 消</el-button>
           <el-button type="primary" @click="commit()">确 定</el-button>
         </div>
       </el-dialog>
       <el-dialog title="修改详细地址" :visible.sync="dialogFormVisible5">
          <el-form :model="form">
            <el-form-item label="请输入新地址" :label-width="formLabelWidth">
              <el-input v-model="form.password" autocomplete="off"></el-input>
            </el-form-item>
        </el-form>
         <div slot="footer" class="dialog-footer">
           <el-button @click="dialogFormVisible = false">取 消</el-button>
           <el-button type="primary" @click="commit()">确 定</el-button>
         </div>
       </el-dialog>



      </div>
      <div class="address-content">
        <div class="first">
        <p><span class="address-content-title">用户名 :</span></p>
        <p><span class="address-content-title">绑定账户 :</span></p>
        <p><span class="address-content-title">手机号 :</span> {{info.gender}}</p>
        <p><span class="address-content-title">邮箱:</span> {{info.nickname}}</p>
        <p><span class="address-content-title">详细地址:</span> {{info.detailAddress}}</p>
        <p><span class="address-content-title">企业名称:</span> {{info.age}}</p>
        <p><span class="address-content-title">创建时间:</span> {{info.created}}</p>
        </div>
      <div class="address-action">
        <p><span class="address-content-title1" @click="username()"><i class=""></i> 编辑</span></p>
        <p><span class="address-content-title1" ><i class=""></i> </span></p>
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
        formLabelWidth: '120px'
    };
  },
  methods:{
      password(){
          this.dialogFormVisible = true;
      },
      username(){
          this.dialogFormVisible2 = true;
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
      commit(){
          this.dialogFormVisible = false;
          this.dialogFormVisible2 = false;
          this.dialogFormVisible3 = false;
          this.dialogFormVisible4 = false;
          this.dialogFormVisible5 = false;
          this.$alert('修改成功', '执行结果', {
          confirmButtonText: '确定',

        });
      }
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
