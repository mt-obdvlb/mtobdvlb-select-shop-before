<template>
   <el-row class="tabbar" justify="space-between">
    <el-col span="12" class="tabbar_left">
      <el-icon >
          <Expand />
      </el-icon>
      <el-breadcrumb separator-icon="ArrowRight">
    <el-breadcrumb-item :to="{ path: '/' }">homepage</el-breadcrumb-item>
    <el-breadcrumb-item>
      <a href="/">promotion management</a>
    </el-breadcrumb-item>
  </el-breadcrumb>
    </el-col>

    <el-col span="12" class="tabbar_right">
      <el-button  size="default" icon="Refresh" @click="" circle></el-button>
      <el-button  size="default" icon="FullScreen" @click="" circle></el-button>
      <el-button  size="default" icon="Setting" @click="" circle></el-button>
      <el-image src="../../../public/logo.png" ></el-image>
      <el-dropdown>
      <el-button type="primary">
        <el-icon class="el-icon--right"><arrow-down /></el-icon>
      </el-button>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    
    </el-col>
  </el-row>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
.tabbar{
  width: 100%;
  height: 100%;
  align-items: center;
  display: flex;
  background-image: linear-gradient(to right, #a9a9a9 0%, rgb(223, 142, 142) 100%);
  padding: 0 15px;
  .tabbar_left{
    display: flex;
    .el-icon{
      margin-right: 10px;
    }
  }
  .tabbar_right{
    .el-image{
      width: 24px;
      height: 24px;
    }
  }
}
</style>