<template>
  <div class="layout_container">
    <el-container>
      <el-aside class="layout_slider">Aside
        <Logo></Logo>
        <el-scrollbar class="scrollbar">
          <el-menu background-color="#001529" text-color="white" router
            :default-active="route.path"
          >
            <Menu :menuList="userStore.menuRoutes"></Menu>
          </el-menu>
        </el-scrollbar>
      </el-aside>
  
      <el-container>
        <el-header class="layout_tabbar">
          <Tabbar></Tabbar>
        </el-header>
          <el-main class="layout_main">
            <Main></Main>
          </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import Logo from './logo/index.vue'
import Menu from './menu/index.vue'
import Main from './main/index.vue'
import Tabbar from './tabbar/index.vue'
import useUserStore from '../store/modules/user';
import { useRoute } from 'vue-router';

const route = useRoute()
const userStore = useUserStore()

</script>

<style scoped lang="scss">
.layout_container {
  width: 100%;
  height: 100vh;
  .layout_slider {
    width: $base-menu-width;
    height: 100vh;
    background-color: $base-menu-background;
    .scrollbar{
      width: 100%;
      height: calc(100vh - $base-menu-logo-height);
      .el-menu{
        border-right: none;
      }
    }
  }
  .layout_tabbar {
    width: calc(100% - #{$base-menu-width});
    height: $base-tabbar-height;
    position: fixed;
    top: 0;
    right: 0;
    padding: 0;

  }
  .layout_main {
    width: calc(100% - #{$base-menu-width});
    height: calc(100vh - #{$base-tabbar-height});
    background-color: #333;
    position: absolute;
    right: 0;
    bottom: 0;
    padding: 20px;
    overflow: auto;
  }
}
</style>