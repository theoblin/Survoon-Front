<template>

    <Loading v-if="surveyStore.isLoading"></Loading>
    <div id="survey-list-page">
        <div class="content">

            <div v-if="!surveyStore.isLoading" id="survey-list">
                <div class="top-actions">
                    <div class="left">
                        <font-awesome-icon class="action" :icon="['fas', 'grip']" />
                        <font-awesome-icon class="action" :icon="['fas', 'grip-lines']" />
                        <div class="action">
                            <Select @change="sort($event)" class="action" :attrValue="'value'" :attrDisplay="'name'"
                                :options="[{ name: 'Date de création (asc) ', value: JSON.stringify({ element: 'createdDate', position: 'up', type: 'date' }) },
                                { name: 'Date de création (desc) ', value: JSON.stringify({ element: 'createdDate', position: 'down', type: 'date' }) },
                                { name: 'Date de mise à jour (asc)', value: JSON.stringify({ element: 'lastUpdateDate', position: 'up', type: 'date' }) },
                                { name: 'Date de mise à jour (desc)', value: JSON.stringify({ element: 'lastUpdateDate', position: 'down', type: 'date' }) },
                                ]">
                            </Select>
                        </div>
                    </div>
                    <!--       <div class="center">
                        <Search></Search>
                    </div> -->
                    <div>
                        <Button class="create" :bstyle="'default'" @click="openCreateSurveyModale()"><font-awesome-icon
                                class="action" :icon="['fas', 'plus']" /></Button>
                    </div>
                </div>
                <div class="items">
                    <SurveyItem v-for="item in getFilteredSurveys" :id="item.survey.id" :name="item.survey.name"
                        :link="item.survey.link" :visibility="item.survey.visibility" :active="item.survey.active"
                        :templateId="item.survey.templateId" :language="item.survey.language.code"
                        :createdDate="item.survey.createdDate" :entry="item.survey.entry"
                        :questions="item.survey.question" :lastUpdate="item.survey.lastUpdateDate">
                    </SurveyItem>
                </div>
            </div>
        </div>

        <Modale v-if="getStatus">
            <FormError id="form-error" v-if="surveyStore.errors.filter((error) => error.type == 'create')">{{
                surveyStore.errors.filter((error) => error.type == 'create')
                }}</FormError>
            <Input v-model="form.name" :placeholderValue="'Name'"></Input>
            <br>
            <Select :attrValue="'value'" :placeholder="'Type'" :attrDisplay="'value'"
                :options="[{ value: 'private' }, { value: 'public' }]" v-model="form.entry"></Select>
            <br>

            <Select :attrValue="'code'" :placeholder="'Language'" :attrDisplay="'code'"
                :options="laguageStore.languageList" v-model="form.language"></Select>
            <Button class="create" :bstyle="'default'" @click="createSurvey()">Créer</Button>
        </Modale>
    </div>

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
import { reactive, ref } from 'vue';
import { CreateSurvey } from 'src/services/dto';
import useNavStore from 'src/stores/nav';
import Search from "../components/Filters.vue";

const {
    getFilteredSurveys,
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

function sort(event: any) {
    surveyStore.sort(JSON.parse(event.target.value))
}

</script>