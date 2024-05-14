<template>
    <div @click="editSurvey()" id="item" class="survey">
        <div class="header">
            <div class="name">
                <strong>{{ props.name }}</strong>
            </div>
            <div class="language">
                <img class="flag" :src="getImgUrl(props.language)">
            </div>
        </div>

        <div class="body">
            <span class="date"><font-awesome-icon class="icon" :icon="['fas', 'clock']" />{{
                moment(props.createdDate).format('MMMM Do YYYY, h:mm:ss a') }}</span>
            <span class="update">
                <font-awesome-icon class="icon" :icon="['fas', 'clock-rotate-left']" />
                {{ moment(props.lastUpdateDate).format('MMMM Do YYYY, h:mm:ss a') }}
            </span>
            <span class="questions"> <font-awesome-icon class="icon" :icon="['fas', 'list']" /> {{
                props.questions ? props.questions.length : "0" }} questions</span>

        </div>

        <div class="actions">
            <div class="action" @click="editSurvey()"><font-awesome-icon :icon="['far', 'pen-to-square']" />
            </div>
            <div class="action" @click="testSurvey()"><font-awesome-icon :icon="['far', 'eye']" /></div>
            <div class="action">
                <font-awesome-icon :icon="['fas', 'chart-line']" />
            </div>
            <div class="action">
                <font-awesome-icon v-if="props.entry == 'private'" :icon="['fas', 'lock']" />
                <font-awesome-icon v-if="props.entry == 'public'" :icon="['fas', 'lock-open']" />
            </div>
        </div>

    </div>
</template>


<script setup lang="ts">
import router from 'src/router';
import useAnswerStore from 'src/stores/answer';
import moment from 'moment';

const answerStore = useAnswerStore()

const props = defineProps(['name', 'visibility', 'active', 'language', 'createdDate', 'id', 'entry', "questions", "lastUpdateDate"])

function editSurvey() {
    router.push({ path: `/user/survey/${props.id}` });
}

function testSurvey() {
    answerStore.createPreAnswer(props.id, props.entry)
}

function getImgUrl(lg: string) {
    return new URL('../assets/languages/' + lg + ".svg", import.meta.url).href
}

</script>