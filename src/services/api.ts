import axios from "axios";
import { CONFIG } from "../../config";
import { Answer, CreateAnswer, CreateQuestion, CreateSurvey, LoginUser, RegisterUser, UpdateAnswer, UpdateQuestion, UpdateSurvey, UpdateUser, User } from "./dto";
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
      getUserOneSurveySecure:(id:number) =>{
        return axios.get(baseUrl+`/survey/secure/${id}`, {headers: {'Authorization': `Bearer ${userStorage.get().token}`}})
      },
      getOneSurvey:(id:number) =>{
        return axios.get(baseUrl+`/survey/${id}`)
      },
      crateOneSurvey:(survey:CreateSurvey) =>{
        return axios.post(baseUrl+`/survey/create`,{survey:survey}, {headers: {'Authorization': `Bearer ${userStorage.get().token}`}})
      },
      updateOneSurvey:(survey:UpdateSurvey) => {
        return axios.put(baseUrl+`/survey`,{survey:survey}, {headers: {'Authorization': `Bearer ${userStorage.get().token}`}})
      },
      deleteOneSurvey:(id:number) =>{
        return axios.delete(baseUrl+`/survey/${id}`, {headers: {'Authorization': `Bearer ${userStorage.get().token}`}})
      },
    }

    language = {
      getAllLanguages:()=> {
        return axios.get(baseUrl+`/language/all`, {headers: {'Authorization': `Bearer ${userStorage.get().token}`}})
      }
    }

    question = {
      createOneQuestion:(question:CreateQuestion,surveyId:number)=> {
        return axios.post(baseUrl+`/question`,{question:question,survey:surveyId}, {headers: {'Authorization': `Bearer ${userStorage.get().token}`}})
      },
      updateOneQuestion:(question:UpdateQuestion,surveyId:number)=>{
        return axios.put(baseUrl+`/question`,{question:question,survey:surveyId}, {headers: {'Authorization': `Bearer ${userStorage.get().token}`}})
      },
      removeOneQuestion:(questionId:number)=> {
        return axios.delete(baseUrl+`/question/${questionId}`, {headers: {'Authorization': `Bearer ${userStorage.get().token}`}})
      }
    }

    questionType = {
      getAllQuestionsTypes:()=> {
        return axios.get(baseUrl+`/questions/type/all`, {headers: {'Authorization': `Bearer ${userStorage.get().token}`}})
      },
      getOneQuestionsTypeById:(questionTypeId:number)=> {
        return axios.get(baseUrl+`/questions/type/${questionTypeId}`, {headers: {'Authorization': `Bearer ${userStorage.get().token}`}})
      },
    }

    answer = {
      getOneAnswerByCode:(answerCode:string,surveyId:number)=> {
        return axios.get(baseUrl+`/survey/${surveyId}/answer/${answerCode}`)
      },
      getSurveyAnswersById:(surveyId:number)=> {
        return axios.get(baseUrl+`/survey/${surveyId}/answers`)
      },
      createOneAnswer:(data:CreateAnswer,surveyId:number)=> {
        return axios.post(baseUrl+`/survey/${surveyId}/answer`,{answer:data})
      },
      updateOneAnswer:(data:UpdateAnswer,surveyId:number)=> {
        return axios.put(baseUrl+`/survey/${surveyId}/answer`,{answer:data})
      },
    }

}