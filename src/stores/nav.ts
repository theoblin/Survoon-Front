import {defineStore } from 'pinia'


const useNavStore = defineStore('nav', {
    state: () => ({
        openUser:false as boolean,
        openLang:false as boolean,
        currentPage:"",
    }),

    getters:{

    },
    actions: {

        toggleUserDropdown(){
            this.openUser = !this.openUser;
        },
        closeUserDropdown(){
        this.openUser = false;
        },
        toggleLangDropdown(){
            this.openLang = !this.openLang;
        },
        closeLangDropdown(){
        this.openLang = false;
        },
        setCurrentPage(page:string){
            this.currentPage = page;
        }

    }
})

export default useNavStore

