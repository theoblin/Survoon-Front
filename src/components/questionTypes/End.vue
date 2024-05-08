<template>
    <div id="text">
        <textarea :style="styleObject" v-if="editMode" class="opentext" v-model="question.title"
            @change="liveUpdate($event, 'title')">
        </textarea>
        <div :style="styleObject" v-if="!editMode">
            {{ question.title }}
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import useSurveyStore from 'src/stores/survey';

const surveyStore = useSurveyStore()
const props = defineProps(["title", "fontSize", "editMode"])


const question = reactive({
    title: props.title,
})

const styleObject = reactive({
    fontSize: props.fontSize + "px",
})

function liveUpdate(event: any, element: string) {
    surveyStore.currentEditQuestion[element] = event.target.value
}




</script>