<template>
    <div id="survey">
        <SurveyError v-if="surveyStore.errors" :messaage="surveyStore.errors">{{ surveyStore.errors }}</SurveyError>

        <SurveyEditQuestion v-if="surveyStore.editMode">
        </SurveyEditQuestion>

        <SurveyQuestion v-if="!surveyStore.editMode">
        </SurveyQuestion>
    </div>
</template>

<script setup lang="ts">
import useSurveyStore from 'src/stores/survey';
import SurveyError from "../components/SurveyError.vue";
import SurveyEditQuestion from "../components/SurveyEditQuestion.vue";
import SurveyQuestion from "../components/SurveyQuestion.vue";

const surveyStore = useSurveyStore()

</script>