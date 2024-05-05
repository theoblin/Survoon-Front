import {defineStore } from 'pinia'
import { Notification} from 'src/services/dto'


const useNotificationStore = defineStore('notification', {
    state: () => ({
        queue:[] as Array<Notification>,
        displayTime:5000
    }),

    getters:{
    },
    actions: {

        addNotificationInQueue(type:string,message:string){
            this.queue.push({type,message})
        }

    }
})

export default useNotificationStore

