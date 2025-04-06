<template>
  <el-card>
    <el-form inline class="form">
      <el-form-item label="用户名: ">
        <el-input placeholder="请输入搜索用户名"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="Search">查询</el-button>
        <el-button type="primary" icon="Search">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
  <el-card style="margin-top: 20px;">
    <el-button type="primary">添加用户</el-button>
    <el-button type="danger">批量删除</el-button>
    <el-table border style="margin: 10px;">
      <el-table-column type="selection"></el-table-column>
      <el-table-column label="#"></el-table-column>
      <el-table-column label="ID"></el-table-column>
      <el-table-column label="用户名字"></el-table-column>
      <el-table-column label="用户名称"></el-table-column>
      <el-table-column label="用户角色"></el-table-column>
      <el-table-column label="创建时间"></el-table-column>
      <el-table-column label="更新时间"></el-table-column>
      <el-table-column label="操作" width="260px" align="center"></el-table-column>
    </el-table>
    <el-pagination
        v-model:current-page="pageNo"
        v-model:page-size="pageSize"
        :page-sizes="[5,7,9, 11]"
        :total="100"
        background
        layout="prev, pager, next, jumper, ->, sizes, total"
    />

  </el-card>
</template>

<script setup lang="ts">
import {ref} from 'vue';

let pageNo = ref<number>(1)
let pageSize = ref<number>(5)

</script>

<style scoped lang="scss">
.form {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>