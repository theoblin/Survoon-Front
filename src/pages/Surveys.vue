<template>

    <Loading v-if="surveyStore.isLoading"></Loading>
    <div v-if="!surveyStore.isLoading" id="survey-list">
        <div v-for="item in getSurveys">
            <SurveyItem :id="item.survey.id" :name="item.survey.name" :link="item.survey.link"
                :visibility="item.survey.visibility" :active="item.survey.active" :templateId="item.survey.templateId"
                :language="item.survey.language.code" :createdDate="item.survey.createdDate" :entry="item.survey.entry"
                :questions="item.survey.question" :lastUpdate="item.survey.lastUpdateDate">
            </SurveyItem>
        </div>
        <div @click="openCreateSurveyModale()" id="item" class="new">
            <font-awesome-icon :icon="['fas', 'plus']" />
        </div>
    </div>
    <Modale v-if="getStatus">
        <FormError v-if="surveyStore.errors.create">{{ surveyStore.errors.create }}</FormError>
        <Input v-model="form.name" :placeholderValue="'Name'"></Input>
        <Select :attrValue="'value'" :attrDisplay="'value'" :options="[{ value: 'private' }, { value: 'public' }]"
            v-model="form.entry"></Select>
        <Select :attrValue="'code'" :attrDisplay="'code'" :options="laguageStore.languageList"
            v-model="form.language"></Select>
        <Button class="create" :bstyle="'default'" @click="createSurvey()">Créer</Button>
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
import useNavStore from 'src/stores/nav';

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
const navStore = useNavStore()

surveyStore.loadSurveyList()

navStore.setCurrentPage("surveys");

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
    entry: ''
})

</script>