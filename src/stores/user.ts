import {defineStore } from 'pinia'
import { jwtDecode } from "jwt-decode";
import { DecodedUserFromToken, LoginUser, RegisterUser, User } from 'src/services/dto'
import { api } from 'src/services';
import Storage from "../utils/storage"
import router from 'src/router';

const userStorage = new Storage<User>('user')


const useUserStore = defineStore('user', {
  state: () => ({
    user: undefined as User | undefined,
    errors: {login:null,signup:null,update:null},
  }),
  getters:{
    getUser(){
      return userStorage.get()
    },
  },
  actions: {
    isAuthenticated(){
      const user = userStorage.get()
      if (!user?.token){
        return false
      }
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

        userStorage.set(result.data.user)

        router.push({ path: "/" });

      })
      .catch((error) => {
        this.errors.login = null
        this.$patch({
          errors : {login :error.response.data.message}
        })
      })
    },
    async signup(credentials: RegisterUser) {
      this.$reset()
      api.user.signup( credentials )
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
        
        userStorage.set(result.data.user)

        router.push({ path: "/login" });

      })
      .catch((error) => {
        this.errors.signup = null
          this.$patch({
            errors : {signup :error.response.data.message}
          })
      })
    },
    logout() {
      this.$reset()
      userStorage.remove()
      router.push({ path: "/login" });
    },
    deleteUser(id:number){
      this.$reset()
      api.user.deleteOne( id )
      .then( (result) => {
        userStorage.remove()
        router.push({ path: "/login" });
      }).catch((deleteError) => {
        console.log(deleteError)
      })
    },
    updateUser(id:number,user:any){
      this.errors = {login:"",signup:"",email:"",password:""}
      this.$reset()
      api.user.updateOne( id,user )
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
        userStorage.set(result.data.user)
      }).catch((error) => {
        console.log(error);
        this.$patch({
          errors : {update :error.response.data.message}
        })
      })

    }
  },
})

export default useUserStore