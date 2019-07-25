<template>
  <div>
    <Search></Search>
    <div class="play">
        <el-row :gutter="0">
          <el-carousel :interval="0" arrow="never"
                       height="350px"
                       type="card">
            <el-carousel-item v-for="item in dataimg" :key="item">
              <div>
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
    <div  class="container">
      <div id="new">
        <el-menu
          :default-active="activeIndex2"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
          text-color="#fff"
          active-text-color="#ffd04b">
          <!-- <el-menu-item index="1" style="font-size:28px"><i class="el-icon-message-solid"></i></el-menu-item> -->
          <el-menu-item index="1" style="font-size:28px"><i class="el-icon-message-solid" style="heignt:30px"></i>
            交易播报</el-menu-item>
        </el-menu>
      </div>
      <div>
        <el-table
            :data="tableData"
            style="width: 100%"
            height="250">
            <el-table-column
              fixed
              prop="createDate"
              label="日期"
              align="center">
            </el-table-column>
            <el-table-column
              prop="listGoodsId"
              label="商品挂牌单号"
              align="center">
            </el-table-column>
            <el-table-column
              prop="goodName"
              label="商品名"
              align="center">
            </el-table-column>
            <el-table-column
              prop="seller"
              label="供应商"
              align="center">
            </el-table-column>
            <el-table-column
              prop="buyer"
              label="收货人"
              align="center">
            </el-table-column>
            <el-table-column
              prop="price"
              label="交易额"
              align="center">
            </el-table-column>
        </el-table>
      </div>
    </div>
  </div>

</template>

<script>
import Search from '@/components/search/Search'
export default {
  components: {
    Search
  },
  data () {
    return {
      dataimg: [{src: require('../assets/img/2.jpg')},
        {src: require('../assets/img/2.jpg')},
        {src: require('../assets/img/3.jpg')}],
      formInline: {
        user: '',
        standard: ''
      },
      activeIndex: '1',
      activeIndex2: '1',
      tableData: []
    }
  },
  created () {
    this.getRequest('/tradeBill/getTradeBill')
      .then((response) => {
        console.log(response.data)
        this.tableData = response.data.data.tradeBillList
      })
      .catch(function (error) {
        console.log(error)
      })
  },
  methods: {
    onSubmit () {
      console.log('submit!')
    },
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    }
  }

}
</script>

<style scoped>

body {
  background-color: #F6F6F6;
}

.nav-body {
  width: 100%;
  height: 380px;
  margin: 0px auto;
  background-color:#6e6568
}

.play {
    margin-right: 150px;
    margin-left:10px;
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
  margin: 0 auto;
  width: 1200px;
}
.content {
  width: 1008px;
  margin: 0px auto;
}

</style>
