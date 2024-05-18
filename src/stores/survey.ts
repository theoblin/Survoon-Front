import {defineStore } from 'pinia'
import router from 'src/router';
import { api } from 'src/services'
import { CreateQuestion, Question, Survey, UpdateQuestion, UpdateSurvey,Error } from 'src/services/dto'
import useNotificationStore from 'src/stores/notifications';

const notificationStore = useNotificationStore()

const useSurveyStore = defineStore('survey', {
    state: () => ({
        currentEditQuestion:null as Question|null,
        currentReadQuestion:null as Question|null,
        currentEditSurvey :null as Survey|null,
        currentReadSurvey :null as Survey|null,
        questionsTypes:[] as Array<Survey>,
        editMode:false as boolean,
        errors : [] as Array<Error>,
        isLoading:true as boolean,
        openQuestionSetting:false as boolean,
        openSurveySetting:false as boolean,
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
        },
        getOpenQuestionSetting(state){
            return state.openQuestionSetting
        },
        getOpenSurveySetting(state){
            return state.openSurveySetting
        }
    },
    actions: {
        resetErrors(){
            this.errors = [] as Array<Error>
        },
        resetState(){
            this.currentEditQuestion = null;
            this.currentEditSurvey = null;
            this.currentReadQuestion = null;
            this.currentReadSurvey = null;
            this.openQuestionSetting=false;
            this.openSurveySetting=false;
        },
        displayQuestion(id:number){
            this.resetErrors();
            this.currentEditQuestion = this.currentEditSurvey.question.filter((question) => question.id == id)[0]
            this.openQuestionSetting=true;
            this.openSurveySetting=false;
        },
        displaySurveySettings(){
            this.openSurveySetting=!this.openSurveySetting;
            this.openQuestionSetting=false;
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
                this.errors.push({name:'error',message:error.response.data.message,type:'create'}) 
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
                this.errors.push({name:'error',message:error.response.data.message,type:'delete'}) 
            })
        },
        updateQuestion(question:UpdateQuestion,surveyId:number){
            this.resetErrors();
            api.question.updateOneQuestion(question,surveyId)
            .then( (response) => {
                this.currentEditQuestion = response.data.question 
                const index = this.currentEditSurvey.question.findIndex((question:Question) => question.id == response.data.question.id)
                this.currentEditSurvey.question[index] = response.data.question 
                notificationStore.addNotificationInQueue("success", "Saved")
            }).catch((error) => {
                this.errors.push({name:'error',message:error.response.data.message,type:'delete'}) 
            })
        },
        async updateSurvey(survey:UpdateSurvey){
            api.surveys.updateOneSurvey(survey).then(response =>{
                notificationStore.addNotificationInQueue("success","Saved")
            })
        },
        async deleteSurvey(surveyId:number){
            api.surveys.deleteOneSurvey(surveyId).then(response =>{
                notificationStore.addNotificationInQueue("success","Deleted")
                router.push({ path: `/surveys` });
            })
        },
        async loadSurvey(surveyId:number){
            this.resetState()
            this.resetErrors();
            api.surveys.getUserOneSurveySecure( surveyId )
            .then( async (survey) => {
                this.currentEditSurvey=survey.data.survey
                this.errors.load=null;
                await new Promise(resolve => setTimeout(resolve, 1000)); //Sleep to check loading
                this.isLoading = false
                this.reorder()
            }) 
            .catch((error) => {
                this.errors.push({name:'error',message:error.response.data.message,type:'load'}) 
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
                this.errors.push({name:'error',message:error.response.data.message,type:'load'}) 
            })
        },
        getOneQuestionType(id:number){
            return api.questionType.getOneQuestionsTypeById(id)
        }
    }
})

export default useSurveyStore

