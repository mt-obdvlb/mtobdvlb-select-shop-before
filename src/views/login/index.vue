<template>
  <div class="login_container">
    <el-row>
      <el-col :span="12" :xs="0">左边</el-col>
      <el-col :span="12" :xs="24">
        <el-form class="login_form">
          <h1>Hello</h1>
          <h2>欢迎来到德莱联盟</h2>
          <el-form-item label="" size="normal">
            <el-input 
            v-model="loginForm.username"
            :prefix-icon='User'
             />
            
          </el-form-item>
          <el-form-item label="" size="normal">
            <el-input 
            show-password
            v-model="loginForm.password"
            :prefix-icon="Lock"
            type="password"   />
            
          </el-form-item>
          <el-form-item label="" size="normal">
            <el-button
            
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
import useUserStore from '../../store/modules/user';
const userStore = useUserStore()

const loginForm = ref({
  username: 'admin',
  password: '111111'
})
const login = () => {
  // console.log(loginForm.value);
  userStore.userLogin(loginForm.value)
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