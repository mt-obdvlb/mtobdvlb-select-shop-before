<template>
  <el-row class="tabbar" justify="space-between">
    <el-col span="12" class="tabbar_left">
      <el-icon @click="changeIcon" class="change">
        <component :is="layoutSettingStore.isCollapsed ? 'Fold' : 'Expand'" />
      </el-icon>
      <el-breadcrumb separator-icon="ArrowRight">
        <el-breadcrumb-item v-for="item in route.matched" :key="item.path" v-show="item.meta.title"
        :to="item.path"
        >
          <el-icon>
              <component :is="item.meta.icon" ></component>
          </el-icon>
          {{ item.meta.title }}
        </el-breadcrumb-item>

      </el-breadcrumb>
    </el-col>

    <el-col span="12" class="tabbar_right">
      <el-button size="default" icon="Refresh" @click="" circle></el-button>
      <el-button size="default" icon="FullScreen" @click="" circle></el-button>
      <el-button size="default" icon="Setting" @click="" circle></el-button>
      <el-image src="../../../public/logo.png"></el-image>
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
import useLayoutSettingStore from '../../store/modules/setting'
import { useRoute } from 'vue-router';
const layoutSettingStore = useLayoutSettingStore()
const route = useRoute()

const changeIcon = () => {
  layoutSettingStore.isCollapsed = !layoutSettingStore.isCollapsed

}
defineOptions({
  name: 'Tabbar'
})
</script>

<style scoped lang="scss">
.tabbar {
  color: white;
  width: 100%;
  height: 100%;
  align-items: center;
  display: flex;
  background-image: linear-gradient(to right, #d2cdcd 0%, rgb(223, 142, 142) 100%);
  padding: 0 15px;

  .tabbar_left {
    display: flex;

    .change {
      margin-right: 10px;
      cursor: pointer;
    }
  }

  .tabbar_right {
    .el-image {
      width: 24px;
      height: 24px;
    }
  }
}
</style>