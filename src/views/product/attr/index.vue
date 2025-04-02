<template>
  <Category></Category>
  <el-card style="margin-top: 20px">
    <el-button icon="Plus" type="primary" :disabled="!categoryStore.category3Id">添加属性</el-button>
    <el-table border>
      <el-table-column label="序号" type="index" width="80px" align="center"></el-table-column>
      <el-table-column label="属性名称" width="120px"></el-table-column>
      <el-table-column label="属性值"></el-table-column>
      <el-table-column label="操作" width="120px"></el-table-column>
    </el-table>
  </el-card>
</template>

<script setup lang="ts">
import useCategoryStore from "@/store/modules/category.ts";
const categoryStore = useCategoryStore();

</script>

<style scoped lang="scss">

</style>