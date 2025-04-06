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
    <el-table border style="margin: 10px;" :data="userArr">
      <el-table-column type="selection"></el-table-column>
      <el-table-column label="#" type="index"></el-table-column>
      <el-table-column label="ID" prop="id"></el-table-column>
      <el-table-column label="用户名字" prop="username" show-overflow-tooltip></el-table-column>
      <el-table-column label="用户名称" prop="name" show-overflow-tooltip></el-table-column>
      <el-table-column label="用户角色" prop="roleName" show-overflow-tooltip></el-table-column>
      <el-table-column label="创建时间" prop="createTime" show-overflow-tooltip></el-table-column>
      <el-table-column label="更新时间" prop="updateTime" show-overflow-tooltip></el-table-column>
      <el-table-column label="操作" width="280px" align="center">
        <template #="{row,$index}">
          <el-button type="primary" icon="User" size="small">分配角色</el-button>
          <el-button type="primary" icon="Edit" size="small">编辑</el-button>
          <el-popconfirm
              title="确定删除吗？"
              @confirm=""
          >
            <template #reference>
              <el-button type="danger" icon="Delete" size="small">删除</el-button>

            </template>
          </el-popconfirm>

        </template>
      </el-table-column>
    </el-table>
    <el-pagination
        v-model:current-page="pageNo"
        v-model:page-size="pageSize"
        :page-sizes="[5,7,9, 11]"
        :total="total"
        background
        layout="prev, pager, next, jumper, ->, sizes, total"
      @change="getUser"
    />

  </el-card>
</template>

<script setup lang="ts">
import {onMounted, ref} from 'vue';
import {getUserList} from "@/api/acl/user";
import {Records} from "@/api/acl/user/type.ts";

let pageNo = ref<number>(1)
let pageSize = ref<number>(5)
let total = ref<number>(0)
let userArr = ref<Records>([])

onMounted(() => {
  getUser()
})

const getUser = async () => {
  const res = await getUserList(pageNo.value, pageSize.value)
  console.log(res)
  if(res.code === 200) {
    userArr.value = res.data.records
    total.value = res.data.total

  }
}

</script>

<style scoped lang="scss">
.form {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>