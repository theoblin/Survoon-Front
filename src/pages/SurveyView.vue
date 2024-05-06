<template>
    <div id="surveyEdit">
        <div id="surveyZone">
            {{ answerStore.errors }}
            <SurveyViewQuestion>
            </SurveyViewQuestion>
        </div>
    </div>
</template>

<script setup lang="ts">
import SurveyViewQuestion from "../components/SurveyViewQuestion.vue";
import { useRoute } from 'vue-router';
import useAnswerStore from 'src/stores/answer';
import { decodeCode } from '../utils/utils'

const route = useRoute()
const answerStore = useAnswerStore()
const decrypted = decodeCode(route.params.id)

answerStore.init(decrypted.surveyId, decrypted.answerCode)

</script>