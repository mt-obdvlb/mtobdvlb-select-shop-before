<template>
  <div class="logo" v-if="setting.logoHidden">
    <img :src="setting.logo" alt="logo" />
    <p>{{setting.title}}</p>
  </div>
</template>

<script setup lang="ts">
import setting from '../../setting';
defineOptions({
  name: 'Logo'
})
</script>

<style scoped lang="scss">
.logo{
  width: 100%;
  height: $base-menu-logo-height;
  display: flex;
  align-items: center;
  color: white;
  margin-top: 20px;
  img {
    width: 40px;
    height: 40px;
    
  }
  p {
    font-size: $base-logo-title-fontSize;
    margin-left: 10px;
    white-space: nowrap;
  }
}


</style>