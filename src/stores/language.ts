import {defineStore } from 'pinia'
import { api } from 'src/services'
import { Error } from 'src/services/dto'


const useLanguageStore = defineStore('language', {
    state: () => ({
        languageList:[] ,
        errors : [] as Array<Error>,
    }),
    actions: {
        resetErrors(){
            this.errors = [] as Array<Error>
        },
        loadLanguageList(){
            this.resetErrors()
            this.languageList = []
            api.language.getAllLanguages()
            .then( (response) => {
                this.errors.load = null
                response.data.forEach((lang:any) => {
                    this.languageList.push(lang.language)
                });
            }).catch((error)=> {
                this.errors.load = null
                this.errors.push({name:'error',message:error.response.data.message,type:'load'}) 

            })
        }
    }
})

export default useLanguageStore

