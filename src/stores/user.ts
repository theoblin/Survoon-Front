import {defineStore } from 'pinia'
import { jwtDecode } from "jwt-decode";
import { DecodedUserFromToken, LoginUser, User } from 'src/services/dto'
import { api } from 'src/services';
import Storage from "../utils/storage"
import router from 'src/router';
import { useRoute } from 'vue-router';


const useUserStore = defineStore('user', {
  state: () => ({
    user: undefined as User | undefined,
    error: undefined as unknown,
  }),
  actions: {
    isAuthenticated(){
      const userStorage = new Storage<User>('user')
      const user = userStorage.get()
      if (!user?.token) 
        return false
      try{
        const decoded = jwtDecode(user.token)
        if (decoded.email&&decoded.id&&decoded.exp&&decoded.iat) {
          return (jwtDecode(user.token) as DecodedUserFromToken).exp > Math.floor(Date.now() / 1000)
        }else{
          return false
        }
      }catch(error){
        return false
      }
    },
    async login(credentials: LoginUser) {
      this.$reset()
      api.user.login( credentials )
      .then( (result) => {
        this.$patch({
          user: {
            token:result.data.user.token,
            id:result.data.user.id,
            email:result.data.user.email,
            type:result.data.user.type,
            language:result.data.user.language
          },
        })

        // Setting user in localStorage
        const userStorage = new Storage<User>('user')
        userStorage.set(result.data.user)

        router.push({ path: "/profile" });

      })
      .catch((error) => {
        this.$patch({
          error : error.response.data.User
        })
      })
    },
    logout() {
      this.$reset()
      router.push({ path: "/login" });
    },
  },
})

export default useUserStore