import {defineStore } from 'pinia'
import { api } from 'src/services';
import {Answer, AnswerBody, CreateAnswer, Question, Survey, UpdateAnswer } from 'src/services/dto'
import Storage from "../utils/storage"
import { jwtDecode } from "jwt-decode";
import router from 'src/router';
import { encodeCode } from 'src/utils/utils';

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

        async init(surveyId:number,code?:string){
            this.resetAnswer();
            this.loadSurvey(surveyId).then(()=> {
                const r = this.checkAndReadToken()
                if(r){
                    console.log(r.code)
                    this.answerCode = r.code;
                    this.loadAnswer(r.code)
                }else if(code){
                    console.log(code)
                    this.answerCode = code;
                    this.loadAnswer(code)
                }
                else{
                    this.createAnswer({body:[],ended:false,position:this.currentPosition,code:code})
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
                    console.log("1")
                    router.push({ name: 'surveyError', params: { error: error } });
                })
            }else{
                console.log("2")
                this.errors.load = "Error loading"
                router.push({ name: 'surveyError', params: { error: this.errors } });
            }
        },

        async createAnswer(answer:CreateAnswer){
            answerStorage.remove()
            this.resetAnswer();
            if(this.currentViewSurvey ){
                api.answer.createOneAnswer(answer,this.currentViewSurvey.id).then((response:any)=>{
                    answerStorage.set(response.data.answer.token)
                    this.currentViewQuestion=this.currentViewSurvey.question.filter((question:any) => question.position == response.data.answer.position)[0]
                    this.currentAnswer.code = response.data.answer.code
                    
                }).catch((error) => {
                    this.$patch({
                        errors : {create :error.response.data.message}
                    })
                })
            }else{
                console.log("3")
                this.errors.load = "Error loading"
                router.push({ name: 'surveyError', params: { error: this.errors } });
            }
            
        },

        
        async createPreAnswer(surveyId:number){
            this.resetAnswer();
            return api.answer.createOneAnswer(this.currentAnswer,surveyId).then((response) => {
                answerStorage.set(response.data.answer.token)
                router.push({ path: `/survey/${encodeCode(surveyId, response.data.answer.code)}` });
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
                console.log( response.data.answer)

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

            return this.currentAnswerBody
        },


    }
})

export default useAnswerStore

