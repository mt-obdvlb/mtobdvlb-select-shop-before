<template>
    <el-container class="layout_container">
      <el-aside class="layout_slider"
      :class="{'is-collapse': layoutSettingStore.isCollapsed ?true: false}"
      >
        <Logo></Logo>
        <el-scrollbar class="scrollbar">
          <el-menu background-color="#001529" text-color="white" router :collapse="layoutSettingStore.isCollapsed"
            :default-active="route.path"
          >
            <Menu :menuList="userStore.menuRoutes"></Menu>
          </el-menu>
        </el-scrollbar>
      </el-aside>
  
      <el-container >
        <el-header class="layout_tabbar" :class="{'is-collapse': layoutSettingStore.isCollapsed ?true: false}">
          <Tabbar></Tabbar>
        </el-header>
          <el-main class="layout_main" :class="{'is-collapse': layoutSettingStore.isCollapsed ?true: false}">
            <Main></Main>
          </el-main>
      </el-container>
    </el-container>
</template>

<script setup lang="ts">
import Logo from './logo/index.vue'
import Menu from './menu/index.vue'
import Main from './main/index.vue'
import Tabbar from './tabbar/index.vue'
import useUserStore from '../store/modules/user';
import { useRoute } from 'vue-router';
import useLayoutSettingStore from '../store/modules/setting';

const route = useRoute()
const userStore = useUserStore()
const layoutSettingStore = useLayoutSettingStore()

defineOptions({
  name: 'Layout'
})
</script>

<style scoped lang="scss">
.layout_container {
  
  .layout_slider {
    height: 100vh;
    transition: all .3s;
    width: $base-menu-width;
    background-color: $base-menu-background;
    .scrollbar{
      background-color: $base-menu-background;
      .el-menu{
        border-right: none;
      }
    }
    &.is-collapse{
      width: $base-menu-min-width;
    }
  }
  .layout_tabbar {
    padding: 0;
  }
  .layout_main {

    background-color: #333;
    padding: 20px;
  }
}
</style>