<template>
  <div>
    <div class="container">
      <el-input
        v-model="sreachData"
        size="large"
        class="sreach"
        placeholder="输入你想查找商品的挂牌单号"
      >
        <el-button
          slot="append"
          type="primary"
          style="background-color:#4488a7;color:white"
          @click="sreach()"
          >查询</el-button
        >
      </el-input>
    </div>
    <div>
      <div class="search-nav">
        <div class="search-nav-container">
          <ul>
            <li @click="Home()"><router-link to="/">网站首页</router-link></li>
            <li @click="Sell()">交易大厅</li>
            <li class="second-child" style="color:white">挂牌中心</li>
            <li><router-link to="">交易指南</router-link></li>
          </ul>
        </div>
      </div>
    </div>
    <div>
      <el-menu> </el-menu>
    </div>
  </div>
</template>

<script>
import store from '@/vuex/store'
import { mapMutations, mapActions, mapState } from 'vuex'
export default {
  computed: {
    ...mapState(['goodInfo', 'userInfo'])
  },
  created () {
    this.isGood()
  },
  name: 'Search',
  data () {
    return {
      sreachData: '',
      promotionTags: [],
      activeIndex: '1',
      activeIndex2: '1',
      DATA: {
        listedGoodsId: '',
        status: 'Home'
      },
      res1: {
        code: '',
        msg: ''
      },
      SDATA: {
        listedGoodsId: ''
      }
    }
  },
  methods: {
    ...mapMutations(['SET_GOODS_INFO']),
    ...mapActions(['loadGood', 'isGood']),
    ...mapState(['goodInfo']),
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    },
    closeTags (index) {
      this.promotionTags.splice(index, 1)
    },
    selectTags (index) {
      this.sreachData = this.promotionTags[index]
    },
    sreach () {
      this.loadGood(this.sreachData)
      this.DATA.listedGoodsId = this.sreachData
      this.SDATA.listedGoodsId = this.sreachData
      this.getRequest('/search/searchHangGood', this.SDATA)
        .then((response) => {
          console.log('response.data' + response.data)
          this.res1 = response.data
          if (this.res1.code === '1') {
            this.info = response.data.data
            this.loadGood(this.DATA)
            this.$router.push({
              path: '/Product',
              name: 'Product'
            })
          } else {
            this.$alert('商品不存在！', '执行结果', {
              confirmButtonText: '确定',
              callback: action => {
                return false
              }
            })
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    Sell () {
      this.$router.push({
        path: '/Sell',
        name: 'Sell',
        params: {
          username: this.$route.params.username
        }
      })
    },
    Home () {
      this.$router.push({
        path: '/Home',
        name: 'Home',
        params: {
          username: this.$route.params.username
        }
      })
    }
  },
  store
}
</script>

<style scoped>
.search-nav {
  width: 100%;
  height: 64px;
  margin-top: 20px;
  border-bottom: 7px solid #4488a7;
}
.search-nav-container {
  width: 80%;
  min-width: 1000px;
  height: 64px;
  margin: 0px auto;
  position: relative;
}
.search-nav-container-90 {
  width: 90%;
}
.search-nav-container ul {
  margin: 0px;
  margin-left: 270px;
  padding-left: 0px;
  list-style: none;
}
.search-nav-container li {
  cursor: pointer;
  margin-left: 30px;
  line-height: 64px;
  color: black;
  font-size: 25px;
  /*font-weight: bold;*/
  float: left;
}
.search-nav-container a {
  color: black;
  text-decoration: none;
}
.second-child {
  padding: 0px 38px;
  background: #4488a7;
  margin: 0px;
  color: #fff;
}
.container {
  padding-top: 15px;
  margin: 0px auto;
  margin-bottom: 15px;
  width: 410px;
}
.sreach {
  margin: 5px 0px;
}
.button {
  width: 100%;
  height: 100%;
}
</style>
