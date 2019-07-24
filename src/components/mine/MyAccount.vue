<template>
  <div>
    <div class="address-box">
      <div class="address-header">
        <span>账户信息</span>
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
        <div class="address-action">
          <span @click="password()"><Icon type="edit"></Icon> 修改密码</span>
          <span @click="edit()"><Icon type="edit"></Icon> 解除绑定</span>
        </div>
        
      </div>
      <div class="address-content">
        <p><span class="address-content-title">绑定账户名 :</span> {{info.username}}</p>
        <p><span class="address-content-title">支付密码 :</span> {{info.username}}</p>
        <p><span class="address-content-title">创建时间:</span> {{info.created}}</p>
      </div>
    </div>
    <div class="address-box">
      <div class="address-header">
        <span>银行卡信息</span>
        <div class="address-action">
          <span @click="AddCard()"><Icon type="edit"></Icon> 添加银行卡</span>
        </div>
      </div>
      <div class="address-content">
        <p><span class="address-content-title">卡号 :</span> {{info.username}}</p>
        <p><span class="address-content-title">所属银行 :</span> {{info.username}}</p>
        <p><span class="address-content-title">绑定时间:</span> {{info.created}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      formData: {
      },
      info: {},
      dialogFormVisible: false,
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
  methods: {
      password(){
          this.dialogFormVisible = true;
      },
      commit(){
          this.dialogFormVisible = false;
          this.$alert('修改成功', '执行结果', {
          confirmButtonText: '确定',

        });
      },
      AddCard(){
  	this.$router.push({
  	    path: '/Mine/AddCard',
  	    name: 'AddCard',
  	    params: {
  	    username: this.$route.params.username,
  	    }
  	})
  	}
  },
  	
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
.address-content {
  text-align: left;
  font-size: 14px;
}
.address-content-title {
  color: #999;
}
.address-action span{
  margin-left: 15px;
  font-size: 14px;
  color: #2d8cf0;
  cursor: pointer;
}
</style>
