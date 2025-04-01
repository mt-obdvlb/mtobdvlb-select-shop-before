import { defineStore } from "pinia"
import { reqLogin,reqUserInfo, reqLogout } from "../../api/user";
import type { loginFormData, loginResponseData, userInfoReponseData } from "../../api/user/type";
import type { UserState } from "./types/type";
import { routes } from "../../router/routes";

const useUserStore = defineStore("User", {
  state: (): UserState => {
    return {
      token: '',
      menuRoutes: routes,
      username: '',
      avatar: '',
    }
  },
  actions: {
    async userLogin (data: loginFormData) {
      const res:loginResponseData = await reqLogin(data)
      if (res.code === 200) {
        // 登录成功
        this.token = (res.data as string)
        console.log(this.token);
        return 'ok'
      } else {
        return Promise.reject(new Error(res.data))
      }
    },
    async userInfo () {
      const res:userInfoReponseData = await reqUserInfo()
      if(res.code === 200) {
        this.username = res.data.name
        this.avatar = res.data.avatar
        return 'ok'
      } else {
        return Promise.reject(new Error(res.message))
      }
    },
    async userLogout () {
      const res:any = await reqLogout()
      console.log(res)
      if(res.code === 200) {
        this.token = ''
        this.username = ''
        this.avatar = ''
        return 'ok'
      } else {
        return Promise.reject(new Error(res.message))
      }
    }
  },
  getters: {

  },
  persist: true
})

export default useUserStore