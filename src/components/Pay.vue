<template>
  <div class="container1">
    <div id="title">
      <div id='payee'>向
      <span>***</span>
      支付
      </div>
      <div id='money'>
       ¥{{money}}
      </div>
     </div>


      <el-card id="card">
        <div class="tag">支付方式</div>
        <el-select style="width:300px" >支付</el-select>
        <div class="tag">支付密码</div>
        <el-input style="width:300px" placeholder="请输入密码" v-model.lazy="password" show-password>
        </el-input>
        <div>
        <el-button class="mTop" @click="pay">确认付款</el-button>
        </div>
      </el-card>

  </div>
</template>

<script>
  export default{
    data(){
      return{
        password:'',
        money:'300.00元'
      }
    },
    methods:{
      pay:function(){
        alert.toString("success");
      }
    }
  }
</script>

<style>
  .mTop{
    margin-top: 15px;
  }
  .tag{
    padding: 15px 0;
  }
  .table{
    margin:auto;
    display: block;
  }
  #title{
    margin: 10px;
  }
  .container1 {
    padding: 5px;
    display: block;
    width: 800px;
    min-height: 300px;
    background-color: #F6F6F6;
    margin:auto;
  }
  p{
    display: inline-block;
  }
  #money{
    text-align: right;
    overflow: hidden;
    color:#c40000;
    font-weight:bold;
    font-size:1.2em;
   }
  #payee{
    float: left;
  }
  #card{
    width: 100%;

  }
  span{
    font-weight:bold;
  }
</style>
