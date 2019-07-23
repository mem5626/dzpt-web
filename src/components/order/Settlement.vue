<template>
    <div class="child2">
        <div class="address">
            <div class="icon">
                <el-avatar style="width:60px;height:60px;margin-top:20px;margin-left:50px" src="static/img/交收单.png"></el-avatar>
            </div>
            <div class="content">
                <p>交收单号：</p>
                <p>交收单确认状态：</p>

            </div>
        </div>
        <div class="Goods">
            <div class="details">
                <p class="text">交收单内容：</p>
            </div>
        </div>
        <div calss="Btn">
          <el-row style="margin-top:50px">
            <el-button type="success" plain class="btn" @click="buy()" style="margin-left:150px；text-align:right">确认交收单</el-button>
          </el-row>
      </div>
    </div>
</template>

<script>
    export default {
      name: 'child3',
      mounted(){
          console.log("tab3组件")
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