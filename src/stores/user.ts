import {defineStore } from 'pinia'
import { jwtDecode } from "jwt-decode";
import { DecodedUserFromToken, LoginUser, RegisterUser, User,Error } from 'src/services/dto'
import { api } from 'src/services';
import Storage from "../utils/storage"
import router from 'src/router';

const userStorage = new Storage<User>('user')

const useUserStore = defineStore('user', {
  state: () => ({
    user: undefined as User | undefined,
    errors : [] as Array<Error>,
  }),
  getters:{
    getUser(){
      return userStorage.get()
    },
  },
  actions: {
    resetErrors(){
      this.errors = [] as Array<Error>
    },

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
      this.resetErrors();
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
        this.errors.push({name:'error',message:error.response.data.message,type:'login'}) 
      })
    },
    async signup(credentials: RegisterUser) {
      this.$reset()
      this.resetErrors();
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
        this.errors.push({name:'error',message:error.response.data.message,type:'signup'}) 
      })
    },
    logout() {
      this.$reset()
      this.resetErrors();
      userStorage.remove()
      router.push({ path: "/login" });
    },
    deleteUser(id:number){
      this.$reset()
      api.user.deleteOne( id )
      .then( (result) => {
        userStorage.remove()
        router.push({ path: "/login" });
      }).catch((error) => {
        this.errors.push({name:'error',message:error.response.data.message,type:'delete'}) 
      })
    },
    updateUser(id:number,user:any){
     this.resetErrors()
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
        this.errors.push({name:'error',message:error.response.data.message,type:'update'}) 
      })

    }
  },
})

export default useUserStore