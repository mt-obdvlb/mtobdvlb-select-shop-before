<template>
  <div>
    home
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import useUserStore from '../../store/modules/user'
const userStore = useUserStore()
onMounted(async ()=>{
  userStore.userInfo()

})

</script>

<style scoped>

</style>