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
    <el-button type="primary" @click="addUser">添加用户</el-button>
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
          <el-button type="primary" icon="Edit" size="small" @click="updateUser(row)">编辑</el-button>
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
  <el-drawer v-model="drawer" >
    <template #header>
      <h4>{{user.id ? '修改用户' : '添加用户'}}</h4>
    </template>
    <template #default>
      <el-form>
        <el-form-item label="用户名: ">
          <el-input placeholder="请输入用户名" v-model="user.name"></el-input>
        </el-form-item>
        <el-form-item label="用户名称: ">
          <el-input placeholder="请输入用户名称" v-model="user.username"></el-input>
        </el-form-item>
        <el-form-item label="用户密码: ">
          <el-input placeholder="请输入用户密码" v-model="user.password"></el-input>
        </el-form-item>
      </el-form>
    </template>
    <template #footer>
      <el-button @click="drawer=false">取消</el-button>
      <el-button type="primary" @click="addOrUpdate">确定</el-button>
    </template>
  </el-drawer>
</template>

<script setup lang="ts">
import {onMounted, ref} from 'vue';
import {getUserList, addOrUpdateUser} from "@/api/acl/user";
import {Records, type User, type UserResponseData} from "@/api/acl/user/type.ts";
import {ElMessage} from "element-plus";

let pageNo = ref<number>(1)
let pageSize = ref<number>(5)
let total = ref<number>(0)
let userArr = ref<Records>([])
let drawer = ref<boolean>(false)
const user = ref<User>({
  username: '',
  name: '',
  password: ''
})

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

const addUser = () => {
  user.value = {
    username: '',
    name: '',
    password: ''
  }
  drawer.value = true
}

const updateUser = (row:User) => {
  user.value = row
  drawer.value = true

}

const addOrUpdate = async () => {
  const res: UserResponseData = await addOrUpdateUser(user.value)
  if(res.code === 200) {
    getUser()
    drawer.value = false
    ElMessage({
      type: 'success',
      message: user.value.id ? '修改成功' : '添加成功'
    })
  } else {
    ElMessage({
      type: 'error',
      message: user.value.id ? '修改失败' : '添加失败'
    })
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