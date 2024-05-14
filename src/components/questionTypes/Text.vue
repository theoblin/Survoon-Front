<template>
    <div id="text">
        <div class="title">
            <div class="title" v-if="!props.editMode" :style="styleObject">{{ question.title }}</div>
            <InputEdit class="edit" :style="styleObject" @change="liveUpdate($event, 'title')" v-model="question.title"
                v-if="props.editMode"></InputEdit>
        </div>
        <textarea class="opentext" v-model="model">
        </textarea>

        <Button :bstyle="'secondary'" @click="next()">Next</Button>

    </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import Button from "../Button.vue";
import useAnswerStore from 'src/stores/answer';
import useSurveyStore from 'src/stores/survey';
import InputEdit from "../InputEdit.vue";

const answerStore = useAnswerStore()
const surveyStore = useSurveyStore()
const props = defineProps(["title", "fontSize", "editMode"])

const model = defineModel()

const question = reactive({
    title: props.title,
    value: model
})

const styleObject = reactive({
    fontSize: props.fontSize + "px",
})

function liveUpdate(event: any, element: string) {
    surveyStore.currentEditQuestion[element] = event.target.value
}


function next() {
    answerStore.sendQuestionValue(question.value)
}


</script>