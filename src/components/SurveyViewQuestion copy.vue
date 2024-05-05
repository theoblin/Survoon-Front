<template>
    <div id="surveyQuestion">
        <component :title="react.title" :is="react.comp"></component>
    </div>
</template>


<script setup lang="ts">
import useAnswerStore from 'src/stores/answer';
import { defineAsyncComponent, reactive, watch } from 'vue'

const answerStore = useAnswerStore()

const react: any = reactive({
    comp: null,
    title: null
})

watch(() => answerStore.currentViewQuestion, function (newVal, oldVal) {
    if (newVal) {
        react.title = newVal.title
        react.comp = defineAsyncComponent(() => import(`./questionTypes/${newVal.questionType.name}.vue`));
    }
});

/* watch(() => answerStore.isEnded, function (newVal, oldVal) {
    if (newVal) {
        react.comp = defineAsyncComponent(() => import(`./questionTypes/End.vue`));
    }
});

 */


</script>