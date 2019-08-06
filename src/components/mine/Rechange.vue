<template>
  <el-card class="address-box">
    <el-page-header @back="MyWallet" content="余额充值">
    </el-page-header>
    <div style="height: 20px;"></div>
    <div style="height: 10px;"></div>
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" label-position="top"
      hide-required-asterisk=false inline-message=false>
      <!--      <div class="tag">请选择储蓄卡</div> -->
      <el-form-item prop="targetItem" label="请选择储蓄卡">
        <el-select v-model="ruleForm.targetItem" value-key="cardNumber" style="width: 300px;position:relative;left:0px"
          size="large">
          <el-option v-for="item in cards" :key="item" :label="`${item.cardNumber}(${item.bank})`" :value="item"></el-option>
        </el-select>
      </el-form-item>

      <!-- <div class="tag">充值金额</div> -->
      <el-form-item prop="money" label="充值金额" >
        <div id=money>¥ <el-input v-model="ruleForm.money" style="width: 300px;" size="large"></el-input>
        </div>
      </el-form-item>
      <el-button class="mTop" type="primary" @click="Pay('ruleForm')">下一步</el-button>
    </el-form>
  </el-card>

</template>

<script>
  export default {
    data() {
      var checkMoney = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('金额不能为空'));
        }
        if (!this.isNumber(value)) {
          return callback(new Error('请输入正整数值'));
        }
        return callback();

      };
      return {
        userId: this.$route.params.userId,
        cards: this.$route.params.cards,
        balance: this.$route.params.balance,
        cardNumber: '',
        money: '',
        targetItem: '',
        tradeWay: '',
        loading: false,
        count: 1,
        change: {
          cardNumber: '零钱',
          bank: '剩余￥' + this.$route.params.balance
        },
        ruleForm: {
          money: '',
          targetItem: '',
        },
        rules: {
          targetItem: [{
            required: true,
            message: '请选择储蓄卡',
            trigger: 'blur'
          }],
          money: [{
            validator: checkMoney,
            trigger: 'blur'
          }],
        },
      }
    },
    created() {
      this.userId = this.userInfo
      console.log(this.cards)
    },
    methods: {
      MyWallet() {
        this.$router.push({
          path: '/Mine/MyWallet',
          name: 'MyWallet',
          params: {
            username: this.$route.params.username
          }
        })
      },
      Pay(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$router.push({
              path: '/Pay',
              name: 'Pay',
              params: {
                userId: this.userId,
                username: this.$route.params.username,
                money: this.ruleForm.money,
                tradeWayName: this.ruleForm.targetItem.cardNumber + '(' + this.ruleForm.targetItem.bank + ')',
                tradeWay: '2', // 支付方式为银行卡
                tradeType: '2', // 支付类型为充值
                drcrflg: '2',
                balance: this.balance,
                to: 'MyAccount'
                // tradeWayName:"`${item.cardNumber}(${item.bank})`"
              }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });

      },
      isNumber(val) {
        var regPos = /^\d+(\.\d+)?$/; //非负浮点数
        var regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //负浮点数
        var Pos = /^[1-9]\d*|0$/; //正整数
        var Poss = /^[0-9]*[1-9][0-9]*$/
        // if(regPos.test(val) || regNeg.test(val)) {
        if (Poss.test(val)) {
          return true;
        } else {
          return false;
        }
      }
    }
  }
</script>

<style>
  .mTop {
    margin-top: 15px;
  }

  .tag {
    padding: 15px 0;
  }

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

  #money {
    position: relative;
    left: -10px;
    font-weight: bold;
    font-size: 1.5em;
  }
</style>
