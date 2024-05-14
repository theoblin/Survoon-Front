<template>
    <div id="reco">
        <div class="title">
            <div class="title" v-if="!props.editMode" :style="styleObject">{{ question.title }}</div>
            <InputEdit class="edit" :style="styleObject" @change="liveUpdate($event, 'title')" v-model="question.title"
                v-if="props.editMode"></InputEdit>
        </div>

        <div class="digits">
            <div v-for="item in [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]">
                <div @click="choice(item)" :class="{ 'selected': item == question.value, 'reco_item': true }">
                    {{ item }}
                </div>
            </div>
        </div>

        <Button :bstyle="'secondary'" @click="next()">Next</Button>
    </div>
</template>

<script setup lang="ts">
import useAnswerStore from 'src/stores/answer';
import useSurveyStore from 'src/stores/survey';
import { reactive } from 'vue';
import InputEdit from "../InputEdit.vue";
import Button from "../Button.vue";

const answerStore = useAnswerStore()
const surveyStore = useSurveyStore()

const props = defineProps(["title", "fontSize", "editMode"])

const question = reactive({
    title: props.title,
    value: null
})

const styleObject = reactive({
    fontSize: props.fontSize + "px",
})


function choice(item: number) {
    question.value = item
}

function liveUpdate(event: any, element: string) {
    surveyStore.currentEditQuestion[element] = event.target.value
}

function next() {
    answerStore.sendQuestionValue(question.value)
}

</script>