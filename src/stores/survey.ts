import {defineStore } from 'pinia'
import { api } from 'src/services'
import { CreateQuestion, Question, Survey } from 'src/services/dto'


const useSurveyStore = defineStore('survey', {
    state: () => ({
        currentEditQuestion:null as Question|null,
        currentReadQuestion:null as Question|null,
        currentEditSurvey :null as Survey|null,
        currentReadSurvey :null as Survey|null,
        editMode:false as boolean,
        errors : {load:null,create:null,delete:null}
    }),
    getters:{
        getCurrentEditSurvey(state){
            return state.currentEditSurvey
        },
        getCurrentEditQuestion(state){
            return state.currentEditQuestion
        },
        getCurrentReadSurvey(state){
            return state.currentReadSurvey
        },
        getCurrentReadQuestion(state){
            return state.currentReadQuestion
        }
    },
    actions: {

        displayQuestion(id:number){
            this.currentEditQuestion = this.currentEditSurvey.survey.question.filter((question) => question.id == id)[0]
        },
        createQuestion(question:CreateQuestion){
            api.question.createOneQuestion( question,this.currentEditSurvey.survey.id )
            .then( (response:any) => {
                this.currentEditSurvey.survey.question.push(response.data.question)
                this.currentEditQuestion = response.data.question
            }).catch((error) => {
                this.$patch({
                    errors : {create :error.response.data.message}
                })
            })
        },
        removeQuestion(id:number){
            api.question.removeOneQuestion(id)
            .then( () => {
                this.currentEditSurvey.survey.question = this.currentEditSurvey.survey.question.filter((question:any) => question.id != id)
                this.currentEditQuestion = this.currentEditSurvey.survey.question.slice(-1)
            }).catch((error) => {
                this.$patch({
                    errors : {delete :error.response.data.message}
                })
            })
        },
        loadSurvey(surveyId:number){
            this.errors.load=null;
            api.surveys.getUserOneSurvey( surveyId )
            .then( (survey) => {
                this.currentEditSurvey=survey.data
                this.errors.load=null;
            }) 
            .catch((error) => {
                this.$patch({
                    errors : {create :error.response.data.message}
                })
            })
        },
    }
})

export default useSurveyStore

