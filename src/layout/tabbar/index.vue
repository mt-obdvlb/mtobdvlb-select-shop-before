<template>
  <el-row class="tabbar" justify="space-between">
    <el-col span="12" class="tabbar_left">
      <el-icon @click="changeIcon" class="change">
        <component :is="layoutSettingStore.isCollapsed ? 'Fold' : 'Expand'"/>
      </el-icon>
      <el-breadcrumb separator-icon="ArrowRight">
        <el-breadcrumb-item v-for="item in route.matched" :key="item.path" v-show="item.meta.title"
                            :to="item.path"
        >
          <el-icon>
            <component :is="item.meta.icon"></component>
          </el-icon>
          {{ item.meta.title }}
        </el-breadcrumb-item>

      </el-breadcrumb>
    </el-col>

    <el-col span="12" class="tabbar_right">
      <el-button size="default" icon="Refresh" @click="updateRefresh" circle></el-button>
      <el-button size="default" icon="FullScreen" @click="fullScreen" circle></el-button>
      <el-popover
          placement="bottom"
          trigger="hover"

      >
        <el-form>
          <el-form-item label="主题色">
            <el-color-picker
                :teleported="false"
                show-alpha
                v-model="color"
                @change="setColor"
                :predefine="['#409EFF', '#1890ff', '#304156','#212121','#11a983', '#13c2c2', '#6959CD', '#f5222d']"
            />
          </el-form-item>
          <el-form-item label="暗黑模式">
            <el-switch @change="changeDark" v-model="dark"  inactive-icon="MoonNight" active-icon="Sunny" inline-prompt />
          </el-form-item>
        </el-form>
        <template #reference>
          <el-button size="default" icon="Setting" circle></el-button>
        </template>
      </el-popover>
      <el-image :src="userStore.avatar"></el-image>
      <el-dropdown>
        <span class="el-dropdown-link">
          {{ userStore.username }}
          <el-icon class="el-icon--right"><arrow-down/></el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>

    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import useUserStore from '../../store/modules/user';
import useLayoutSettingStore from '../../store/modules/setting'
import {useRoute} from 'vue-router';
import {useRouter} from 'vue-router';
import {ref} from 'vue';

let color = ref()
const layoutSettingStore = useLayoutSettingStore()
const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
let dark = ref<boolean>(false)

const changeIcon = () => {
  layoutSettingStore.isCollapsed = !layoutSettingStore.isCollapsed
}

const updateRefresh = () => {
  layoutSettingStore.refresh = !layoutSettingStore.refresh
}

const fullScreen = () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen()
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen()
    }
  }
}

const logout = async () => {
  await userStore.userLogout()
  router.push({
    path: '/login',
    query: {
      redirect: route.path
    }
  })
}

const setColor = (color: string) => {
  document.documentElement.style.setProperty('--el-color-primary', color)
}

const changeDark = () => {
  document.documentElement.classList.toggle('dark')
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
      border-radius: 50%;
      width: 24px;
      height: 24px;

    }

    .el-dropdown-link {
      margin-top: 7px;
      margin-left: 5px;
    }
  }
}
</style>