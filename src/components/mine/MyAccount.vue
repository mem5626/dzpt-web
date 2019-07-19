<template>
  <div>
    <div class="address-box">
      <div class="address-header">
        <span>账户信息</span>
        <div class="address-action">
          <span @click="edit()"><Icon type="edit"></Icon> 修改密码</span>
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
    };
  },
  methods: {
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
