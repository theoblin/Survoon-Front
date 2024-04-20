import axios from "axios";
import { CONFIG } from "../../config";
import { CreateSurvey, LoginUser, RegisterUser, UpdateUser, User } from "./dto";
import Storage from "../utils/storage"

const baseUrl =  `${CONFIG.API_HOST}`

const userStorage = new Storage<User>('user')

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}


export class Api{
  
    user = {
        login:(user:LoginUser) =>{
          return axios.post(baseUrl+"/user/login",{user:user})
        },
        signup:(user:RegisterUser) =>{
          return axios.post(baseUrl+"/user",{user:user})
        },
        getOne:(id:number) =>{
          return axios.get(baseUrl+"/user/"+id, {headers: {'Authorization': `Bearer ${userStorage.get().token}`}})
        },
        deleteOne:(id:number) =>{
          return axios.delete(baseUrl+`/user/${id}`, {headers: {'Authorization': `Bearer ${userStorage.get().token}`}})
        },
        updateOne:(id:number,user:UpdateUser) =>{
          return axios.put(baseUrl+"/user/",{id:id,user:user}, {headers: {'Authorization': `Bearer ${userStorage.get().token}`}})
        },
    }

    surveys = {
      getUserSurveys:(id:number) =>{
        return axios.get(baseUrl+`/user/${id}/surveys/`, {headers: {'Authorization': `Bearer ${userStorage.get().token}`}})
      },
      getUserOneSurvey:(id:number) =>{
        return axios.get(baseUrl+`/survey/${id}`, {headers: {'Authorization': `Bearer ${userStorage.get().token}`}})
      },
      crateOneSurvey:(survey:CreateSurvey) =>{
        return axios.post(baseUrl+`/survey/create`,{survey:survey}, {headers: {'Authorization': `Bearer ${userStorage.get().token}`}})
      },
    }

    language = {
      getAllLanguages:()=> {
        return axios.get(baseUrl+`/language/all`, {headers: {'Authorization': `Bearer ${userStorage.get().token}`}})
      }
    }

}