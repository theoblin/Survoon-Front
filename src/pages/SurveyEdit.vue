<template>
    <Loading v-if="surveyStore.isLoading"></Loading>
    <div v-if="!surveyStore.isLoading" id="surveyEdit">
        <SurveyEditLeftPanel :listQuestions="getCurrentEditSurvey ? getCurrentEditSurvey.question : ''">
        </SurveyEditLeftPanel>
        <SurveyError v-if="surveyStore.errors.load" :message="surveyStore.errors.load"></SurveyError>
        <div id="surveyZone">
            <SurveyEditQuestion>
            </SurveyEditQuestion>
        </div>
        <SurveyEditRightPanel v-if="getOpenSurveySetting || getOpenQuestionSetting">
            <QuestionSettings v-if="getOpenQuestionSetting"></QuestionSettings>
            <SurveySettings v-if="getOpenSurveySetting"></SurveySettings>
        </SurveyEditRightPanel>
    </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import useSurveyStore from 'src/stores/survey';
import SurveyError from "../components/SurveyError.vue";
import Loading from "../components/Loading.vue";
import SurveyEditLeftPanel from "../components/SurveyEditLeftPanel.vue";
import SurveyEditRightPanel from "../components/SurveyEditRightPanel.vue";
import SurveyEditQuestion from "../components/SurveyEditQuestion.vue";
import QuestionSettings from "../components/QuestionSettings.vue";
import SurveySettings from "../components/SurveySettings.vue";
import { useRoute } from 'vue-router';
import Storage from "../utils/storage"
const answerStorage = new Storage<string>('answer')

const route = useRoute()
const props = defineProps(["editMode"])

const {
    getCurrentEditSurvey,
    getCurrentEditQuestion,
    getOpenSurveySetting,
    getOpenQuestionSetting
} = storeToRefs(
    useSurveyStore()
);

answerStorage.remove()

const surveyStore = useSurveyStore()
surveyStore.editMode = props.editMode

surveyStore.loadSurvey(Number(route.params.id))

</script>