import {defineStore } from 'pinia'
import { api } from 'src/services'
import { CreateQuestion, Question, Survey, UpdateQuestion } from 'src/services/dto'
import useNotificationStore from 'src/stores/notifications';

const notificationStore = useNotificationStore()

const useSurveyStore = defineStore('survey', {
    state: () => ({
        currentEditQuestion:null as Question|null,
        currentReadQuestion:null as Question|null,
        currentEditSurvey :null as Survey|null,
        currentReadSurvey :null as Survey|null,
        questionsTypes:[],
        editMode:false as boolean,
        errors : {load:null,create:null,delete:null},
        isLoading:true
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
        },
        getQuestionsTypes(state){
            return state.questionsTypes
        }
    },
    actions: {
        resetErrors(){
            this.errors = {load:null,create:null,delete:null}
        },
        resetState(){
            this.currentEditQuestion = null;
            this.currentEditSurvey = null;
            this.currentReadQuestion = null;
            this.currentReadSurvey = null;
        },
        displayQuestion(id:number){
            this.resetErrors();
            this.currentEditQuestion = this.currentEditSurvey.question.filter((question) => question.id == id)[0]
        },
        reorder(){
            this.currentEditSurvey.question= this.currentEditSurvey.question.sort(function(a,b) { return parseFloat(a.position) - parseFloat(b.position) } )
        },
        createQuestion(question:CreateQuestion){
            this.resetErrors();

            question.position = this.currentEditSurvey.question.length+1;

            api.question.createOneQuestion( question,this.currentEditSurvey.id )
            .then( (response:any) => {
                this.currentEditSurvey.question.push(response.data.question)
                this.currentEditQuestion = response.data.question
            }).catch((error) => {
                this.$patch({
                    errors : {create :error.response.data.message}
                })
            })
        },
        removeQuestion(id:number){
            this.resetErrors();
            
            api.question.removeOneQuestion(id)
            .then( () => {
                const deletedPos =  this.currentEditSurvey.question.filter((question:any) => question.id == id)[0].position

                this.currentEditSurvey.question = this.currentEditSurvey.question.filter((question:any) => question.id != id)

                 this.currentEditSurvey.question.forEach((q) => {
                    if(deletedPos< q.position ){
                        q.position--
                        api.question.updateOneQuestion({position:q.position,id:q.id},this.currentEditSurvey.id)
                    }
                }); 
                this.currentEditQuestion = this.currentEditSurvey.question.slice(-1)[0]
                this.reorder()
            }).catch((error) => {
                this.$patch({
                    errors : {delete :error.response.data.message}
                })
            })
        },
        updateQuestion(question:UpdateQuestion,surveyId:number){
            this.resetErrors();
            api.question.updateOneQuestion(question,surveyId)
            .then( (response) => {
                this.currentEditQuestion = response.data.question 
                const index = this.currentEditSurvey.question.findIndex((question:Question) => question.id == response.data.question.id)
                this.currentEditSurvey.question[index] = response.data.question 
                notificationStore.addNotificationInQueue("test", "coudsds")
            }).catch((error) => {
                this.$patch({
                    errors : {delete :error.response.data.message}
                })
            })
        },
        loadSurvey(surveyId:number){
            this.resetState()
            this.resetErrors();
            api.surveys.getUserOneSurveySecure( surveyId )
            .then( async (survey) => {
                this.currentEditSurvey=survey.data.survey
                this.errors.load=null;
                await new Promise(resolve => setTimeout(resolve, 1000)); //Sleep to check loading
                this.isLoading = false
                this.reorder()

                /* this.displayQuestion( survey.data.survey.question[0].id) */
            }) 
            .catch((error) => {
                this.$patch({
                    errors : {load :error.response.data.message}
                })
            })
        },
        loadQuestionsTypes(){
            this.resetErrors();
            this.questionsTypes = [];
            api.questionType.getAllQuestionsTypes()
            .then( (types) => {
                types.data.forEach((type:any) => {
                    this.questionsTypes.push(type.questionType)
                });
            }).catch((error) => {
                this.$patch({
                    errors : {load :error.response.data.message}
                })
            })
        },
        getOneQuestionType(id:number){
            return api.questionType.getOneQuestionsTypeById(id)
        }
    }
})

export default useSurveyStore

