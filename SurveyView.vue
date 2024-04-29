<template>
    <div id="surveyEdit">
        <div id="surveyZone">
            <SurveyViewQuestion>
            </SurveyViewQuestion>
        </div>
    </div>
</template>

<script setup lang="ts">
import SurveyViewQuestion from "../components/SurveyViewQuestion.vue";
import { useRoute } from 'vue-router';
import useAnswerStore from 'src/stores/answer';
import { watch } from "vue";

const route = useRoute()

const answerStore = useAnswerStore()

answerStore.init(Number(route.params.id))

</script>