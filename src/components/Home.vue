<template>
  <div class="container">
    <Search></Search> 
    <div class="play">
        <el-row :gutter="0">
			<el-carousel :interval="0" arrow="never" height="350px" margin-left=0 type="card">
				<el-carousel-item v-for="item in dataimg" :key="item">
					<div class="grid-content">
						<el-col :md="12" :offset="6">
							<div>
								<img :src="item.src">
								<p class="italictext">{{item.txt}}</p>
								<span class="service">{{item.txt2}}</span>
								<p class="last">{{item.txt3}}</p>
							</div>
						</el-col>
					</div>
				</el-carousel-item>
			</el-carousel>
		</el-row>
    </div>
    <div id="new">
        <el-menu
          :default-active="activeIndex2"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b">
          <!-- <el-menu-item index="1" style="font-size:28px"><i class="el-icon-message-solid"></i></el-menu-item> -->
          <el-menu-item index="1" style="font-size:28px"><i class="el-icon-message-solid" style="heignt:30px"></i>交易播报</el-menu-item>
        </el-menu>
    </div>
    <div>
        <el-table
            :data="tableData"
            style="width: 100%"
            height="250">
            <el-table-column
              fixed
              prop="date"
              label="日期"
              width="150">
            </el-table-column>
            <el-table-column
              prop="product_name"
              label="商品名"
              width="200">
            </el-table-column>
            <el-table-column
              prop="seller"
              label="供应商"
              width="200">
            </el-table-column>
            <el-table-column
              prop="number"
              label="数量"
              width="150">
            </el-table-column>
            <el-table-column
              prop="price"
              label="价格"
              width="150">
            </el-table-column>
            <el-table-column
              prop="standard"
              label="质量标准"
              width="150">
            </el-table-column>
            <el-table-column
              prop="site"
              label="交货地"
              width="250">
            </el-table-column>
        </el-table>
    </div>

  </div>

</template>

<script>
import Search from '@/components/Search';
export default {
  // created(){
  //    var mess =this.$route.params.msg,
  //    if(mess=='xxx') {
  //      alert('submitqqq!');
  //    }
  // },
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
          product_name: '煤炭',
          seller:'上海煤炭销售总部',
          number:'100kg',
          price:'8000元',
          standard:'进口货',
          site: '上海市普陀区金沙江路 1518 弄',
        }, {
          date: '2019-05-03',
          product_name: '煤炭',
          seller:'上海煤炭销售总部',
          number:'100kg',
          price:'8000元',
          standard:'进口货',
          site: '上海市普陀区金沙江路 1518 弄',
        }, {
          date: '2019-05-03',
          product_name: '煤炭',
          seller:'上海煤炭销售总部',
          number:'100kg',
          price:'8000元',
          standard:'进口货',
          site: '上海市普陀区金沙江路 1518 弄',
        }, {
          date: '2019-05-03',
          product_name: '煤炭',
          seller:'上海煤炭销售总部',
          number:'100kg',
          price:'8000元',
          standard:'进口货',
          site: '上海市普陀区金沙江路 1518 弄',
        }, {
         date: '2019-05-03',
          product_name: '煤炭',
          seller:'上海煤炭销售总部',
          number:'100kg',
          price:'8000元',
          standard:'进口货',
          site: '上海市普陀区金沙江路 1518 弄',
        }, {
          date: '2019-05-03',
          product_name: '煤炭',
          seller:'上海煤炭销售总部',
          number:'100kg',
          price:'8000元',
          standard:'进口货',
          site: '上海市普陀区金沙江路 1518 弄',
        }, {
          date: '2019-05-03',
          product_name: '煤炭',
          seller:'上海煤炭销售总部',
          number:'100kg',
          price:'8000元',
          standard:'进口货',
          site: '上海市普陀区金沙江路 1518 弄',
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
    height:400px;
    margin-right: 130px;
    margin-left:0px;
}
.new {
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