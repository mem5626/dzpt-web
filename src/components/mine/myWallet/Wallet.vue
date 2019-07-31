<template>
  <div>
    <div class="address-box">
      <div class="address-header">
        <span>钱包余额</span>
      </div>
      <div class="address-content">
        <div>
          <p style="font-size:50px" >￥{{balance}}</p>
        </div>
        <div style="margin-left:550px;margin-top:70px">
          <el-button @click="Rechange()" type="primary" round>余额充值</el-button>
          <el-button @click="Withdraw()" type="success" round>零钱提现</el-button>
        </div>
      </div>
    </div>
    <div class="address-box" style="cursor:pointer" @click="AddCard()">
      <div style="font-size:20px">
        <i class="el-icon-plus"></i>
        添加银行卡
      </div>
    </div>
    <div v-for="(card,index) in cards" class="address-box">
      <div style="height: 10px;"></div>
      <div class="address-header">
        <span style="font-size:23px">银行卡信息{{index+1}}</span>

        <div class="address-action" @click="DeleteCard(index)">
          <!-- <span @click="DeleteCard(index);"> -->
          <span>
            <Icon type="edit"></Icon> 解除绑定
          </span>
        </div>
      </div>
      <el-divider></el-divider>
      <div class="content1">
        <p>卡号 :{{card.cardNumber}}</p>
        <p>所属银行 : {{card.bank}}</p>
        <p>绑定时间 : {{card.bindTime}}</p>
      </div>
    </div>
  </div>

</template>

<script>
  export default {
    data() {
      return {
        formData: {},
        cardshow: true,
        balance: '',
        userId:'',
        cards: [],
        bill: {},
        params: {
          userId: '1'
        },
        params2: {
          id: '7'
        }
      }
    },
    mounted: function() {
      console.log('a is: 1231231123123323');
      this.getRequest('/mine/getAccount', this.params)
        .then(res => {
          console.log(res);
          this.cards = res.data.data.cardList;
          this.balance = res.data.data.balance;
        }).catch(function(error) {
          console.log(error);
        });
    },
    methods: {
      Rechange() {
        this.$router.push({
          path: '/Mine/Rechange',
          name: 'Rechange',
          params: {
            username: this.$route.params.username,
            userId:this.userId,
            cards:this.cards,
            balance:this.balance,
          }
        })
      },
      Withdraw() {
        this.$router.push({
          path: '/Mine/Withdraw',
          name: 'Withdraw',
          params: {
            username: this.$route.params.username,
            userId:this.userId,
            cards:this.cards,
            balance:this.balance,
          }
        })
      },
      AddCard() {
        this.$router.push({
          path: '/Mine/AddCard',
          name: 'AddCard',
          params: {
            username: this.$route.params.username,
            userId:this.$route.params.userId,
          }
        })
      },
      DeleteCard(index) {
         //this.params2.id=index.id
         //无法在函数中赋值，以及无法立即刷新页面删除
         this.postRequest("/mine/deleteCard",this.params2)
         .then(response => {
           console.log(response);

         })
         .catch(function(error) {
           console.log(error);
         });
      },
      test() {
        this.getRequest("/mine/getBill", this.ps)
          .then(response => {
            console.log(response);
            this.bill = response.data.data.billList;
            console.log(this.bill);
          })
          .catch(function(error) {
            console.log(error);
          });
      },
      test1() {
        this.postRequest("/mine/addCard", this.ps1)
          .then(response => {
            console.log(response);
          })
          .catch(function(error) {
            console.log(error);
          });
      },


    },
    // created:{
    //   activeCards
    // }
  }
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

  .address-action span {
    margin-left: 15px;
    font-size: 14px;
    color: #2d8cf0;
    cursor: pointer;
  }

  .table {
    margin: auto;
    display: block;
  }

  .container {
    display: block;
    min-height: 275px;
    width: 1250px;
    background-color: #F6F6F6;
    margin: auto;
  }
</style>
