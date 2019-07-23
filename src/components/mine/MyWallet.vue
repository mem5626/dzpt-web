<template>
    <div class="tabZujian">
        <el-tabs v-model="activeName">
            <el-tab-pane  label="我的零钱" name="first" :key="'first'"> 
                <child1></child1>
            </el-tab-pane>

            <el-tab-pane  label="我的账单" name="second" :key="'three'">
                <child2></child2>    
            </el-tab-pane>
        </el-tabs>
        
    </div>
</template>

<script>
import Child1 from '@/components/mine/myWallet/Wallet'
import Child2 from '@/components/mine/myWallet/Bill'
export default {
    name: 'tabZujian',
    components:{
        child1:Child1,
        child2:Child2
    },
    data() {
        return {
            //默认第一个选项卡
            activeName: "first",
        }
    },
    mounted(){
        
    }
}
</script>

<style>
.tabZujian {
  height: 600px;
  padding: 15px;
  margin-top: 15px;
  border-radius: 5px;

}
.el-tabs__item {
    font-size:20px
}
</style>