<template>
  <div>
    <div class="address-box" >
      <div class="address-header" >
        <span >钱包余额</span>
      </div>
      <div class="address-content" >
        <div>
            <p style="font-size:50px">￥8000</p>
        </div>
        <div style="margin-left:550px;margin-top:70px">
            <el-button @click="Rechange()" type="primary" round >余额充值</el-button>
            <el-button @click="Withdraw()" type="success" round >零钱提现</el-button>
        </div>
      </div>
    </div>
    <div class="address-box">
      <div class="address-header">
        <span>银行卡信息</span>
        <div class="address-action">
          <span @click="AddCard()"><Icon type="edit"></Icon> 添加银行卡</span>
        </div>
      </div>
      <div class="content1">
        <p>卡号 :{{info.username}}</p>
        <p>所属银行 : {{info.username}}</p>
        <p>绑定时间 :  {{info.created}}</p>
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
  	Rechange() {
      this.$router.push({
          path: '/Mine/Rechange',
          name: 'Rechange',
          params: {
          username: this.$route.params.username,
          }
      })
  	},
	Withdraw() {
    this.$router.push({
        path: '/Mine/Withdraw',
        name: 'Withdraw',
        params: {
        username: this.$route.params.username,
        }
    })
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
.content1 {
  font-size: 14px;
  text-align: left
}
.address-header {
  height: 35px;
  display: flex;
  justify-content: space-between;
  color: #232323;
  font-size: 18px;
}
.address-content {
  display: flex;
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
.table{
    margin:auto;
    display: block;
  }
  .container {
    display: block;
    min-height: 275px;
    width:1250px ;
    background-color: #F6F6F6;
    margin:auto;
  }


</style>
