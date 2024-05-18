<template>
    <div id="surveyView">
        <div v-if="answerStore.testMode" class="back" @click="goBack()">
            <font-awesome-icon :icon="['fas', 'arrow-left']" /> Retour aux surveys
        </div>
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
import router from "src/router";

const route = useRoute()
const answerStore = useAnswerStore()

answerStore.init(route.params.id)



function goBack() {
    router.go(-1)
}

</script>