import { defineStore } from "pinia"
import { reqLogin } from "../../api/user";
import type { loginFormData } from "../../api/user/type";

const useUserStore = defineStore("User", {
  state: () => {
    return {}
  },
  actions: {
    async userLogin (data: loginFormData) {
      const res = await reqLogin(data)
      console.log(res);
      
    }
  },
  getters: {

  }
})

export default useUserStore