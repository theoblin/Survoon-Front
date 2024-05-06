import {defineStore } from 'pinia'
import { Notification} from 'src/services/dto'
import { v4 as uuidv4 } from 'uuid';


const useNotificationStore = defineStore('notification', {
    state: () => ({
        queue:[] as Array<Notification>,
        displayTime:5000,
        max:3
    }),

    getters:{
        getNotifications(state){
            return state.queue
        }
    },
    actions: {

        addNotificationInQueue(type:string,message:string){
            const id = uuidv4()
            if(this.queue.length>=this.max){
                this.queue.shift()
            }
            this.queue.push({type,message,id})
            new Promise(resolve => setTimeout(resolve, this.displayTime)).then((e)=>{
                this.removeNotificationFromQueue(id)
            })
            
        },
        removeNotificationFromQueue(id:string){
            this.queue = this.queue.filter((question) => question.id != id)
        }

    }
})

export default useNotificationStore

