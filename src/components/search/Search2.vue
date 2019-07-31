<template>
  <div>
    <div class="container">
      <el-input v-model="sreachData" size="large" class="sreach" placeholder="输入你想查找的商品名或挂单号">
        <el-button slot="append" type="primary" style="background-color:#4488a7;color:white" @click="sreach()">查询</el-button>
      </el-input>
    </div>
    <div>
    <div class="search-nav">
      <div class="search-nav-container">
        <ul>
          <li @click="Home()">网站首页</li>
          <li class="second-child" style="color:white">交易大厅</li>
          <li @click="Hang()">挂牌中心</li>
          <li><router-link to="">交易指南</router-link></li>
        </ul>
      </div>
    </div>
  </div>
    <div>
<el-menu>
</el-menu>

    </div>
  </div>
</template>

<script>
import store from '@/vuex/store'
import { mapMutations, mapActions, mapState } from 'vuex'
export default {
  name: 'Search',
  computed: {
    ...mapState(['goodInfo', 'userInfo'])
  },
  created () {
    this.isGood()
  },
  data () {
    return {
      sreachData: '',
      promotionTags: [],
      activeIndex: '1',
      activeIndex2: '1',
      DATA: {
        listedGoodsId: '',
        status: 'Home'
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
      this.loadGood(this.DATA)
      this.$router.push({
        path: '/Product',
        name: 'Product'
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
    },
    Hang () {
      this.$router.push({
        path: '/Hang',
        name: 'Hang',
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
.search-nav{
  width: 100%;
  height: 64px;
  margin-top:20px;
  border-bottom: 7px solid #4488a7;
}
.search-nav-container{
  width: 80%;
  min-width: 1000px;
  height: 64px;
  margin: 0px auto;
  position: relative;
}
.search-nav-container-90{
  width: 90%;
}
.search-nav-container ul{
  margin: 0px;
  margin-left: 270px;
  padding-left: 0px;
  list-style: none;

}
.search-nav-container li{
  cursor: pointer;
  margin-left: 30px;
  line-height: 64px;
  color: black;
  font-size: 25px;
  /*font-weight: bold;*/
  float: left;
}
.search-nav-container a{
  color: black;
  text-decoration: none;
}
.second-child{
  padding: 0px 38px;
  background:#4488a7;
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
