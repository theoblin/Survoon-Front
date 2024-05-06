<template>
    <div id="leftPanel">
        <Button @click="addQuestion()">Ajouter une question</Button>
        <div @click="surveyStore.displayQuestion(item.id)" class="leftPanelQuestionItem"
            v-for="item in props.listQuestions" :key="item.id">
            {{ item.name }}
            {{ item.position }}
            <div v-if="surveyStore.currentEditQuestion">
                {{ item.id == surveyStore.currentEditQuestion.id ? "Selectionned" : "" }}
            </div>
            <br>
            <br><br><br><br>
            <Button @click="removeQuestion(item.id)">Delete</Button>
        </div>
        <Button @click="testSurvey()">Tester</Button>
        <Button @click="testNotif()">Tester notif</Button>

    </div>
</template>

<script setup lang="ts">
import useSurveyStore from 'src/stores/survey';
import Button from "../components/Button.vue";
import { reactive } from 'vue';
import { CreateQuestion } from 'src/services/dto';
import useAnswerStore from 'src/stores/answer';
import useNotificationStore from 'src/stores/notifications';

const surveyStore = useSurveyStore()
const answerStore = useAnswerStore()
const notificationStore = useNotificationStore()

const props = defineProps(['listQuestions'])

const question: CreateQuestion = reactive({
    name: 'Nouvelle question',
    type: 1,
    position: 1
})

function addQuestion() {
    surveyStore.createQuestion(question)
}

function removeQuestion(id: number) {
    surveyStore.removeQuestion(id)
}

function testSurvey() {
    answerStore.createPreAnswer(surveyStore.currentEditSurvey.id)
}

function testNotif() {
    notificationStore.addNotificationInQueue("test", "coudsds")
}

</script>