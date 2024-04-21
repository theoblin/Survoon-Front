<template>
    <div v-if="getCurrentEditQuestion" id="surveyQuestion">
        {{ getCurrentEditQuestion }}
    </div>
</template>


<script setup lang="ts">
import { storeToRefs } from 'pinia';
import useSurveyStore from 'src/stores/survey';

const props = defineProps(['name'])

const {
    getCurrentEditQuestion,
} = storeToRefs(
    useSurveyStore()
);

const surveyStore = useSurveyStore()

</script>