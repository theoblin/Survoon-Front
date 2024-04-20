<template>
    <div id="surveyItem">
        <div>
            {{ props.id }}
            {{ props.name }}
            {{ props.visibility }}
            {{ props.active }}
            {{ props.createdDate }}
            {{ props.languageId }}
        </div>
        <Button @click="editSurvey()">Editer</Button>
        <Button @click="testSurvey()">Tester</Button>
    </div>
</template>


<script setup lang="ts">
import Button from "../components/Button.vue";
import router from 'src/router';

const props = defineProps(['name', 'visibility', 'active', 'languageId', 'createdDate', 'id'])

function editSurvey() {
    router.push({ path: `/user/survey/${props.id}` });
}

function testSurvey() {
    router.push({ path: `/survey/${props.id}` });
}

</script>