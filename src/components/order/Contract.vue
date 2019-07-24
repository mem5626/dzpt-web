<template>
    <div class="child2">
        <div class="address">
            <div class="icon">
                <el-avatar style="width:60px;height:60px;margin-top:20px;margin-left:50px" src="static/img/合同.png"></el-avatar>
            </div>
            <div class="content">
                <p>合同号：</p>
                <p>合同确认状态：</p>

            </div>
        </div>
        <div class="Goods">
            <div class="details">
                <p class="text">合同内容：</p>
            </div>
        </div>
        <div calss="Btn">
          <el-row style="margin-top:50px">
            <el-button type="primary" plain class="btn" >取消合同</el-button>
            <el-button type="success" plain class="btn" @click="affirm()" style="margin-left:150px">确认合同</el-button>
            <el-button type="danger" plain class="btn" @click="dialogFormVisible = true" style="margin-left:150px">下一步</el-button>
          </el-row>
      </div>
    </div>
</template>

<script>
export default {
  name: 'child2',
  mounted () {
    console.log('tab2组件')
  },
  methods: {
    affirm () {
      this.$router.push({
        path: '/Pay',
        name: 'Pay',
        params: {
          username: this.$route.params.username
        }
      })
    }

  }
}
</script>

<style>
.address {
    display:flex;
    background-color: darkgrey
}
.content {
    margin-top:10px;
    margin-left:20px;
    text-align:left;
}
.Goods {
    height: 250px;
    display: flex;
}
.block {
    margin-top: 30px;
    margin-left: 50px
}
.details {
    margin-top:7px;
    margin-left: 50px;
}
.details2 {
    margin-top: 7px;
    margin-left: 310px;
}
.text {
    font-size:20px;
    text-align:left;
}
.Btn {
    margin-top:100px
}
</style>
