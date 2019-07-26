<template>
  <div class="container1" v-loading="loading">
    <div id="title">
      <div id='payee'>向
      <span>***</span>
      支付
      </div>
      <div style="font-size: 1.5em;" id='money1'>
       ¥{{money}}.00元
      </div>
     </div>

      <el-card id="card">
        <div v-if="payTypeShow">
          <div class="tag">支付方式</div>
          <el-select style="width:300px" v-model="value">
          <el-option
          v-for="item in options"
           :key="item.value"
           :label="item.label"
           :value="item.value"></el-option>
           </el-select>
        </div>

        <div class="tag">支付密码</div>
        <el-input style="width:300px" placeholder="请输入密码" v-model.lazy="password" show-password>
        </el-input>
        <div>
        <el-button class="mTop" @click="Next()">确认付款</el-button>
        <!-- <el-input v-model="payType"></el-input> -->
        </div>
      </el-card>

  </div>
</template>

<script>
export default{
  data () {
    return {
      password: '',
      money: this.$route.params.money,
      payType: this.$route.params.payType,
      options: [{
        value: '选项1',
        label: '零钱支付'
      }, {
        value: '选项2',
        label: '建行银行卡（6222021612002266055）'
      }, {
        value: '选项3',
        label: '工行银行卡（6222020022660552425）'
      } ],
      value: '',
      payTypeShow: true,
      loading: false,
      success: true
    }
  },
  methods: {
    MyAccount () {
      this.$router.push({
        path: '/Order',
        name: 'Order',
        activeName: 'second',
        params: {
          username: this.$route.params.username
        }
      })
    },
    Next () {
      this.loading = true
      const TIME_COUNT = 2
      if (!this.timer) {
        this.count = TIME_COUNT
        this.show = false
        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= TIME_COUNT) {
            this.count--
          } else {
            this.show = true
            clearInterval(this.timer)
            this.timer = null
            // 跳转的页面
            this.MyAccount()
            if (this.success) {
              this.$message({
                message: '支付成功',
                type: 'success'
              })
            } else {
              this.$message({
                message: '支付失败',
                type: 'fail'
              })
            }
          }
        }, 1000)
      }
    }
  },

  created:
      function () {
        console.log(this.payType)
        if (this.payType != null) {
          this.payTypeShow = false
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

  #money1{
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
