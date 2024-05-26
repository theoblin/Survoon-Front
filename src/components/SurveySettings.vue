<template>
    <div class="survey-setting">
        <div class="body">
            <div class="item">
                <span>Name</span>
                <Input class=" name-input" v-model="selected.name"></Input>
            </div>
            <div class="item">
                <span>Link</span>
                <Input v-model="selected.link"></Input>
            </div>
            <div class="item">
                <span>QR code</span>
                <QRCodeVue3 :value="selected.link" :width="100" :height="100" downloadButton="my-button" :dotsOptions="{
                    type: 'dots',
                    color: '#e94f37',
                    gradient: {
                        type: 'linear',
                        rotation: 0,
                        colorStops: [
                            { offset: 0, color: '#e94f37' },
                            { offset: 1, color: '#e94f37' },
                        ],
                    },
                }" :download="true" :downloadOptions="{ name: 'vqr', extension: 'png' }" />
            </div>


            <div class="item">
                <span>Visiblity</span>
                <Select :attrDisplay="'value'" :attrValue="'value'"
                    :options="[{ 'value': 'private' }, { 'value': 'public' }]" v-model="selected.entry"></Select>

            </div>

            <div class="item">
                <span>Background</span>
                <div class="style">
                    <div class="item">
                        <span>Toggle </span>
                        <input type="checkbox" id="scales" name="scales" v-model="background"
                            @input="liveUpdate($event, 'background-toggle')" />
                        <span>Color </span>
                        <Input class="color-input item" :type="'color'" @input="liveUpdate($event, 'color')"></Input>
                    </div>
                </div>
            </div>

        </div>
        <div class="footer">
            <Button :bstyle="'transparent'" @click="updateSurvey()"><font-awesome-icon class="icon"
                    :icon="['fas', 'floppy-disk']" /></Button>
            <Button :bstyle="'transparent'" @click="removeSurvey()"><font-awesome-icon class="icon delete"
                    :icon="['fas', 'trash']" /></Button>
        </div>
    </div>
</template>

<script setup lang="ts">
import useSurveyStore from 'src/stores/survey';
import { reactive, ref, watch } from 'vue';
import Input from "../components/Input.vue";
import Button from "../components/Button.vue";
import useAnswerStore from 'src/stores/answer';
import Select from "../components/Select.vue";
import QRCodeVue3 from "qrcode-vue3";

const surveyStore = useSurveyStore()
const answerStore = useAnswerStore()

surveyStore.loadQuestionsTypes()

const selected: any = reactive({
    id: null,
    name: null,
    link: null,
    entry: null

})

const background = ref(true)


watch(
    () => surveyStore.currentEditSurvey, function (survey, oldVal) {
        if (survey) {
            selected.id = survey.id
            selected.name = survey.name
            selected.link = 'http://localhost:5173/survey/' + survey.link
            selected.entry = survey.entry
        }
    },
    { deep: true, immediate: true },
);

function updateSurvey() {
    surveyStore.updateSurvey(selected)
}

function removeSurvey() {
    surveyStore.deleteSurvey(selected.id)
}

function liveUpdate(event: any, element: string) {
    surveyStore.currentEditSurvey.config[0][element] = background.value
    surveyStore.currentReadSurvey.config[0][element] = background.value
}

function testSurvey() {
    answerStore.createPreAnswer(surveyStore.currentEditSurvey.id, surveyStore.currentEditSurvey.entry)
}


</script>