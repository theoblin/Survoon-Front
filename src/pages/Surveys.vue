<template>

    <Loading v-if="surveyStore.isLoading"></Loading>
    <div v-if="!surveyStore.isLoading" id="surveyList">
        <div v-for="item in getSurveys">
            <SurveyItem :id="item.survey.id" :name="item.survey.name" :link="item.survey.link"
                :visibility="item.survey.visibility" :active="item.survey.active" :templateId="item.survey.templateId"
                :languageId="item.survey.language.code" :createdDate="item.survey.createdDate">
            </SurveyItem>
        </div>
    </div>
    <div v-if="!surveyStore.isLoading">
        <Button @click="openCreateSurveyModale()">Nouveau survey</Button>
    </div>
    <Modale v-if="getStatus">
        <FormError v-if="surveyStore.errors.create">{{ surveyStore.errors.create }}</FormError>
        <Input v-model="form.name" :placeholderValue="'Name'"></Input>
        <Select :attr="'code'" :options="laguageStore.languageList" v-model="form.language"></Select>
        <Button @click="createSurvey()">Créer</Button>
    </Modale>
</template>


<script setup lang="ts">
import { storeToRefs } from 'pinia';
import useSurveysStore from 'src/stores/surveys';
import useLanguageStore from 'src/stores/language';
import SurveyItem from "../components/SurveyItem.vue";
import Loading from "../components/Loading.vue";
import Button from "../components/Button.vue";
import Modale from "../components/Modale.vue";
import Input from "../components/Input.vue";
import Select from "../components/Select.vue";
import FormError from "../components/FormError.vue";
import useModaleStore from 'src/stores/modale';
import { reactive } from 'vue';
import { CreateSurvey } from 'src/services/dto';

const {
    getSurveys,
} = storeToRefs(
    useSurveysStore()
);
const {
    getStatus,
} = storeToRefs(
    useModaleStore()
);

const surveyStore = useSurveysStore()
const modaleStore = useModaleStore()
const laguageStore = useLanguageStore()

surveyStore.loadSurveyList()

function openCreateSurveyModale() {
    modaleStore.toggle()
    laguageStore.loadLanguageList()
}

function createSurvey() {
    surveyStore.createSurvey(form)
}

const form: CreateSurvey = reactive({
    name: '',
    language: '',
})

</script>