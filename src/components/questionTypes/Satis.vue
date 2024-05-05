<template>
    <div id="satis">
        <div :style="styleObject">{{ question.title }}</div>
        <div v-for="item in [1, 2, 3, 4, 5]">
            <div @click="choice(item)" :class="item ==
                question.value ?
                'reco_item_selected' : 'reco_item'">
                {{ item }}
            </div>
        </div>
        <button @click="next()">Next</button>
    </div>
</template>

<script setup lang="ts">
import useAnswerStore from 'src/stores/answer';
import useSurveyStore from 'src/stores/survey';
import { reactive, watch } from 'vue';

const answerStore = useAnswerStore()

const props = defineProps(["title", "fontSize"])

const question = reactive({
    title: props.title,
    value: null
})

const styleObject = reactive({
    fontSize: props.fontSize + "px",
})


function choice(item: number) {
    question.value = item
}


function next() {
    answerStore.sendQuestionValue(question.value)
}

</script>