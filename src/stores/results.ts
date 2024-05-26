import {defineStore } from 'pinia'
import { api } from 'src/services'
import { Answer, AnswerBody, Question, QuestionType, Survey } from 'src/services/dto'
import useSurveyStore from './survey'

const surveyStore = useSurveyStore()


const useResultStore = defineStore('result', {
    state: () => ({
        isLoading: true as boolean,
        currentReadSurvey :null as Survey|null,
        validAnswers : 0 as number,
        endedAnswers : 0 as number,
        openAnswers : 0 as number,
        allQuestionTypes : [] as Array<QuestionType> ,
        formatedAnswers : [] as Array<Object>,
        valuesByTypes : {},
        textAnswers:[]
    }),

    actions: {

        searchForType(type:string){
            return (this.allQuestionTypes?.filter((item) => (item.name == type)).length) >= 1
        },

        async loadAnswers(surveyId:number){
            this.$reset()
            api.surveys.getUserOneSurveySecure( surveyId )
            .then( async (response) => {
                this.currentReadSurvey = response.data.survey

                response.data.survey.question.forEach(((question:Question) => {
                    if(!this.allQuestionTypes.includes(question.questionType)){
                        this.allQuestionTypes?.push(question.questionType)
                        this.valuesByTypes[question.questionType.name] = []
                    }
                }))

                
                await api.answer.getSurveyAnswersById(surveyId).then(response => {
                    response.data.forEach(e => {

                        console.log(e.answer)

                        e.answer.body.forEach((body:AnswerBody) => {
                            this.valuesByTypes[body.type].push(body.value)

                            if(body.type == "Text"){
                                this.textAnswers.push({value:body.value,createdDate : e.answer.createdDate})
                            }
                        })

                        this.formatedAnswers.push(e.answer)

                        this.formatedAnswers.push(e.answer)
                        this.openAnswers ++
                        if(e.answer.valid == true){
                            this.validAnswers ++
                        }
                        if(e.answer.ended == true){
                            this.validAnswers ++
                            this.endedAnswers ++
                        }

                        
                    })
                })


                console.log(this.textAnswers)

            })

            await new Promise(resolve => setTimeout(resolve, 1000)); //Sleep to check loading
            this.isLoading = false
        },

        // RECO 
         calculateRecoType(selected:string,format?:string){

            var types = {pres:0,neut:0,detr:0};
            var total = 0;

            this.valuesByTypes['Reco'].forEach(answer => {
                if(answer >=9) types.pres++
                if(answer >=7 && answer < 9) types.neut++
                if(answer <=6) types.detr++
                total++;
            })

            if(format == "pourc"){
                for (var [prop,value] of Object.entries(types)) {
                    types[prop] = (value / total) * 100
                }
            }

            return selected!=""?types[selected]:types

        },

         calculateNPS(){
            const pourcPres = ( this.calculateRecoType('pres') / this.validAnswers) * 100
            const pourcDetr = ( this.calculateRecoType('detr') / this.validAnswers) * 100

            return (pourcPres - pourcDetr).toFixed(2)

        }

    }
})

export default useResultStore

