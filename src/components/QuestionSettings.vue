<template>
    <div class="question-setting">
        <div class="body">
            <Select @change="liveUpdateComp($event)" :placeholder="'Type de question'" :attrDisplay="'name'"
                :attrValue="'id'" :options="surveyStore.questionsTypes" v-model="selected.questionType"></Select>
            <Input class="name-input" @input="liveUpdate($event, 'name')" v-model="selected.name"></Input>
            <Input class="color-input" :type="'color'" @input="liveUpdate($event, 'color')"></Input>
            <Select @change="liveUpdateStyle($event, 'fontSize')" :placeholder="'Taille du titre'"
                :attrDisplay="'value'" :attrValue="'value'"
                :options="[{ 'value': '8' }, { 'value': '9' }, { 'value': '10' }, { 'value': '11' }, { 'value': '12' }, { 'value': '14' }, { 'value': '16' }, { 'value': '20' }, { 'value': '22' }, { 'value': '24' }, { 'value': '26' }, { 'value': '28' }, { 'value': '30' }]"
                v-model="selected.style[0].fontSize"></Select>
        </div>
        <div class="footer">
            <Button :bstyle="'transparent'" @click="save()"><font-awesome-icon class="icon"
                    :icon="['fas', 'floppy-disk']" /></Button>
            <Button :bstyle="'transparent'" @click="removeQuestion(selected.id)"><font-awesome-icon class="icon"
                    :icon="['fas', 'trash']" /></Button>
            <Button :bstyle="'transparent'" @click="testSurvey()"><font-awesome-icon class="icon"
                    :icon="['far', 'eye']" /></Button>
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