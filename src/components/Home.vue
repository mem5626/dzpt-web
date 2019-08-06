<template>
  <div>
    <Search></Search>
    <div>
      <el-carousel :interval="4000" type="card" height="350px">
        <el-carousel-item v-for="item in dataimg" :key="item">
          <img :src="item.src">
        </el-carousel-item>
      </el-carousel>
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
            style="width: 100%;height:240px"
            :row-class-name="tableRowClass">
            <el-table-column
              fixed
              prop="createDate"
              label="日期"
              align="center">
            </el-table-column>
            <el-table-column
              prop="listedGoodsId"
              label="商品挂牌单号"
              align="center">
            </el-table-column>
            <el-table-column
              prop="goodsName"
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
import store from '@/vuex/store'
import { mapMutations, mapActions, mapState } from 'vuex'
export default {
  data () {
    return {
      publicmes: [
        { title: '',
          content: '',
          createDate: ''
        }
      ],
      timer: '',
      value: 0,
      dataimg: [{ src: require('../assets/img/3.jpg') },
        { src: require('../assets/img/5.jpg') },
        { src: require('../assets/img/4.jpg') }],
      formInline: {
        user: '',
        standard: ''
      },
      activeIndex: '1',
      activeIndex2: '1',
      tableData1: [],
      i: 0,
      j: 0,
      params: {
        userId: ''
      },
      COUNT: {
        count: 0
      },
      tableData: [{}, {}, {}]
    }
  },
  components: {
    Search
  },
  computed: {
    ...mapState(['userInfo']),
    ...mapState(['messageInfo'])
  },
  created () {
    this.getMsg()
    this.getBillList()
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
    ...mapMutations(['SET_USER_LOGIN_INFO', 'SET_MESSAGE_INFO']),
    ...mapActions(['login', 'setMsg', 'isMessage', 'isLogin']),
    ...mapState(['userInfo', 'messageInfo']),
    getMsg () {
      this.isMessage()
      this.isLogin()
      console.log('msg66663')
      this.COUNT.count = 0
      this.params.userId = this.userInfo.userId
      console.log('qqq' + this.params.userId)
      this.getRequest('/message/getMessageList', this.params)
        .then((response) => {
          console.log('response.data')
          console.log(response.data)
          for (const i in response.data.data.messageList) {
            response.data.data.messageList[i].createDate = this.dateFormat(response.data.data.messageList[i].createDate)
            if (response.data.data.messageList[i].isRead) {
              response.data.data.messageList[i].isRead = '已读'
            } else {
              this.COUNT.count = this.COUNT.count + 1
              response.data.data.messageList[i].isRead = '未读'
            }
          }
          this.setMsg(this.COUNT)
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    getBillList () {
      this.getRequest('/tradeBill/getTradeBill')
        .then((response) => {
          console.log(response.data.data.tradeBillList)
          for (const i in response.data.data.tradeBillList) {
            response.data.data.tradeBillList[i].createDate = this.dateFormat(response.data.data.tradeBillList[i].createDate)
            response.data.data.tradeBillList[i].price = parseInt(response.data.data.tradeBillList[i].price) * parseInt(response.data.data.tradeBillList[i].amount)
          }
          this.tableData = response.data.data.tradeBillList
          this.tableData1 = this.tableData
          console.log('this.tableData' + this.tableData)
        })
        .catch(function (error) {
          console.log(error)
        })
    },

    tableRowClass ({ row, rowIndex }) {
      if (rowIndex === 1) {
        return 'warning-row'
      } else if (rowIndex === 3) {
        return 'success-row'
      }
      return ''
    },
    onSubmit () {
      console.log('submit!')
    },
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    },
    get () {
      this.i = 0
      this.tableData.splice(0, 1)
      this.tableData.push(this.tableData1[this.i])
      this.j = this.$tableData1.length
      if (this.i === this.j) {
        this.i = 0
      } else {
        this.i++
      }
    }
  },
  mounted () {
    this.timer = setInterval(this.get, 3800)
  },
  beforeDestroy () {
    clearInterval(this.timer)
  },
  store

}
</script>

<style>
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
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
  margin: 10px auto 0 auto;
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
