import { defineStore } from "pinia"
import { reqLogin } from "../../api/user";
import type { loginFormData, loginResponseData } from "../../api/user/type";
import type { UserState } from "./types/type";
import { routes } from "../../router/routes";

const useUserStore = defineStore("User", {
  state: (): UserState => {
    return {
      token: '',
      menuRoutes: routes,
    }
  },
  actions: {
    async userLogin (data: loginFormData) {
      const res:loginResponseData = await reqLogin(data)
      if (res.code === 200) {
        // 登录成功
        this.token = (res.data.token as string)
        console.log(this.token);
        return 'ok'
      } else {
        return Promise.reject(new Error(res.data.message))
      }
    }
  },
  getters: {

  },
  persist: true
})

export default useUserStore