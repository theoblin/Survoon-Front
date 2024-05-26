<template>
    <Loading v-if="resultStore.isLoading"></Loading>
    <div id="results-page">
        <div class="top-actions">
            <div class="left">
                <font-awesome-icon class="action" :icon="['fas', 'grip']" />
                <font-awesome-icon class="action" :icon="['fas', 'grip-lines']" />
                <div class="action">
                    <Select @change="sort($event)" class="action" :attrValue="'value'" :attrDisplay="'name'" :options="[{ name: 'Date de création (asc) ', value: JSON.stringify({ element: 'createdDate', position: 'up', type: 'date' }) },
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
        <div class="content">
            <div class="left">
                <ResultBloc :width="'100%'" :height="'100%'">
                    <div class="comments">
                        <ResultComment :value="item.value" :createdDate="item.createdDate"
                            v-for="item in resultStore.textAnswers">
                        </ResultComment>
                    </div>
                </ResultBloc>
            </div>
            <div class="right">
                <div class="top">
                    <ResultBloc :width="'100%'" :height="'100%'">
                        <div class="bloc">
                            <div class="header">
                                NPS
                            </div>
                            <div v-if="resultStore.searchForType('Reco')" class="nps">
                                <NPSChart :typesPourc="resultStore.calculateRecoType('', 'pourc')"
                                    :nps="resultStore.calculateNPS()">
                                </NPSChart>

                            </div>
                        </div>
                    </ResultBloc>

                    <ResultBloc :width="'100%'" :height="'100%'">
                        <div class="bloc">
                            <div class="header">
                                Ouvertures
                            </div>
                            <div class="body">
                                <span class="data">{{ resultStore.openAnswers }}</span>
                            </div>
                        </div>
                    </ResultBloc>

                    <ResultBloc :width="'100%'" :height="'100%'">
                        <div class="bloc">
                            <div class="header">
                                Valides
                            </div>
                            <div class="body">
                                <span class="data">{{ resultStore.validAnswers }}</span>
                            </div>
                        </div>
                    </ResultBloc>
                    <ResultBloc :width="'100%'" :height="'100%'">
                        <div class="bloc">
                            <div class="header">
                                Terminées
                            </div>
                            <div class="body">
                                <span class="data">{{ resultStore.endedAnswers }}</span>
                            </div>
                        </div>
                    </ResultBloc>
                </div>
                <div class="bottom">
                    <ResultBloc :width="'100%'" :height="'100%'">
                        <div class="bloc">
                            <LineChart v-bind="lineChartProps" />
                        </div>
                    </ResultBloc>
                    <ResultBloc :width="'100%'" :height="'100%'">
                    </ResultBloc>
                </div>

            </div>

        </div>
    </div>
</template>

<script setup lang="ts">
import { LineChart, useLineChart } from "vue-chart-3";
import { Chart, ChartData, ChartOptions, registerables } from "chart.js";
import NPSChart from "../components/NPSChart.vue";
import Loading from "../components/Loading.vue";
import ResultComment from "../components/ResultComment.vue";

Chart.register(...registerables);

const dataValues = ref([30, 20, 60, 30, 50, 60, 30, 50, 60, 30, 50, 10]);
const dataLabels = ref(["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"]);
const toggleLegend = ref(true);

const options = computed<ChartOptions<"line">>(() => ({
    filled: true,
    scales: {
        myScale: {
            position: toggleLegend.value ? "left" : "right",
            grid: {
                display: true,
            },
        },
        x: {
            grid: {
                display: false
            }
        },

    },
    plugins: {
        legend: {
            display: false
        },
        title: {
            display: true,
            text: "",
        },
    },
}));

const testData = computed<ChartData<"line">>(() => ({
    labels: dataLabels.value,
    datasets: [
        {
            tension: 0.5,
            data: dataValues.value,
            backgroundColor: [
                "#e94f37",
            ],
            borderColor: "#e94f37"
        },
    ],
}));

const { lineChartProps, lineChartRef } = useLineChart({
    chartData: testData,
    options,
});



const route = useRoute()

const resultStore = useResultStore()

resultStore.loadAnswers(route.params.id)




import useResultStore from "src/stores/results";
import ResultBloc from "../components/ResultBloc.vue";
import { useRoute } from "vue-router";
import { computed, ref } from "vue";

</script>