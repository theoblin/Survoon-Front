import axios from "axios";
import { CONFIG } from "../../config";
import { LoginUser, RegisterUser } from "./dto";

const baseUrl =  `${CONFIG.API_HOST}`

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
        }
    }
}