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
      <el-card shadow="hover">
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
            <el-menu-item index="1" style="font-size:22px"><i class="el-icon-message-solid" style="heignt:20px"></i>
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
      </el-card>
    </div>

    <div class="container">
      <div class="flex">
        <div class="leftarea">
          <el-card shadow="hover">
            <el-avatar shape="square" src="../static/img/zwei.jpg"
                       style="height: 250px; width: 250px;"></el-avatar>
          </el-card>
        </div>
        <div class="rightarea">
          <el-card shadow="hover" style="padding: 0px 10px 0 10px;height:293px">
            <p style="font-size: 20px;font-weight:bold;">网站公告</p>
            <!-- <ul>
              <li  v-for="mes in publicmes" style="list-style-type: none; width: 100%; margin: 2px 0">
                <span type="primary" :underline="false">
                  《{{mes.title}}》  {{mes.createDate}}
                </span>
                <p>
                <span type="primary" :underline="false">
                  内容：{{mes.content}}
                </span>
                </p>
                <hr style="border: 1px solid; color: #dddddd"/>
              </li>
            </ul> -->
            <el-carousel height="180px" direction="vertical" :autoplay="ture" indicator-position="none" style="background-color:rgb(63, 62, 62)">
              <el-carousel-item v-for="item in publicmes" :key="item" style="width:100%">
              <!-- <h3 class="medium">{{ item.title }}</h3> -->
              <div style="text-align:center;margin-top:30px">
                <p class="item">{{ item.title }}</p>
                <p class="item">{{ item.content }}</p>
                <p class="item">{{ item.createDate }}</p>
              </div>
              </el-carousel-item>
              </el-carousel>
            </el-card>
          </div>

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
      publicmes: [
        { title: '',
          content: '',
          createDate: ''
        }
      ],
      dataimg: [{ src: require('../assets/img/3.jpg') },
        { src: require('../assets/img/5.jpg') },
        { src: require('../assets/img/4.jpg') }],
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
    this.getRequest('/message/getSystemMessage')
      .then((response) => {
        console.log(response.data)
        for (const i in response.data.data.messageList) {
          response.data.data.messageList[i].createDate = this.dateFormat(response.data.data.messageList[i].createDate)
        }
        this.publicmes = response.data.data.messageList
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
  margin: 30px auto 0 auto;
  padding-bottom: 20px;
  max-width: 1200px;
}
.content {
  width: 1008px;
  margin: 0px auto;
}

.flex {
  height: 300px;
  display: flex;
}

.leftarea {
  height: 250px;
  width: 250px;
  margin-right: 40px;
  flex: 1 1 0;
}
.rightarea {
  text-align: left;
  flex: 3 1 0;
}

 .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }

  .item {
    font-size:15px;
    color:white
  }
</style>
