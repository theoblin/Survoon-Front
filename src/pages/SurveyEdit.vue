<template>
    <div id="surveyEdit">
        <SurveyEditLeftPanel :listQuestions="getCurrentEditSurvey.survey.question">
        </SurveyEditLeftPanel>
        <SurveyError v-if="surveyStore.errors.load" :message="surveyStore.errors.load"></SurveyError>
        <div id="surveyZone">
            <Survey></Survey>
        </div>
        <SurveyEditRightPanel>
        </SurveyEditRightPanel>
    </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import useSurveyStore from 'src/stores/survey';
import SurveyError from "../components/SurveyError.vue";
import SurveyEditLeftPanel from "../components/SurveyEditLeftPanel.vue";
import SurveyEditRightPanel from "../components/SurveyEditRightPanel.vue";
import Survey from "../pages/Survey.vue";
import { useRoute } from 'vue-router';

const route = useRoute()

const {
    getCurrentEditSurvey,
} = storeToRefs(
    useSurveyStore()
);

const surveyStore = useSurveyStore()
surveyStore.loadSurvey(Number(route.params.id))

</script>