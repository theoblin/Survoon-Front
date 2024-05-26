<template>
    <div id="nps">
        <div style="width:200px;">
            <DoughnutChart :plugins="[centerTextPlugin]" v-bind="doughnutChartProps" />
        </div>
    </div>
</template>


<script setup lang='ts'>
import { computed, ref } from "vue";
import { DoughnutChart, useDoughnutChart } from "vue-chart-3";
import { Chart as ChartJS, ChartData, ChartOptions, registerables } from "chart.js";


const props = defineProps(["nps", "typesPourc"])

// Define the custom plugin
const centerTextPlugin = {
    id: 'centerText',
    beforeDraw: function (chart) {
        const width = chart.width;
        const height = chart.height;
        const ctx = chart.ctx;
        ctx.restore();
        const fontSize = (height / 114).toFixed(2);
        ctx.font = ` bold  ${fontSize}em sans-serif `;
        const text = props.nps;
        const textX = Math.round((width - ctx.measureText(text).width) / 2);
        const textY = height / 1.6;
        ctx.fillText(text, textX, textY);
        ctx.save();
    },
};

ChartJS.register(...registerables);

console.log(props.typesPourc)

const dataValues = ref([20, 40, 60]);
const dataLabels = ref(["01", "02", "03"]);

const testData = computed<ChartData<"doughnut">>(() => ({
    labels: dataLabels.value,
    datasets: [
        {
            data: dataValues.value,
            backgroundColor: [
                "red",
                "orange",
                "green",
            ],
            cutout: 85,
            borderRadius: {
                outerStart: 10,
                outerEnd: 10,
                innerStart: 10,
                innerEnd: 10
            },
        },
    ],
}));

const options = computed<ChartOptions<"doughnut">>(() => ({
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
        legend: {
            display: false
        },
    },
    rotation: -90,       // Start angle for drawing arcs (start from the bottom)
    circumference: 180,  // Sweep to cover half a circle
}));

const { doughnutChartProps, doughnutChartRef } = useDoughnutChart({
    chartData: testData,
    options,
});


</script>