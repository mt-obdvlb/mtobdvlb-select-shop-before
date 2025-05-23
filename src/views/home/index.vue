<template>
  <el-card >
    <template class="box">
      <el-image :src="userStore.avatar" class="avatar"  />
      <div>
        <h3>{{getTime()}}好{{userStore.username}}</h3>
        <p>欢迎来到mtobdvlb</p>
      </div>

    </template>
  </el-card>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import {getTime} from "@/utils/time.ts";
import useUserStore from '../../store/modules/user'
const userStore = useUserStore()
onMounted(async ()=>{
  userStore.userInfo()
})

</script>

<style scoped lang="scss">
.box {
  display: flex;

  .avatar{
    width: 200px;
    border-radius: 50%;
  }
  h3{

  }
  p{

  }
}
</style>