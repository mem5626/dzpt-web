<template>
    <div class="Message">
        <el-tabs v-model="activeName">
            <el-tab-pane  label="消息管理" name="first" :key="'first'">
                <child1></child1>
            </el-tab-pane>

            <el-tab-pane  label="发布消息" name="second" :key="'second'">
                <child2></child2>
            </el-tab-pane>
        </el-tabs>

    </div>
</template>

<script>
import Child1 from '@/components/management/message/MessageManagement'
import Child2 from '@/components/management/message/SendMessage'
export default {
  name: 'Message',
  components: {
    child1: Child1,
    child2: Child2
  },
  data () {
    return {
      // 默认第一个选项卡
      activeName: 'first'
    }
  },
  mounted () {

  }
}
</script>

<style>
.Message {
  height: 500px;
  padding: 15px;
  margin-top: 15px;
  border-radius: 5px;

}
.el-tabs__item {
    font-size:20px
}
</style>
