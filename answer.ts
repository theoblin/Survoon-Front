import {defineStore } from 'pinia'
import { api } from 'src/services';
import {Answer, AnswerBody, CreateAnswer, Question, Survey, UpdateAnswer } from 'src/services/dto'
import Storage from "../utils/storage"
import { jwtDecode } from "jwt-decode";

const answerStorage = new Storage<string>('answer')


const useAnswerStore = defineStore('answer', {
    state: () => ({
        currentViewSurvey :null as Survey|null,
        currentViewQuestion :null as Question|null,
        currentAnswer:{token:"",id:0,body:"{}",valid:false,language:"",code:"",createdDate:new Date(),lastUpdateDate:new Date(),ended:false,position:0} as Answer|null,
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
            this.currentAnswer = {token:"",id:0,body:"{}",valid:false,language:"",code:"",createdDate:new Date(),lastUpdateDate:new Date(),ended:false,position:0};
        },

        async init(surveyId:number){
              this.loadSurvey(surveyId).then(()=> {
                const r = this.checkAndReadToken()
                if(r){
                    this.answerCode = r.code;
                    this.loadAnswer(r.code).then((response)=>{
                       this.restorePosition(this.currentPosition)
                    })
                }else{
                    this.createAnswer({body:"{}",ended:false,position:this.currentPosition})
                }
                
            })
        },

        async loadSurvey(surveyId:number){
            return api.surveys.getUserOneSurvey( surveyId )
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
                    this.currentAnswer = response.data.answer
                    this.currentPosition = response.data.answer.position
                })
            }else{
                this.errors.load = "Error loading"
            }
        },

        async createAnswer(answer:CreateAnswer){
            this.resetAnswer();
            if(this.currentViewSurvey ){
                api.answer.createOneAnswer(answer,this.currentViewSurvey.id).then((response:any)=>{
                    answerStorage.set(response.data.answer.token)
                    this.currentViewQuestion=this.currentViewSurvey.question
                    this.currentAnswer.code = response.data.answer.code
                    .filter((question:any) => question.position == response.data.answer.position)[0]
                }).catch((error) => {
                    this.$patch({
                        errors : {create :error.response.data.message}
                    })
                })
            }else{
                this.errors.load = "Error loading"
            }
            
        },

        async saveAnswer(){
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
            
            console.log(this.currentAnswer)
            console.log(this.currentAnswer)


            this.saveAnswer().then(response => {
                this.currentPosition++
                this.currentAnswer.ended = response.data.answer.ended
                this.currentViewQuestion = this.currentViewSurvey.question.filter((question:any) => question.position == this.currentPosition)[0]
            })
        },

        checkIfEnded(){
            return this.currentPosition >= this.currentViewSurvey.question.length
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

            return JSON.stringify(this.currentAnswerBody)
        },


    }
})

export default useAnswerStore

