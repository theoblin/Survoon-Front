<template>
    <div id="leftPanel">
        <div class="header">
            <Button :bstyle="'secondary'" @click="addQuestion()">Ajouter une question</Button>
        </div>
        <div class="body">
            <div v-for="item in props.listQuestions">
                <div @click="surveyStore.displayQuestion(item.id)"
                    :class="{ 'selectioned': (surveyStore.currentEditQuestion ? surveyStore.currentEditQuestion.id == item.id : false), 'leftPanelQuestionItem': true }"
                    :key="item.id">
                    <strong class="position">{{ item.position }}.</strong>
                    <span class="name">{{ item.name }}</span>

                    <div v-if="surveyStore.currentEditQuestion">
                    </div>
                    <!--  <Button @click="removeQuestion(item.id)">Delete</Button> -->
                </div>
            </div>
        </div>
        <div class="footer">
            <Button @click="testSurvey()">Tester</Button>
            <Button @click="testNotif()">Tester notif</Button>
        </div>
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
    answerStore.createPreAnswer(surveyStore.currentEditSurvey.id, surveyStore.currentEditSurvey.entry)
}

function testNotif() {
    notificationStore.addNotificationInQueue("success", "save")
}

</script>