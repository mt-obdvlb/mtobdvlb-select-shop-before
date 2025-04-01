import { defineStore } from "pinia"

const useLayoutSettingStore = defineStore('LayoutSettingStore',{
  state: () => {
    return {
      isCollapsed: false,
      refresh: false,
    }
  }
})

export default useLayoutSettingStore