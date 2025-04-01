<template>
    <template v-for="(item) in menuList"
    :key="item.path">
      <el-menu-item v-if="!item.meta.hidden&&!item.children"
        :index="item.path"
      >
      <el-icon>
          <component :is="item.meta.icon"></component>
      </el-icon>
        <template #title>
          <span>{{ item.meta.title }}</span>
        </template>
      </el-menu-item>
      <el-menu-item 
        v-if="!item.meta.hidden&&item.children&&item.children.length===1"
        :index="item.children[0].path"
        >
        <el-icon>
            <component :is="item.children[0].meta.icon"></component>
        </el-icon>
        <template #title>
          <span>{{ item.children[0].meta.title }}</span>
        </template>
    </el-menu-item>
      <el-sub-menu v-if="!item.meta.hidden&&item.children&&item.children.length>1" :index="item.path">
        <template #title>
          <el-icon>
              <component :is="item.meta.icon"></component>
          </el-icon>
          <span>{{ item.meta.title }}</span>
        </template>
        <Menu :menuList="item.children" ></Menu>
      </el-sub-menu>
      
  </template>
</template>

<script setup lang="ts">
defineProps(['menuList'])
defineOptions({
  name:'Menu'
})
</script>


<style scoped>

</style>