<template>
  <div class="box">
    <div class="nav">
      <ul class="location">
        <li>大宗商品交易平台</li>
      </ul>
      <ul class="details">
        <li><p class="username-p">个人{{this.$route.params.msg}}</p>

        </li>
        <li><router-link to="/">网站导航</router-link></li>
        <li><router-link to="/Login">意见反馈</router-link></li>
        <li><router-link to=""><i class="el-icon-shopping-cart-2"></i> 进货单</router-link></li>
        <li><router-link to=""><i class="el-icon-s-comment"></i> 消息</router-link></li>
        </ul>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  }
}
</script>

<style scoped>
.box {
  width: 100%;
  height: 50px;
  background-color: #4488a7;
}
.nav {
  margin: 0% auto;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.nav ul {
  list-style: none;
}
.nav li {
  float: left;
  font-size: 14px;
  line-height: 35px;
  margin-right: 15px;
  font-weight: bold;
}
.nav a {
  text-decoration: none;
  color: #F8F8FF;
  padding-left: 15px;
  border-left: 1px solid #ccc;
  cursor: pointer;
}
.location a {
  border-left: none;
}
.location li {
  font-size:35px;
}
.nav a:hover {
  color: #d9534f;
}
.location {
  margin-top: 6px;
  margin-left: 20px;
  color: #F8F8FF;
}
.details {
    margin-top: 9px;
}
.details li{
    color: #F8F8FF;
}

</style>
