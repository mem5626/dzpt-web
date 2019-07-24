<template>
  <div class="container">
    <Search></Search>
    <div>
        <el-menu
          :default-active="activeIndex2"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#FFFAFA">
          <el-menu-item index="1" style="font-size:28px"><i class="el-icon-s-goods" style="heignt:30px"></i>卖方挂牌商品</el-menu-item>
        </el-menu>
    </div>
    <div>
        <el-table
            :data="tableData"
            style="width: 100%"
            max-height="250">
            <el-table-column
              fixed
              prop="createDate"
              label="挂牌日期"
              width="150">
            </el-table-column>
            <el-table-column
              prop="listedGoodsId"
              label="挂牌号"
              width="150">
            </el-table-column>
            <el-table-column
              prop="goodsName"
              label="商品名"
              width="200">
            </el-table-column>
            <el-table-column
              prop="supplier"
              label="挂单方"
              width="200">
            </el-table-column>
            <el-table-column
              prop="address"
              label="地址"
              width="200">
            </el-table-column>
            <el-table-column
              prop="amount"
              label="挂单数量"
              width="150">
            </el-table-column>
            <el-table-column
              prop="price"
              label="商品单价"
              width="150">
            </el-table-column>
            <el-table-column
              prop="region"
              label="商品来源"
              width="150">
            </el-table-column>
            <el-table-column
              prop="quality"
              label="质量标准"
              width="150">
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              width="150">
              <template slot-scope="scope">
                <el-button @click.native.prevent="buy(scope.$row, tableData)" type="text" size="small"> 购买</el-button>
              </template>
            </el-table-column>
          </el-table>
    </div>

    <div style="margin-top:60px">
        <el-menu
          :default-active="activeIndex2"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
          background-color="#800000"
          text-color="#fff"
          active-text-color="#ffd04b">
          <el-menu-item index="1" style="font-size:28px"><i class="el-icon-goods" style="heignt:30px"></i>买方挂牌商品</el-menu-item>
        </el-menu>
    </div>
    <div>
        <el-table
            :data="tableData1"
            style="width: 100%"
            max-height="250">
            <el-table-column
              fixed
              prop="createDate"
              label="挂牌日期"
              width="150">
            </el-table-column>
            <el-table-column
              prop="listedGoodsId"
              label="挂牌号"
              width="150">
            </el-table-column>
            <el-table-column
              prop="goodsName"
              label="商品名"
              width="200">
            </el-table-column>
            <el-table-column
              prop="supplier"
              label="挂单方"
              width="200">
            </el-table-column>
            <el-table-column
              prop="address"
              label="地址"
              width="200">
            </el-table-column>
            <el-table-column
              prop="amount"
              label="需求数量"
              width="150">
            </el-table-column>
            <el-table-column
              prop="price"
              label="接受价格"
              width="150">
            </el-table-column>
            <el-table-column
              prop="region"
              label="商品来源"
              width="150">
            </el-table-column>
            <el-table-column
              prop="quality"
              label="质量标准"
              width="150">
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              width="150">
              <template >
                <el-button
                  @click.native.prevent="chat()"
                  type="text"
                  size="small">
                  联系一下
                </el-button>
              </template>
            </el-table-column>
          </el-table>
    </div>
    <el-dialog title="提醒他 我有货" :visible.sync="dialogFormVisible">
          <el-form :model="form">
            <el-form-item label="请输入您的商品的挂牌单号" >
              <el-input v-model="form.password" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="请输入您的联系方式（选填）">
              <el-input v-model="form.newpassword" autocomplete="off" ></el-input>
            </el-form-item>
        </el-form>
         <div slot="footer" class="dialog-footer">
           <el-button @click="dialogFormVisible = false">取 消</el-button>
           <el-button type="primary" @click="commit()">确 定</el-button>
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
  data() {
      return {
        dataimg: [{
				src: require('../assets/img/3.jpg'),
			},
			{
				src: require('../assets/img/1.jpg'),

			},
			{
				src: require('../assets/img/6.jpg'),
			}
		],
        formInline: {
          user: '',
          region: ''
        },
        activeIndex: '1',
        activeIndex2: '1',
        tableData: [{
          date: '2019-05-03',
          hang_number: 'G123985220',
          product_name:'煤炭',
          company:'北京煤炭销售总部',
          number:'100kg',
          price:'8000元',
          standard:'进口货',
          addr: '北京市海淀区北下关街道上园村3号',
        }, {
          date: '2019-05-03',
          hang_number: 'G123985220',
          product_name:'煤炭',
          company:'北京煤炭销售总部',
          number:'100kg',
          price:'8000元',
          standard:'进口货',
          addr: '北京市海淀区北下关街道上园村3号',
        }, {
          date: '2019-05-03',
          hang_number: 'G123985220',
          product_name:'煤炭',
          company:'北京煤炭销售总部',
          number:'100kg',
          price:'8000元',
          standard:'进口货',
          addr: '北京市海淀区北下关街道上园村3号',
        }, {
          date: '2019-05-03',
          hang_number: 'G123985220',
          product_name:'煤炭',
          company:'北京煤炭销售总部',
          number:'100kg',
          price:'8000元',
          standard:'进口货',
          addr: '北京市海淀区北下关街道上园村3号',
        }, {
         date: '2019-05-03',
          hang_number: 'G123985220',
          product_name:'煤炭',
          company:'北京煤炭销售总部',
          number:'100kg',
          price:'8000元',
          standard:'进口货',
          addr: '北京市海淀区北下关街道上园村3号',
        }, {
          date: '2019-05-03',
          hang_number: 'G123985220',
          product_name:'煤炭',
          company:'北京煤炭销售总部',
          number:'100kg',
          price:'8000元',
          standard:'进口货',
          addr: '北京市海淀区北下关街道上园村3号',
        }, {
          date: '2019-05-03',
          hang_number: 'G123985220',
          product_name:'煤炭',
          company:'北京煤炭销售总部',
          number:'100kg',
          price:'8000元',
          standard:'进口货',
          addr: '北京市海淀区北下关街道上园村3号',
        }],
        tableData1: [{
          date: '2019-07-17',
          hang_number: 'S123985220',
          product_name:'水泥',
          company:'北京建筑有限公司',
          number:'12t',
          price:'80000元',
          standard:'无',
          addr: '北京市海淀区北下关街道上园村3号',
        }, {
          date: '2019-07-17',
          hang_number: 'S123985220',
          product_name:'水泥',
          company:'北京建筑有限公司',
          number:'12t',
          price:'80000元',
          standard:'无',
          addr: '北京市海淀区北下关街道上园村3号',
        }, {
          date: '2019-07-17',
          hang_number: 'S123985220',
          product_name:'水泥',
          company:'北京建筑有限公司',
          number:'12t',
          price:'80000元',
          standard:'无',
          addr: '北京市海淀区北下关街道上园村3号',
        }, {
          date: '2019-07-17',
          hang_number: 'S123985220',
          product_name:'水泥',
          company:'北京建筑有限公司',
          number:'12t',
          price:'80000元',
          standard:'无',
          addr: '北京市海淀区北下关街道上园村3号',
        }, {
         date: '2019-07-17',
          hang_number: 'S123985220',
          product_name:'水泥',
          company:'北京建筑有限公司',
          number:'12t',
          price:'80000元',
          standard:'无',
          addr: '北京市海淀区北下关街道上园村3号',
        }, {
         date: '2019-07-17',
          hang_number: 'S123985220',
          product_name:'水泥',
          company:'北京建筑有限公司',
          number:'12t',
          price:'80000元',
          standard:'无',
          addr: '北京市海淀区北下关街道上园村3号',
        }, {
          date: '2019-07-17',
          hang_number: 'S123985220',
          product_name:'水泥',
          company:'北京建筑有限公司',
          number:'12t',
          price:'80000元',
          standard:'无',
          addr: '北京市海淀区北下关街道上园村3号',
        }],
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
      }
    },
    created(){
      this.axios.get('http://192.168.100.30/hang/getSellerHangList',{
      params:{hangType: '售出'}
      })
      .then(response => {
        console.log(response.data);
        this.tableData = response.data.data.hangList;
      }),
      this.axios.get('http://192.168.100.30/hang/getBuyerHangList',{
      params:{hangType: '需求'}})
      .then(response => {
        console.log(response.data);
        this.tableData1 = response.data.data.hangList;
      })

    },
    methods: {
      onSubmit() {
        console.log('submit!');
      },
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      buy(){
      this.$router.push({
          path: '/Product',
          name: 'Product',
          params: {
          username: this.$route.params.username,
          }
      })
      },
      success() {
         this.dialogFormVisible = false
        //  alert("议价单已提交！")
     },
     chat() {
        this.dialogFormVisible = true;
     },
      commit(){
          this.dialogFormVisible = false;
          this.$alert('联系成功', '执行结果', {
          confirmButtonText: '确定',
        });
      }
    }

};
</script>


<style scoped>
.nav-body {
  width: 100%;
  height: 380px;
  margin: 0px auto;
  background-color:#6e6568
}
.play {
    margin-right: 130px;
    margin-left:0px;
}
.button1 {
    width:20px;
    margin-top:20px;
}
/*导航内容*/
.nav-content {
  width: 100%;
  overflow: hidden;
  float: left;
}
/*导航图片*/
.nav-show-img {
  margin-top: 10px;
  float: left;
}
.nav-show-img:nth-child(2) {
  margin-left: 12px;
}
.container {
  background-color: #F6F6F6;
}
.content {
  width: 1008px;
  margin: 0px auto;
}

</style>
