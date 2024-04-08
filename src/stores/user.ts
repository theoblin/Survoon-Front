import {defineStore } from 'pinia'
import { jwtDecode } from "jwt-decode";
import { DecodedUserFromToken, LoginUser, User } from 'src/services/dto'
import { api } from 'src/services';
import Storage from "../utils/storage"


const useUserStore = defineStore('user', {
  state: () => ({
    user: undefined as User | undefined,
    error: undefined as unknown,
  }),
  getters: {
    isAuthenticated: (state) => {
      if (!state.user?.token)
        return false
      return (jwtDecode(state.user.token) as DecodedUserFromToken).exp > Math.floor(Date.now() / 1000)
    },
  },
  actions: {
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

      })
      .catch((error) => {
        this.$patch({
          error : error.response.data.User
        })
      })
    },
    logout() {
      this.$reset()
      //this.router.push({ name: 'login' })
    },
  },
})

export default useUserStore