<template>
    <div v-if="!getCurrentEditQuestion" class="no-question-selected">
        <span v-if="getCurrentEditSurvey.question.length > 0">Select a question</span>
        <span v-if="getCurrentEditSurvey.question.length == 0">Ajoutez une nouvelle question</span>
    </div>
    <div v-if="getCurrentEditQuestion" id="surveyQuestion" :style="{ 'background-color': react['background-color'] }">
        <component :fontSize="react.fontSize" :title="react.title" :is="react.comp" :editMode="surveyStore.editMode">
        </component>
    </div>
</template>


<script setup lang="ts">
import { storeToRefs } from 'pinia';
import useSurveyStore from 'src/stores/survey';
import { defineAsyncComponent, reactive, ref, watch } from 'vue'

const surveyStore = useSurveyStore()

const {
    getCurrentEditQuestion,
    getCurrentEditSurvey
} = storeToRefs(
    useSurveyStore()
);




const react: any = reactive({
    comp: null,
    title: null,
    fontSize: null,
    'background-color': 'transparent'
})

// Wait for current question to change 
watch(
    () => surveyStore.currentEditQuestion, function (question, oldVal) {
        if (question) {
            react.title = question.title
            react.fontSize = question.style[0].fontSize
            react.comp = defineAsyncComponent(() => import(`./questionTypes/${question.questionType.name}.vue`));
        }
    },
    { deep: true, immediate: true },
);

watch(
    () => surveyStore.currentEditSurvey, function (survey, oldVal) {
        if (survey) {
            console.log(survey)
            react['background-color'] = survey.config[0]
        }
    },
    { deep: true, immediate: true },
);





</script>