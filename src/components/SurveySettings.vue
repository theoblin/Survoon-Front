<template>
    <div class="survey-setting">
        <div class="body">
            <span>
                <Input class="name-input" v-model="selected.name"></Input>
            </span>
            <span>
                <font-awesome-icon class="icon" :icon="['fas', 'link']" />
                <Input v-model="selected.name"></Input>
            </span>

        </div>
        <div class="footer">
            <Button :bstyle="'danger'"><font-awesome-icon class="icon" :icon="['fas', 'trash']" /> Delete
                survey</Button>
            <Button :bstyle="'danger'"><font-awesome-icon class="icon" :icon="['fas', 'lock']" /> Visibility</Button>
        </div>
    </div>
</template>

<script setup lang="ts">
import useSurveyStore from 'src/stores/survey';
import { reactive, watch } from 'vue';
import Select from "../components/Select.vue";
import Input from "../components/Input.vue";
import Button from "../components/Button.vue";
import useAnswerStore from 'src/stores/answer';

const surveyStore = useSurveyStore()
const answerStore = useAnswerStore()

surveyStore.loadQuestionsTypes()

const selected: any = reactive({
    id: null,
    name: null,
    title: null,
    questionType: null,
    style: [{ "fontSize": null }],
})

watch(
    () => surveyStore.currentEditQuestion, function (question, oldVal) {
        if (question) {
            selected.id = question.id
            selected.title = question.title
            selected.name = question.name
            selected.style[0].fontSize = question.style[0].fontSize
            selected.questionType = question.questionType.id
        }
    },
    { deep: true, immediate: true },
);
function liveUpdateStyle(event: any, element: string) {
    surveyStore.currentEditQuestion.style[0][element] = event.target.value
}

function liveUpdate(event: any, element: string) {
    surveyStore.currentEditQuestion[element] = event.target.value
}

function liveUpdateComp(event: any) {
    surveyStore.getOneQuestionType(event.target.value).then((response) => {
        surveyStore.currentEditQuestion.questionType = response.data.questionType
    })
}

function save() {
    selected.id = surveyStore.currentEditQuestion.id;
    surveyStore.updateQuestion(selected, surveyStore.currentEditSurvey.id)
}

function removeQuestion(id: number) {
    surveyStore.removeQuestion(id)
}

function testSurvey() {
    answerStore.createPreAnswer(surveyStore.currentEditSurvey.id, surveyStore.currentEditSurvey.entry)
}


</script>