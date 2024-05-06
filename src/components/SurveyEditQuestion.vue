<template>
    <div v-if="getCurrentEditQuestion" id="surveyQuestion">
        <component :fontSize="react.fontSize" :title="react.title" :is="react.comp">
        </component>
    </div>
</template>


<script setup lang="ts">
import { storeToRefs } from 'pinia';
import useSurveyStore from 'src/stores/survey';
import { defineAsyncComponent, reactive, ref, watch } from 'vue'

const surveyStore = useSurveyStore()

const react: any = reactive({
    comp: null,
    title: null,
    fontSize: null
})

// Wait for current question to change 
watch(
    () => surveyStore.currentEditQuestion, function (question, oldVal) {
        if (question) {
            react.title = question.title
            react.fontSize = question.config[0].fontSize
            react.comp = defineAsyncComponent(() => import(`./questionTypes/${question.questionType.name}.vue`));
        }
    },
    { deep: true, immediate: true },
);


const {
    getCurrentEditQuestion,
} = storeToRefs(
    useSurveyStore()
);




</script>