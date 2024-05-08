import {defineStore } from 'pinia'
import { api } from 'src/services';
import {Answer, AnswerBody, CreateAnswer, Question, Survey, UpdateAnswer } from 'src/services/dto'
import Storage from "../utils/storage"
import { jwtDecode } from "jwt-decode";
import router from 'src/router';
import { encodeCode } from 'src/utils/utils';
import { decodeCode } from '../utils/utils'

const answerStorage = new Storage<string>('answer')


const useAnswerStore = defineStore('answer', {
    state: () => ({
        currentViewSurvey :null as Survey|null,
        currentViewQuestion :null as Question|null,
        currentAnswer:{token:"",id:0,body:[],valid:false,language:"",code:"",createdDate:new Date(),lastUpdateDate:new Date(),ended:false,position:1} as Answer|null,
        currentPosition: 1 as number,
        currentBody:[] as Array<AnswerBody>,
        answerCode:null,
        errors:{load:null as string|null}
    }),

    actions: {

        resetErrors(){
            this.errors = {load:null}
        },

        resetAnswer(){
            this.currentPosition = 1;
            this.answerCode = null;
            this.currentAnswer = {token:"",id:0,body:[],valid:false,language:"",code:"",createdDate:new Date(),lastUpdateDate:new Date(),ended:false,position:1};
            this.currentBody = []
        },

        async init(encodedCode:string){
            this.resetAnswer();


            const decryptedParam = decodeCode(encodedCode)
            const surveyId = decryptedParam.surveyId
            const answerCode = decryptedParam.answerCode

            if(answerStorage.get()){
                const decryptedToken = decodeCode(answerStorage.get())
                if(decryptedToken){
                    if(decryptedToken.surveyId != decryptedParam.surveyId){
                        router.push({ path: `/survey/error` });
                    }
                }
            }
       
            this.loadSurvey(surveyId).then(()=> {

                switch(this.currentViewSurvey.entry){
                    case "private":
                        if(!answerCode){
                            router.push({ path: `/survey/error` });
                        }else{
                            this.answerCode = answerCode;
                            this.loadAnswer(answerCode) 
                            answerStorage.set(encodedCode)
                        }
                        break;
                    case "public":
                        if(answerStorage.get()){
                            const decryptedToken = decodeCode(answerStorage.get())
                            if(decryptedToken){
                                if(decryptedToken.surveyId != decryptedParam.surveyId){
                                    router.push({ path: `/survey/error` });
                                }else{
                                    this.loadAnswer(decryptedToken.answerCode)
                                }
                            }
                        }else{
                            if(answerCode){
                                this.answerCode = answerCode;
                                this.loadAnswer(answerCode)
                                answerStorage.set(encodedCode)
                            }else{
                                this.createAnswer({body:[],ended:false,position:this.currentPosition,code:answerCode})
                            }
                        }
                        break;
                }
            })
        },

        async loadSurvey(surveyId:number){
            return api.surveys.getOneSurvey( surveyId )
            .then( (response) => {
                this.currentViewSurvey = response.data.survey
            }).catch((error) => {
                this.$patch({
                    errors : {load :error.response.data.message}
                })
            })
        },

        async loadAnswer(answerCode:string){
            this.resetAnswer();
            if(this.currentViewSurvey && answerCode){
                api.answer.getOneAnswerByCode(answerCode,this.currentViewSurvey.id).then((response:any)=> {

                    response.data.answer.body.forEach((question:AnswerBody) => {
                        this.currentBody.push(question)
                    }); 


                    this.currentAnswer = response.data.answer
                    this.currentPosition = response.data.answer.position
                    this.restorePosition(response.data.answer.position)

                }).catch((error)=>{
                    router.push({ name: 'surveyError', params: { error: error } });
                })
            }else{
                this.errors.load = "Error loading"
                router.push({ name: 'surveyError', params: { error: this.errors } });
            }
        },

        async createAnswer(answer:CreateAnswer){
            answerStorage.remove()
            this.resetAnswer();
            if(this.currentViewSurvey ){
                api.answer.createOneAnswer(answer,this.currentViewSurvey.id).then((response:any)=>{
                    this.currentViewQuestion=this.currentViewSurvey.question.filter((question:any) => question.position == response.data.answer.position)[0]
                    this.currentAnswer.code = response.data.answer.code
                    this.currentAnswer.id = response.data.answer.id
                    answerStorage.set(encodeCode(this.currentViewSurvey.id,this.currentAnswer.code))


                }).catch((error) => {
                    this.$patch({
                        errors : {create :error.response.data.message}
                    })
                })
            }else{
                this.errors.load = "Error loading"
                router.push({ name: 'surveyError', params: { error: this.errors } });
            }
            
        },

        
        async createPreAnswer(surveyId:number,entry:string){
            this.resetAnswer();
            return api.answer.createOneAnswer(this.currentAnswer,surveyId).then((response) => {
                answerStorage.set(encodeCode(surveyId,response.data.answer.code))
                if(entry == "private"){
                    router.push({ path: `/survey/${encodeCode(surveyId, response.data.answer.code)}` });
                }else if(entry == "public"){
                    router.push({ path: `/survey/${encodeCode(surveyId,"")}` });
                }
            })
        },

        async saveAnswer(){
            this.currentPosition++
            this.currentAnswer.position++
            return api.answer.updateOneAnswer(this.currentAnswer,this.currentViewSurvey.id)
        },

        checkAndReadToken(){
            if(answerStorage.get()){
                var decodedToken =  jwtDecode(answerStorage.get())
                this.currentAnswer.token = answerStorage.get()
                this.currentAnswer.code = decodedToken.code
                this.currentAnswer.ended = decodedToken.ended

                return this.currentAnswer

            }else{
                return false
            }
        },

        restorePosition(position:number){
            this.currentViewQuestion =  this.currentViewSurvey.question.filter((question:any) => question.position == position)[0]
         
        },

        async sendQuestionValue(value:string){
            this.saveBody(value)
            this.currentAnswer.body=this.currentBody
            this.currentAnswer.ended = this.checkIfEnded()


            this.saveAnswer().then(response => {

                this.currentAnswer.ended = response.data.answer.ended
                this.currentViewQuestion = this.currentViewSurvey.question.filter((question:any) => question.position == this.currentPosition)[0]
            })
        },

        checkIfEnded(){
            return this.currentPosition >= this.currentViewSurvey.question.length -1
        },

        saveBody(data:any){
                this.currentBody.push(
                    {
                        id:this.currentViewQuestion.id,
                        name:this.currentViewQuestion.name,
                        type:this.currentViewQuestion.type,
                        value:data
                    }
                )

            return this.currentAnswerBody
        },


    }
})

export default useAnswerStore

