<template>
    <div id="reco">
        {{ props.title }}
        <div v-for="item in [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]">
            <div @click="choice(item)" :class="item == question.value ? 'reco_item_selected' : 'reco_item'">
                {{ item }}
            </div>
        </div>
        <button @click="next()">Next</button>
    </div>
</template>

<script setup lang="ts">
import useAnswerStore from 'src/stores/answer';
import { reactive } from 'vue';
const answerStore = useAnswerStore()

const props = defineProps(["title"])

const question = reactive({
    value: null
})

function choice(item: number) {
    question.value = item
}


function next() {
    answerStore.sendQuestionValue(question.value)
}

</script>