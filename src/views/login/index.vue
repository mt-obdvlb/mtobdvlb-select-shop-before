<template>
  <div class="login_container">
    <el-row>
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <el-form class="login_form"
        :model="loginForm"
        :rules="rules"
        ref="loginForms"
        >
          <h1>Hello</h1>
          <h2>欢迎来到mtobdvlb</h2>
          <el-form-item prop="username" label="" size="normal">
            <el-input 
            v-model="loginForm.username"
            :prefix-icon='User'
             />

          </el-form-item>
          <el-form-item prop="password"  label="" size="normal">
            <el-input 
            show-password
            v-model="loginForm.password"
            :prefix-icon="Lock"
            type="password"   />
            
          </el-form-item>
          <el-form-item label="" size="normal">
            <el-button
            :loading="loading"
            type="primary"
            class="login_btn"
              @click="login">登录</el-button>
          </el-form-item>
          
          
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { User, Lock } from '@element-plus/icons-vue'; 
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import useUserStore from '../../store/modules/user';
import { ElNotification } from 'element-plus'
import { getTime } from '../../utils/time';
const userStore = useUserStore()
const router = useRouter()
const loginForms = ref()
const route = useRoute()
let loading = ref(false)

const loginForm = ref({
  username: 'admin',
  password: '111111'
})

const validatorUserName = (rule: any, value: any, callback: any) => {
  rule  
  if (value === 'admin') {
    callback(new Error('用户名不能为admin'))
  } else {
    callback()
  }
}
const rules = {
  useranme: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 5, max: 10, message: '用户名长度在5-10之间', trigger: 'blur' },
    { pattern: /^[a-zA-Z0-9_-]{5,10}$/, message: '用户名格式错误', trigger: 'blur' },
    {validator: validatorUserName, trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 15, message: '密码长度在6-15之间', trigger: 'blur' },
  ]
}

const login = async () => {
  await loginForms.value?.validate()
  loading.value = true
  
  // console.log(loginForm.value);
  try {
    await userStore.userLogin(loginForm.value)
    const redirect = route.query.redirect as string
    router.push(redirect || '/')
    ElNotification({
      type: 'success',
      message: '登录成功',
      title: `HI,${getTime()}好`
    })
  } catch (error) {
    loading.value = false
    ElNotification({
      type: 'error',
      message: (error as Error).message,
    
    })
  }
}



</script>

<style scoped lang="scss">
.login_container {
  width: 100%;
  height: 100vh;
  background-image: url('@/assets/images/background.jpg');
  background-size: cover;
  .login_form{
    position: relative;
    width: 80%;
    top:30vh;
    background-image: url('@/assets/images/login_form.png');
    background-size: cover;
    padding: 40px;
    h1{
      color: white;
      font-size: 40px;
    }
    h2{
      font-size: 20px;
      color: white;
      margin-top: 20px;
      margin-bottom: 20px;
    }
    .login_btn{
      width: 100%;
      background-color: #409EFF;
    }
  }

}
</style>