import { defineStore } from "pinia"
import { reqLogin } from "../../api/user";
import type { loginFormData } from "../../api/user/type";

const useUserStore = defineStore("User", {
  state: () => {
    return {
      token: '',
    }
  },
  actions: {
    async userLogin (data: loginFormData) {
      const res = await reqLogin(data)
      if (res.code === 200) {
        // 登录成功
        this.token = res.data.token
        console.log(this.token);
        
      } else {
        
      }
    }
  },
  getters: {

  },
  persist: true
})

export default useUserStore