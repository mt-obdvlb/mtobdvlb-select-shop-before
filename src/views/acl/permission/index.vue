<template>
<el-table row-key="id" border :data="permissionList">
  <el-table-column label="名称" prop="name"></el-table-column>
  <el-table-column label="权限值" prop="code"></el-table-column>
  <el-table-column label="修改时间" prop="updateTime"></el-table-column>
  <el-table-column label="操作" width="280px">
    <template #="{row, $index}">
      <el-button type="primary" size="small" :disabled="row.level===4">{{row.level===3?'添加功能':'添加菜单' }}</el-button>
      <el-button type="primary" size="small" :disabled="row.level===1">编辑菜单</el-button>
      <el-button type="danger" size="small">删除菜单</el-button>
    </template>
  </el-table-column>
</el-table>
</template>

<script setup lang="ts">
import {ref, onMounted} from "vue";
import {reqAllPermission} from "@/api/acl/menu";
import type {PermissionResponseData, PermissionList} from "@/api/acl/menu/type.ts";

const permissionList = ref<PermissionList[]>([])

onMounted(() => {
  getPermissionList()
})

const getPermissionList = async () => {
  const res: PermissionResponseData = await reqAllPermission()
  permissionList.value = res.data
}

</script>

<style scoped>

</style>