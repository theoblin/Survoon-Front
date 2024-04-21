<template>
    <div id="leftPanel">
        <Button @click="addQuestion()">Ajouter une question</Button>
        <div @click="surveyStore.displayQuestion(item.id)" class="leftPanelQuestionItem"
            v-for="item in props.listQuestions" :key="item.id">
            {{ item.name }}
            <div v-if="surveyStore.currentEditQuestion">
                {{ item.id == surveyStore.currentEditQuestion.id ? "Selectionned" : "" }}
            </div>
            <Button @click="removeQuestion(item.id)">Delete</Button>
        </div>
    </div>
</template>

<script setup lang="ts">
import useSurveyStore from 'src/stores/survey';
import Button from "../components/Button.vue";
import { reactive } from 'vue';
import { CreateQuestion } from 'src/services/dto';

const props = defineProps(['listQuestions'])

const surveyStore = useSurveyStore()

const question: CreateQuestion = reactive({
    name: 'Nouvelle question',
    type: 'Satis',
})

function addQuestion() {
    surveyStore.createQuestion(question)
}

function removeQuestion(id: number) {
    surveyStore.removeQuestion(id)
}



</script>