import {defineStore, storeToRefs } from 'pinia'
import { api } from 'src/services'
import { CreateSurvey, Survey } from 'src/services/dto'
import useUserStore from 'src/stores/user';
import useModaleStore from './modale';
import router from 'src/router';

const {
    getUser,
  } = storeToRefs(
    useUserStore()
  );

  const modaleStore = useModaleStore()

  
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
    loadSurveyList(){
      this.isLoading = true;
        api.surveys.getUserSurveys( getUser.value.id )
        .then( (surveys) => {
            this.list=surveys.data
            this.isLoading = false;
            this.errors.load=null
        }).catch((error)=> {
          this.$patch({
            errors : {load :error.response.data.message}
          })
          this.isLoading = false;
        })
    },
    createSurvey(surveyData:CreateSurvey){
      this.isLoading = true;
      api.surveys.crateOneSurvey( surveyData )
      .then( (response) => {
        this.list.push(response.data)
        modaleStore.toggle()
        this.isLoading = false;
        router.push({ path: `/user/survey/${response.data.survey.id}` });
      }) 
      .catch((error) => {
        this.isLoading = false;
        this.$patch({
          errors : {create :error.response.data.message}
        })
      })
    }
}
})

export default useSurveysStore

