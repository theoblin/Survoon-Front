import {defineStore } from 'pinia'


const useModaleStore = defineStore('modale', {
    state: () => ({
        open:false as boolean
    }),

    getters:{
        getStatus(state){
            return state.open
        }
    },
    actions: {

        toggle(){
            this.open = !this.open
        }

    }
})

export default useModaleStore

