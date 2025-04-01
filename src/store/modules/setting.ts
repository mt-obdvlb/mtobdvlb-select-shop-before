import { defineStore } from "pinia"

const useLayoutSettingStore = defineStore('LayoutSettingStore',{
  state: () => {
    return {
      isCollapsed: false,
    }
  }
})

export default useLayoutSettingStore