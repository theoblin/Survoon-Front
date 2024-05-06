<template>
    <div id="text">
        <div :style="styleObject">{{ question.title }}</div>
        <textarea class="opentext" v-model="model">
        </textarea>
        <Button @click="next()">Next</Button>
    </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import Button from "../Button.vue";
import useAnswerStore from 'src/stores/answer';
const answerStore = useAnswerStore()

const props = defineProps(["title", "fontSize"])

const model = defineModel()

const question = reactive({
    title: props.title,
    value: model
})

const styleObject = reactive({
    fontSize: props.fontSize + "px",
})

function next() {
    answerStore.sendQuestionValue(question.value)
}


</script>