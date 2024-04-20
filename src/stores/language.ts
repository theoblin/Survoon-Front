import {defineStore } from 'pinia'
import { api } from 'src/services'
import { Language } from 'src/services/dto'


const useLanguageStore = defineStore('language', {
    state: () => ({
        languageList:[] ,
        errors:{load:null}
    }),
    actions: {

         loadLanguageList(){
            this.languageList = []
            api.language.getAllLanguages()
            .then( (response) => {
                this.errors.load = null
                response.data.forEach((lang:any) => {
                    this.languageList.push(lang.language.code)
                });
            }).catch((error)=> {
                this.errors.load = null
                this.$patch({
                    errors : {load :error.response.data.message}
                  })
            })
         }

    }
})

export default useLanguageStore

