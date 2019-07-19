<template>
  <div>
    <div class="address-box">
      <div class="address-header">
        <span>个人信息</span>
        <div class="address-action">
          <span @click="edit()"><Icon type="edit"></Icon> 修改</span>
        </div>
      </div>
      <div class="address-content">
        <p><span class="address-content-title">用户名 :</span> {{info.username}}</p>
        <p><span class="address-content-title">登录密码 :</span> {{info.username}}</p>
        <p><span class="address-content-title">手机号 :</span> {{info.gender}}</p>
        <p><span class="address-content-title">邮箱:</span> {{info.nickname}}</p>
        <p><span class="address-content-title">企业名称:</span> {{info.age}}</p>
        <p><span class="address-content-title">详细地址:</span> {{info.detailAddress}}</p>
        <p><span class="address-content-title">创建时间:</span> {{info.created}}</p>
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
        province: '广东省',
        city: '广州市',
        area: '天河区',
        address: '',
        postalcode: '',
        phone: '',
      },
      info: {},
    };
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
