<template>
    <Loading v-if="surveyStore.isLoading"></Loading>
    {{ getCurrentSurvey }}
    <SurveyError v-if="surveyStore.errors.load" :message="surveyStore.errors.load"></SurveyError>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import useSurveysStore from 'src/stores/surveys';
import SurveyError from "../components/SurveyError.vue";
import { useRoute } from 'vue-router';

const route = useRoute()

const {
    getCurrentSurvey,
} = storeToRefs(
    useSurveysStore()
);

const surveyStore = useSurveysStore()
surveyStore.loadSurvey(Number(route.params.id))

</script>