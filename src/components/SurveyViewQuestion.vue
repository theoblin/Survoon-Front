<template>
    <div id="surveyQuestion" :style="{ 'background-color': react['background-color'] }">
        <component :fontSize="react.fontSize" :title="react.title" :is="react.comp">
        </component>
    </div>
</template>


<script setup lang="ts">
import useAnswerStore from 'src/stores/answer';
import { defineAsyncComponent, reactive, watch } from 'vue'

const answerStore = useAnswerStore()

const react: any = reactive({
    comp: null,
    title: null,
    fontSize: null,
    'background-color': 'red'
})

watch(
    () => answerStore.currentViewQuestion, function (question, oldVal) {
        if (question) {
            react.title = question.title
            react.fontSize = question.style[0].fontSize
            react.comp = defineAsyncComponent(() => import(`./questionTypes/${question.questionType.name}.vue`));
        }
    },
    { deep: true }
);

watch(() => answerStore.currentAnswer.ended, function (newVal, oldVal) {
    if (newVal) {
        react.comp = defineAsyncComponent(() => import(`./questionTypes/End.vue`));
    }
});




</script>