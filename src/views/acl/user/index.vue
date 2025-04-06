<template>
  <el-card>
    <el-form inline class="form">
      <el-form-item label="用户名: ">
        <el-input placeholder="请输入搜索用户名" v-model="keyword"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="Search" :disabled="!keyword" @click="getUser">查询</el-button>
        <el-button type="primary" icon="Search">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
  <el-card style="margin-top: 20px;">
    <el-button type="primary" @click="addUser">添加用户</el-button>
    <el-button type="danger" :disabled="selectIdList.length === 0" @click="deleteSelectUser">批量删除</el-button>
    <el-table border style="margin: 10px;" :data="userArr" @selection-change="handleSelectChange">
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
          <el-button type="primary" icon="User" size="small" @click="setRole(row)">分配角色</el-button>
          <el-button type="primary" icon="Edit" size="small" @click="updateUser(row)">编辑</el-button>
          <el-popconfirm
              title="确定删除吗？"
              @confirm="removeUser(row.id)"
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
  <el-drawer v-model="drawer" @closed="reset">
    <template #header>
      <h4>{{ user.id ? '修改用户' : '添加用户' }}</h4>
    </template>
    <template #default>
      <el-form :model="user" :rules="rules" ref="formRef">
        <el-form-item label="用户名: " prop="name">
          <el-input placeholder="请输入用户名" v-model="user.name"></el-input>
        </el-form-item>
        <el-form-item label="用户名称: " prop="username">
          <el-input placeholder="请输入用户名称" v-model="user.username"></el-input>
        </el-form-item>
        <el-form-item label="用户密码: " prop="password" v-if="!user.id">
          <el-input placeholder="请输入用户密码" v-model="user.password"></el-input>
        </el-form-item>
      </el-form>
    </template>
    <template #footer>
      <el-button @click="drawer=false">取消</el-button>
      <el-button type="primary" @click="addOrUpdate">确定</el-button>
    </template>
  </el-drawer>
  <el-drawer v-model="drawer1">
    <el-form>
      <el-form-item label="用户姓名">
        <el-input v-model="user.name" disabled/>
      </el-form-item>
      <el-form-item label="角色列表">
        <el-checkbox v-model="checkAll"
                     :indeterminate="indeterminate"
                     @change="handleCheckAll"
        >全选
        </el-checkbox>
        <el-checkbox-group v-model="checkedRoleList" @change="handleChangeCheck">
          <el-checkbox v-for="(role,index) in roleList" :key="role" :value="role">{{ role.roleName }}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="drawer1=false">取消</el-button>
      <el-button type="primary" @click="updateRole">确定</el-button>
    </template>
  </el-drawer>
</template>

<script setup lang="ts">
import {onMounted, ref} from 'vue';
import {getUserList, addOrUpdateUser, getUserRole, assignUserRole, deleteUser, deleteBatchUser} from "@/api/acl/user";
import {
  type AllRole,
  type AllRoleResponseData,
  Records,
  type User,
  type UserResponseData
} from "@/api/acl/user/type.ts";
import {ElMessage} from "element-plus";
import _ from 'lodash'

let keyword = ref<string>('')
let roleList = ref<AllRole>([])
let checkedRoleList = ref<AllRole>([])
let indeterminate = ref<boolean>(true)
let checkAll = ref<boolean>(false)
const formRef = ref()
let pageNo = ref<number>(1)
let pageSize = ref<number>(5)
let total = ref<number>(0)
const userArr = ref<Records>([])
let drawer = ref<boolean>(false)
let drawer1 = ref<boolean>(false)
let selectIdList = ref<number[]>([])
const user = ref<User>({
  username: '',
  name: '',
  password: ''
})

const rules = ref({
  username: [
    {required: true, message: '请输入用户名', trigger: 'blur'},
    {min: 5, max: 15, message: '长度在 5 到 15 个字符', trigger: 'blur'}
  ],
  name: [
    {required: true, message: '请输入用户名称', trigger: 'blur'},
    {min: 5, max: 15, message: '长度在 5 到 15 个字符', trigger: 'blur'}
  ],
  password: [
    {required: true, message: '请输入用户密码', trigger: 'blur'},
    {min: 5, max: 15, message: '长度在 5 到 15 个字符', trigger: 'blur'}
  ]
})

onMounted(() => {
  getUser()
})

const getUser = async () => {
  const res = await getUserList(pageNo.value, pageSize.value, keyword.value)
  console.log(res)
  if (res.code === 200) {
    userArr.value = res.data.records
    total.value = res.data.total

  }
}

const addUser = () => {
  drawer.value = true
}

const updateUser = (row: User) => {
  console.log(row)
  user.value = _.cloneDeep(row)
  drawer.value = true

}

const addOrUpdate = async () => {

  await formRef.value?.validate()
  const res: UserResponseData = await addOrUpdateUser(user.value)
  if (res.code === 200) {
    drawer.value = false
    ElMessage({
      type: 'success',
      message: user.value.id ? '修改成功' : '添加成功'
    })
    window.location.reload()
  } else {
    ElMessage({
      type: 'error',
      message: user.value.id ? '修改失败' : '添加失败'
    })
  }
}

const reset = () => {
  formRef.value?.resetFields()
  user.value = {
    username: '',
    name: '',
    password: ''
  }
}

const setRole = async (row: User) => {
  user.value = _.cloneDeep(row)
  const res: AllRoleResponseData = await getUserRole(row.id)
  if (res.code === 200) {
    roleList.value = res.data.allRolesList
    checkedRoleList.value = res.data.assignRoles
    drawer1.value = true
  }
}

const handleCheckAll = (val: boolean) => {
  checkedRoleList.value = val ? roleList.value : []
  indeterminate.value = false
}

const handleChangeCheck = (value: number[]) => {
  const checkedCount = value.length
  indeterminate.value = checkedCount > 0 && checkedCount < roleList.value.length
  checkAll.value = checkedCount === roleList.value.length
}

const updateRole = async () => {
  const res = await assignUserRole({userId: user.value.id, roleIdList: roleList.value.map(item => item.id)})
  if (res.code === 200) {
    ElMessage({
      type: 'success',
      message: '修改成功'
    })
    drawer1.value = false
    window.location.reload()
  } else {
    ElMessage({
      type: 'error',
      message: '修改失败'
    })
  }
}

const removeUser = async (id: number) => {
  const res = await deleteUser(id)
  if (res.code === 200) {
    ElMessage.success('删除成功')
    getUser()
  } else {
    ElMessage.error('删除失败')
  }
}

const handleSelectChange = (value: number[]) => {
    selectIdList.value = value
  console.log(selectIdList.value)
}

const deleteSelectUser = async () => {
  const res = await deleteBatchUser(selectIdList.value)
  if (res.code === 200) {
    ElMessage.success('删除成功')
    getUser()
  } else {
    ElMessage.error('删除失败')
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