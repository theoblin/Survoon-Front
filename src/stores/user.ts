import {defineStore } from 'pinia'
import { jwtDecode } from "jwt-decode";
import { DecodedUserFromToken, LoginUser, RegisterUser, UpdateUser, User } from 'src/services/dto'
import { api } from 'src/services';
import Storage from "../utils/storage"
import router from 'src/router';

const userStorage = new Storage<User>('user')


const useUserStore = defineStore('user', {
  state: () => ({
    user: undefined as User | undefined,
    error: {login:"",signup:"",email:"",password:""},
  }),
  getters:{
    getUser(){
      return userStorage.get()
    },
    getErrors(state){
      return {login:state.error.login,signup:state.error.signup,email:state.error.email,password:state.error.password};
    }
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

        // Setting user in localStorage
        userStorage.set(result.data.user)

        router.push({ path: "/" });

      })
      .catch((error) => {
        this.$patch({
          error : {login :error.response.data.message}
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
        
        // Setting user in localStorage
        userStorage.set(result.data.user)

        router.push({ path: "/login" });

      })
      .catch((error) => {
          this.$patch({
            error : {signup :error.response.data.message}
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
        console.log(result.data.user)
        userStorage.set(result.data.user)
      }).catch((error) => {
        console.log(error);
        this.$patch({
          error : {password :error.response.data.message}
        })
      })

    }
  },
})

export default useUserStore