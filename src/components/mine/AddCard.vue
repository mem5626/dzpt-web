<template>
  <el-card v-loading="loading" class="address-box" >
      <el-page-header @back="MyAccount()" content="添加银行卡">
      </el-page-header>
       <div style="height: 20px;"></div>
      <div style="height: 10px;"></div>
      <div class="tag">请填写银行卡信息</div>
      <div class="tag" style="position: relative; left: -15px;">银行卡卡号：
      <el-input v-model="params.cardNumber" style="width: 300px;" size="large">
      </el-input></div>
      <div class="tag" style="position: relative; left: -7px;" >所属银行：<el-input v-model="params.bank" style="width: 300px;" size="large"></el-input></div>
      <div class="tag" >安全码：<el-input v-model="params.userId" style="width: 300px;" size="large"></el-input></div>
      <div style="height: 30px;"></div>
      <div class="tag" style="position: relative; left: -70px;">
        <el-checkbox v-model="checked">同意</el-checkbox>
        <el-link style="position: relative; left: -34px;" @click="centerDialogVisible = true" type="primary">用户协议</el-link>
        <el-dialog
  title="用户协议"
  :visible.sync="centerDialogVisible"
  width="30%"
  center>
  <span>  <p>
&nbsp; &nbsp; &nbsp; 深圳投哪金融服务有限公司（以下均简称“投哪网”）在此提醒您（以下称“您”或称“用户”）认真阅读理解本协议，包括免除或者限制投哪网责任的免责条款及对您的权利限制条款；您确认，在您使用投哪网的各项服务之前，您已充分阅读、理解并接受本协议的全部内容，一旦您在“我已阅读以上协议”前勾选，并点击“保存”按钮，即表示您同意遵循本协议之所有约定，一旦您使用投哪网的全部或部分服务,亦表示您同意遵循本协议之所有约定。本协议在您和投哪网之间具有合同上的法律效力。<br />
&nbsp; &nbsp; &nbsp;甲方：全体投哪注册用户（以上以下简称“你”或称“用户”）<br />
&nbsp; &nbsp; &nbsp;乙方：深圳投哪金融服务有限公司（以上以下均简称“投哪网”）<br />
&nbsp; &nbsp; &nbsp;一、 您同意通过本协议选定的您银行卡（以下简称“银行卡”）在投哪网平台与您在第三方支付机构的托管账户上进行绑定、开通快捷支付业务，即本协议所述的“绑定”为扣款银行卡的确定，一旦绑定成功，第三方支付机构每次扣款前无需输入您绑定的银行卡账号、密码等信息，也无需您提交绑定的银行卡进行刷卡<br />
&nbsp; &nbsp; &nbsp;二、 您承诺上述选定的银行卡的开户证件信息与您身份证件信息完全一致。<br />
&nbsp; &nbsp; &nbsp;三、 您允许投哪网向快捷支付第三方支付机构发送您的信息（包括但不限于您的身份信息、银行信息、投哪网注册信息等涉及您个人的各项信息）以便完成快捷支付业务。<br />
&nbsp; &nbsp; &nbsp;四、 投哪网向第三方支付机构发送的您的一切信息是依据您自己主动填写的信息，投哪网有权利但无义务审查您的银行卡信息与身份证件信息。投哪网不对是否进行审查核实做出任何承诺，一切以您填写的信息为准。<br />
&nbsp; &nbsp; &nbsp;五、 您必须按照第三方支付机构的快捷支付协议的要求绑定符合第三方支付机构要求的银行卡，并且您承诺是绑定的银行卡的合法持卡人（指银行卡账户的开户主体，下同）。<br />
&nbsp; &nbsp; &nbsp;六、 其他有关绑定银行卡、开通快捷支付的权利义务详见您与第三方支付机构达成的快捷支付协议的各项约定。<br />
&nbsp; &nbsp; &nbsp;七、 您与第三方支付机构因快捷支付相关事宜发生的争议与纠纷，请您按照您与第三方支付机构之间的快捷支付协议的约定解决，投哪网不对您与第三方支付机构之间的争议承担任何责任。<br />
&nbsp; &nbsp; &nbsp;八、 您的个人资料受到严格保护，不接受投哪网、第三方支付机构、您银行卡开户行及您之外的任何个人或单位的查询请求。但法律法规（含行政规章、民族自治地方的自治条例和单行条例，下同）、司法机关、监管机构、你与第三方支付机构之前的快捷支付协议另有规定或要求，或为开通快捷支付之需要确有必要披露的除外。<br />
&nbsp; &nbsp; &nbsp;九、 您承诺如果因您违反本协议或者与第三方支付机构之间的协议造成投哪网损失的，投哪网有权向你追究法律责任。
</p>
<p>
<br />
</p></span>
  <span slot="footer" class="dialog-footer">
    <el-button @click="centerDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
  </span>
</el-dialog>

        </div>
      <el-button v-if="checked" class="mTop" type="primary" @click="AddCard()">下一步</el-button>
      <el-button v-else class="mTop" type="primary" disabled>下一步</el-button>
  </el-card>
</template>

<script>
import store from '@/vuex/store'
import { mapActions, mapState } from 'vuex'
export default {
  data () {
    return {
      loading: false,
      cardNumber: '6222021612002266055',
      checked: false,
      securityCode: '',
      centerDialogVisible: false,
      success: true,
      params: {
        userId: '',
        cardNumber: '',
        bank: ''
      }
    }
  },
  computed: {
    ...mapState(['goodInfo']),
    ...mapState(['userInfo'])
  },
  methods: {
    MyAccount () {
      this.$router.push({
        path: '/Mine/MyWallet',

        name: 'MyWallet',
        activeName: 'second',
        params: {
          username: this.$route.params.username
        }
      })
    },
    AddCard () {
      this.loading = true
      this.postRequest('/mine/addCard', this.params).then(res => {
        console.log(res)
        this.MyAccount()
        if (this.success) {
          this.$message({
            message: '银行卡绑定成功',
            type: 'success'
          })
        } else {
          this.$message({
            message: '银行卡绑定失败',
            type: 'fail'
          })
        }
      }).catch(function (error) {
        console.log(error)
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
                message: '银行卡绑定成功',
                type: 'success'
              })
            } else {
              this.$message({
                message: '银行卡绑定失败',
                type: 'fail'
              })
            }
          }
        }, 1000)
      }
    }

  },
  store
}
</script>

<style>
  #header{
      font-weight:bold;
      font-size:1.5em;
    }
  .mTop{
      margin-top: 15px;
    }
    .tag{
      padding: 15px 0;
    }
    .sTag{
      position:relative;
      left: 50px;
      display: inline-block;
      padding: 5px 0;
      font-size:0.5em;
    }
   .address-box {
    padding: 15px;
    margin: 15px;
    border-radius: 5px;
    box-shadow: 0px 0px 10px #545c64;
    }
    .address-header {
      /* height: 35px; */
      display: flex;
      justify-content: space-between;
      /* color: #232323; */
      /* font-size: 18px; */
    }
    .address-content {
      text-align: left;
      font-size: 14px;
    }
    #money{
      position: relative;
      left: -10px;
      font-weight:bold;
      font-size:1.8em;
     }
</style>
