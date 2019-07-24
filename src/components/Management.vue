<template>
<div id="Mine">
    <el-container>
        <el-aside  style="width:260px;padding:0">
            <left></left>
        </el-aside>
        <el-main style="padding:0">
            <router-view></router-view>
        </el-main>
    </el-container>
</div>

</template>

<script>
import left from '@/components/management/Left'

export default{
  components: {
    left: left
  }
}
</script>

<style>
.Mine {
    padding:0px;
}
</style>
