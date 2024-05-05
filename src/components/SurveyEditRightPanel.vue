<template>
    <div id="rightPanel">
        <Select @change="liveUpdateComp($event)" :placeholder="'Type de question'" :attrDisplay="'name'"
            :attrValue="'id'" :options="surveyStore.questionsTypes" v-model="selected.questionType"></Select>
        <InputEdit @input="liveUpdate($event, 'title')" v-model="selected.title"></InputEdit>
        <InputEdit @input="liveUpdate($event, 'name')" v-model="selected.name"></InputEdit>
        <Select @change="liveUpdateConfig($event, 'fontSize')" :placeholder="'Taille du titre'" :attrDisplay="'value'"
            :attrValue="'value'"
            :options="[{ 'value': '8' }, { 'value': '9' }, { 'value': '10' }, { 'value': '11' }, { 'value': '12' }, { 'value': '14' }, { 'value': '16' }, { 'value': '20' }, { 'value': '22' }, { 'value': '24' }, { 'value': '26' }, { 'value': '28' }, { 'value': '30' }]"
            v-model="selected.config[0].fontSize"></Select>
        <Button @click="save()">Save</Button><br>

    </div>
</template>

<script setup lang="ts">
import useSurveyStore from 'src/stores/survey';
import { reactive, watch } from 'vue';
import Select from "../components/Select.vue";
import InputEdit from "../components/InputEdit.vue";
import Button from "../components/Button.vue";

const surveyStore = useSurveyStore()
surveyStore.loadQuestionsTypes()

const selected: any = reactive({
    name: null,
    title: null,
    questionType: null,
    config: [{ "fontSize": null }],
})

watch(
    () => surveyStore.currentEditQuestion, function (question, oldVal) {
        if (question) {
            selected.title = question.title
            selected.name = question.name
            selected.config[0].fontSize = question.config[0].fontSize
            selected.questionType = question.questionType.id
        }
    },
    { deep: true, immediate: true },
);
function liveUpdateConfig(event: any, element: string) {
    surveyStore.currentEditQuestion.config[0][element] = event.target.value
}

function liveUpdate(event: any, element: string) {
    surveyStore.currentEditQuestion[element] = event.target.value
}

function liveUpdateComp(event: any) {
    console.log(event.target.value)
    surveyStore.getOneQuestionType(event.target.value).then((response) => {
        surveyStore.currentEditQuestion.questionType = response.data.questionType
    })
}

function save() {
    selected.id = surveyStore.currentEditQuestion.id;
    surveyStore.updateQuestion(selected, surveyStore.currentEditSurvey.id)
}


</script>