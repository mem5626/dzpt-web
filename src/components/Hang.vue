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
          <el-menu-item index="1" style="font-size:28px"><i class="el-icon-s-flag" style="heignt:30px"></i>我的挂牌</el-menu-item>
        </el-menu>
    </div>
    <div>
        <el-table
            :data="tableData"
            style="width: 100%"
            max-height="250">
            <el-table-column
              fixed
              prop="date"
              label="挂牌日期"
              width="150">
            </el-table-column>
            <el-table-column
              fixed
              prop="type"
              label="挂牌类型"
              width="150">
            </el-table-column>
            <el-table-column
              prop="hang_number"
              label="挂单号"
              width="150">
            </el-table-column>
            <el-table-column
              prop="product_name"
              label="商品名"
              width="200">
            </el-table-column>
            <el-table-column
              prop="number"
              label="挂单数量"
              width="150">
            </el-table-column>
            <el-table-column
              prop="price"
              label="整单价格"
              width="150">
            </el-table-column>
            <el-table-column
              prop="standard"
              label="质量标准"
              width="150">
            </el-table-column>
            <el-table-column
              prop="other"
              label="交易方"
              width="200">
            </el-table-column>
            <el-table-column
              prop="addr"
              label="交易方地址"
              width="200">
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              width="150">
              <template slot-scope="scope">
                  <el-button
                  @click.native.prevent="deleteRow(scope.$index, tableData)"
                  type="text"
                  size="small">
                  编辑
                </el-button>
                <el-button
                  @click.native.prevent="deleteRow(scope.$index, tableData)"
                  type="text"
                  size="small">
                  删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
    </div>

  </div>

</template>

<script>
import Search from '@/components/Search3';
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
          type:'出售',
          hang_number: 'G123985220',
          product_name:'煤炭',
          other:'北京煤炭销售总部',
          number:'100kg',
          price:'8000元',
          standard:'进口货',
          addr: '北京市海淀区北下关街道上园村3号',
        }, {
          date: '2019-05-03',
          type:'购入',
          hang_number: 'G123985220',
          product_name:'煤炭',
          other:'北京煤炭销售总部',
          number:'100kg',
          price:'8000元',
          standard:'进口货',
          addr: '北京市海淀区北下关街道上园村3号',
        }]
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      },
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
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
