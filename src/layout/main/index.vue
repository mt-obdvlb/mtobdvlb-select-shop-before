<template>
  <router-view v-slot="{ Component }">
    <transition name="fade"
    >
      <component :is="Component" v-if="flag"></component>
    </transition>
  </router-view>
</template>

<script setup lang="ts">
defineOptions({
  name: 'Main'
})
import useLayoutSettingStore from '../../store/modules/setting';
import { watch,ref, nextTick } from 'vue';

const flag = ref(true)

const layoutSettingStore = useLayoutSettingStore();
watch(() => layoutSettingStore.refresh,
  () => {
    flag.value = false;
    nextTick(() => {
      flag.value = true;
    }
    )
})

</script>

<style scoped lang="scss">
.fade-enter-from {
  opacity: 0;
}
.fade-enter-active {
  transition: all 1s;
}
.fade-enter-to {
  opacity: 1;
}
</style>