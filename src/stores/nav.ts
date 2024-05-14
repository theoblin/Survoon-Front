import {defineStore } from 'pinia'


const useNavStore = defineStore('nav', {
    state: () => ({
        open:false as boolean,
        currentPage:"",
    }),

    getters:{

    },
    actions: {

        toggleDropdown(){
            this.open = !this.open;
        },
        closeDropdown(){
        this.open = false;
        },
        setCurrentPage(page:string){
            this.currentPage = page;
        }

    }
})

export default useNavStore

