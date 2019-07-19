<template>
<div>
<div class="Mine">
    <div class="left">
      <div style="margin-left:20px;margin-right:20px;height:400px">
        <div class="address-header">
        <p style="font-color:white;font-size:20px">订单号:</p>
      </div>
      <div class="address-content" >
        <p><span class="address-content-title">商品名 :</span> </p>
        <p><span class="address-content-title">数量 :</span></p>
        <p><span class="address-content-title">整单价格 :</span></p>
        <p><span class="address-content-title">收货人:</span> </p>
        <p><span class="address-content-title">收货人联系方式:</span></p>
        <p><span class="address-content-title">收货地址:</span> </p>
        <p><span class="address-content-title">发货方:</span> </p>
      </div>
     </div>
      <el-button style="margin-top: 12px;">取消订单</el-button>
      <el-button style="margin-top: 12px;" @click="next">确认订单</el-button>
    </div>

    <div class="middle">
    <div class="M" id="M" style="margin-left:20px;margin-right:20px;height:400px">
        <div class="address-header">
        <p style="font-color:white;font-size:20px">合同号:</p>
      </div>
      <div class="address-content" >
        <p><span class="address-content-title">买方 :</span> </p>
        <p><span class="address-content-title">卖方 :</span></p>
        <p><span class="address-content-title">商品名称 :</span></p>
        <p><span class="address-content-title">交易金额 :</span></p>
        <p><span class="address-content-title">押金 :</span> </p>
        <p><span class="address-content-title">其他费用 :</span></p>
        <p><span class="address-content-title">总共费用:</span> </p>
        <p><span class="address-content-title">合同说明:</span> </p>
      </div>
     </div>
      <el-button style="margin-top: 12px;">取消交易</el-button>
      <el-button style="margin-top: 12px;" @click="next">确认合同</el-button>
    </div>

    <div class="right">
       <div style="margin-left:20px;margin-right:20px;height:400px">
        <div class="address-header">
        <p style="font-color:white;font-size:20px">交收单号:</p>
      </div>
      <div class="address-content">
        <p><span class="address-content-title">交收单内容 :</span> </p>

      </div>
     </div>
      <el-button style="margin-top: 12px;">未收货</el-button>
      <el-button style="margin-top: 12px;" @click="next">确认收获</el-button>
    </div>
     <div class="address-action" >
          <span @click="back()" ><i class="el-icon-circle-close" style="font-size:25px;margin-top:15px;color:black"></i></span>
     </div>
</div>


<el-steps :active="active" finish-status="success" space="700px" align-center="true">
  <el-step  title="步骤 1"></el-step>
  <el-step  title="步骤 2"></el-step>
  <el-step  title="步骤 3"></el-step>
</el-steps>


</div>
</template>


<script>

export default{
     data() {
      return {
        active: 0
      };
    },

    methods: {
      next() {
        if (this.active++ > 2) this.active = 0;
      },
      back(){
      this.$router.push({  
          path: '/Product',   
          name: 'Product',  
          params: {   
          username: this.$route.params.username,
          }
      })
     },
      
    }

}
</script>

<style>
.address-action span{
  margin-left: 15px;
  font-size: 40px;
  color: white;
  cursor: pointer;
}
.from {
    width:100%;
}
.Mine {
    display: flex;
    padding:0px;
}
.left {
   height: 500px;
   width:1300px;
   margin-top: 50px;
   margin-left: 20px;
   margin: 15px;
   border-radius: 5px;
   box-shadow: 0px 0px 10px #545c64;
   background-color: #C2C287

}
.middle {
   height: 500px;
   width:1300px;
   margin-top: 50px;
   margin-left: 20px;
   margin: 15px;
   border-radius: 5px;
   box-shadow: 0px 0px 10px #545c64;
   background-color: #007979

}
.right {
   margin: 15px;
   border-radius: 5px;
   box-shadow: 0px 0px 10px #545c64;
   width:1300px;
   background-color: #01814A
}
.back {
    width:100%;
}
.state {
    width:90%;
    height:150px;
    margin-left: 100px
}
.address-header {
  height: 35px;
  display: flex;
  justify-content: space-between;
  color: white;
  font-size: 18px;
}
.address-content {
  margin-top: 15px;
  text-align: left;
  font-size: 14px;
}
.address-content-title {
  color: white;
  font-size:18px
}
.address-action span{
  margin-left: 15px;
  font-size: 14px;
  color: #2d8cf0;
  cursor: pointer;
}
</style>