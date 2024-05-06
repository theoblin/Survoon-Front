import {defineStore, storeToRefs } from 'pinia'
import { api } from 'src/services'
import { CreateSurvey, Survey } from 'src/services/dto'
import useUserStore from 'src/stores/user';
import useModaleStore from './modale';
import useAnswerStore from './answer';
import Storage from "../utils/storage"
import useNotificationStore from 'src/stores/notifications';
import router from 'src/router';
const answerStorage = new Storage<string>('answer')

const {
    getUser,
} = storeToRefs(
    useUserStore()
);

  const modaleStore = useModaleStore()
  const answerStore = useAnswerStore()
  const notificationStore = useNotificationStore()

  
const useSurveysStore = defineStore('surveys', {
  state: () => ({
    list: [] as  Array<Survey>,
    currentSurvey :null,
    errors : {create:null,load:null},
    isLoading:false
  }),
  getters:{
    getSurveys(state){
        return state.list
    },
  },
  actions: {
    toggleLoading(status:boolean){
      status?this.isLoading = status:this.isLoading = !this.isLoading
    },
    resetErrors(){
      this.errors = {create:null,load:null} 
    },
    loadSurveyList(){
      this.toggleLoading(true)
      this.resetErrors()
      answerStorage.remove()
        api.surveys.getUserSurveys( getUser.value.id )
        .then( async (surveys) => {
            this.list=surveys.data
            await new Promise(resolve => setTimeout(resolve, 1000)); //Sleep to check loading
            this.toggleLoading(false)
            this.errors.load=null
        }).catch((error)=> {
          this.$patch({
            errors : {load :error.response.data.message}
          })
          this.toggleLoading(false)
        })
    },
    createSurvey(surveyData:CreateSurvey){
      this.toggleLoading(true)
      this.resetErrors()
      api.surveys.crateOneSurvey( surveyData )
      .then( (response) => {
        this.list.push(response.data)
        modaleStore.toggle()
        this.toggleLoading(false)
        router.push({ path: `/user/survey/${response.data.survey.id}` });
      }) 
      .catch((error) => {
        this.$patch({
          errors : {create :error.response.data.message}
        })
        this.toggleLoading(false)
      })
    }
}
})

export default useSurveysStore

