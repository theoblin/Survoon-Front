import {defineStore, storeToRefs } from 'pinia'
import { api } from 'src/services'
import { CreateSurvey, Survey,Error } from 'src/services/dto'
import useUserStore from 'src/stores/user';
import useModaleStore from './modale';
import Storage from "../utils/storage"
import router from 'src/router';
const answerStorage = new Storage<string>('answer')

const {
    getUser,
} = storeToRefs(
    useUserStore()
);

  const modaleStore = useModaleStore()


const useSurveysStore = defineStore('surveys', {
  state: () => ({
    list: [] as  Array<Survey>,
    filteredList: [] as  Array<Survey>,
    errors : [] as Array<Error>,
    isLoading:false as boolean
  }),
  getters:{
    getSurveys(state){
        return state.list
    },
    getFilteredSurveys(state){
      return state.filteredList
  },
  },
  actions: {
    toggleLoading(status:boolean){
      status?this.isLoading = status:this.isLoading = !this.isLoading
    },
    resetErrors(){
      this.errors = [] as Array<Error>
    },
    reinitFilters(){
      this.filteredList = this.list
    },
    loadSurveyList(){
      this.toggleLoading(true)
      this.resetErrors()
      answerStorage.remove()
        api.surveys.getUserSurveys( getUser.value.id )
        .then( async (surveys) => {
            this.list=surveys.data
            this.filteredList = this.list
            await new Promise(resolve => setTimeout(resolve, 1000)); //Sleep to check loading
            this.toggleLoading(false)
            this.resetErrors()
          }).catch((error)=> {
          this.errors.push({name:'error',message:error.response.data.message,type:'load'}) 
          this.toggleLoading(false)
        })
    },
    createSurvey(surveyData:CreateSurvey){
      this.toggleLoading(true)
      this.resetErrors()
      api.surveys.crateOneSurvey( surveyData )
      .then( (response) => {
        this.list.push(response.data)
        this.toggleLoading(false)
        this.resetErrors()
        modaleStore.open = false
        router.push({ path: `/user/survey/${response.data.survey.id}` });
      }) 
      .catch((error) => {
        this.errors.push({name:'error',message:error.response.data.message,type:'create'}) 
        this.toggleLoading(false)
      })
    },
    filter(object:any){

      object.forEach((element:object )=> {
        if(element.value != null){
          if(element.type == "range"){
            this.filteredList = this.list.filter((item) => (item.survey[element.name] >= element.value[0] &&  item.survey[element.name] <= element.value[1]));
          }
          if(element.name == 'length'){
           this.filteredList = this.list.filter((item) => (item.survey.question.length >= element.value[0] &&  item.survey.question.length <= element.value[1]));
          }
        }
      });
    },
    sort(object:object){
      if(object.position == 'up'){
        switch(object.type){
          case 'date':
            this.filteredList = this.filteredList.sort(function(a:any, b:any){return new Date(a.survey[object.element])-new Date(b.survey[object.element])});
            break;
            default:
            this.filteredList = this.filteredList.sort(function(a:any, b:any){return a.survey[object.element]-b.survey[object.element]});
        }
      }else if((object.position == 'down')){
        switch(object.type){
          case 'date':
            this.filteredList = this.filteredList.sort(function(a:any, b:any){return new Date(b.survey[object.element])-new Date(a.survey[object.element])})
            break;
            default:
              this.filteredList = this.filteredList.sort(function(a:any, b:any){return b.survey[object.element]-a.survey[object.element]})
            }
      }
      console.log( this.filteredList)
    }
}
})

export default useSurveysStore

