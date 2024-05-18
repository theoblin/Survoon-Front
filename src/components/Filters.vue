<template>
    <div id="filters">
        <div class="item">
            <span class="title">Date de création</span>
            <Datepicker class="datepicker" v-model="filter.createdDate" range />
        </div>
        <div class="item">
            <span class="title">Date de mise à jour</span>
            <Datepicker class="datepicker" v-model="filter.lastUpdateDate" range />
        </div>

        <div class="item">
            <span class="title">Nombre de questions</span>
            <Slider v-model="filter.length" />{{ filter.length }}
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import Datepicker from '@vuepic/vue-datepicker';
import useSurveysStore from 'src/stores/surveys';
import Slider from "./Slider.vue";

const surveysStore = useSurveysStore()

const filter = reactive({
    createdDate: null,
    lastUpdateDate: null,
    length: null
})

function filterList() {
    surveysStore.filter([
        { "value": JSON.parse(JSON.stringify(filter['createdDate'])), name: "createdDate", "type": "range" },
        { "value": JSON.parse(JSON.stringify(filter['lastUpdateDate'])), name: "lastUpdateDate", "type": "range" },
        { "value": [0, filter['length']], name: "length", "type": "range" }
    ])
}

function reinit() {
    filter.createdDate = null
    filter.lastUpdateDate = null
    filter.length = null

    surveysStore.reinitFilters();
}


</script>