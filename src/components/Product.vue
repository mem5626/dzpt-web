<template>
  <div>
    <Search></Search> 
    <div id="product">
      <div class="address-box">
        <div class="address-header">
        <div class="product-title">挂牌单号:{{this.$route.params.type}}{{this.$route.params.username}}</div>
        <div class="address-action">
          <span @click="back()"><i class="el-icon-circle-close"></i></span>
        </div>
      </div>
        <!-- <div class="Bigtitle">
          <p><span class="product-title">挂牌号 :</span> {{info.username}}</p>
        </div> 
        <div class="address-action">
          <span @click="edit()"><Icon type="edit"></Icon> 修改</span>
        </div> -->
        <div class="box">
        <div class="address-content">
           <p><span class="address-content-title">商品名称 :</span> {{info.username}}</p>
           <p><span class="address-content-title">挂牌数量 :</span> {{info.username}}</p>
           <p><span class="address-content-title">质量标准 :</span> {{info.gender}}</p>
           <p><span class="address-content-title">挂单企业 :</span> {{info.gender}}</p>
        </div>
        <div class="address-content1">
           <p><span class="address-content-title">挂牌日期 :</span> {{info.username}}</p>
           <p><span class="address-content-title">整单价格 :</span> {{info.username}}</p>
           <p><span class="address-content-title">企业地址 :</span> {{info.gender}}</p>
        </div>
        </div>
        <div>
          <el-row calss="Btn">
            <el-button type="primary" plain calss="btn" @click="add()">加入进货单</el-button>
            <el-button type="success" plain calss="btn" @click="buy()">立即购买</el-button>
            <el-button type="danger" plain calss="btn" @click="dialogFormVisible = true">议价</el-button>
          </el-row>
      </div>
      </div>

    </div>

    <el-dialog title="议价单" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="期望价格" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input v-model="form.region" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="success()">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import Search from '@/components/Search2';
export default {
   components: {
    Search
   },
  data () {
    return {
      formData: {
        nickname: '',
        age: '',
        province: '',
        city: '',
        area: '',
        address: '',
        postalcode: '',
        phone: '',
      },
      info: {},
      dialogTableVisible: false,
        dialogFormVisible: false,
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        formLabelWidth: '120px'
    };
  },
  methods: {
      back(){
          if(this.$route.params.type=="c123"){
              this.$router.push({  
                  path: '/Mine/MyCar',   
                  name: 'MyCar',  
                  params: {   
                  username: this.$route.params.username,
                  }
              })
          }
          else{
              this.$router.push({  
                  path: '/Sell',   
                  name: 'Sell',  
                  params: {   
                  username: this.$route.params.username,
                  }
              })
          }
     },
     buy(){
      this.$router.push({  
          path: '/Order',   
          name: 'Order',  
          params: {   
          username: this.$route.params.username,
          type: "buy"
          }
      })
     },
     success() {
         this.dialogFormVisible = false
        //  alert("议价单已提交！")
        this.$alert('议价单提价成功', '执行结果', {
          confirmButtonText: '确定',
        });
     },
     add() {
        if (this.active++ > 2) this.active = 0;
        this.$alert('加入进货单成功', '执行结果', {
          confirmButtonText: '确定',
        });
      }
  }
};
</script>

<style scoped>
.product {
    background-color: black;
    width:100%;
    height:500px
}

.address-box {
  padding: 15px;
  margin: 15px;
  border-radius: 5px;
  background-color: darkslategray;
  box-shadow: 0px 0px 10px #545c64;
}
.box {
  display: flex;
}
.address-content-title {
  color: white;
  font-size:18px
}
.product-title {
  color: white;
  font-size:22px
}
.Bigtitle {
  text-align: left;
  display: flex;
}
.address-content {
    width:650px;
    text-align: left;
}
.address-content1 {
    width:500px;
    text-align: left;
}
.Btn {
    margin-top:20px;
}
.btn {
    margin-left:100px
}
.address-action span{
  margin-left: 15px;
  font-size: 20px;
  color: white;
  cursor: pointer;
}
.address-header {
  height: 35px;
  display: flex;
  justify-content: space-between;
  color: #232323;
  font-size: 18px;
}
</style>
