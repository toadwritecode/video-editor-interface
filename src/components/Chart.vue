<template>
  <div class="container mt-5">
    <h2 class="mb-4 text-center">Vue 3 Vuechart Js 5 Bar Chart Example</h2>
    <Scatter id="my-chart-id" v-if="this.loaded" :options="chartOptions" :data="chartData" />
  </div>
</template>

<script>
import { Scatter } from 'vue-chartjs'

import ChartDataLabels from 'chartjs-plugin-datalabels';

import {Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, PointElement, LineElement} from 'chart.js'
import AudioService from "@/services/AudioService.js";

ChartJS.register(ChartDataLabels, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, PointElement, LineElement)

export default {
  name: 'BarChart',
  components: { Scatter },

  async mounted() {
    const notes = await AudioService.getNotesSegment();

    console.log(notes);

    notes.forEach(note => {
       this.chartData.datasets.push({
        data: [
          {
            x: note.start,
            y: note.frequency
          },
          {
            x: note.end,
            y: note.frequency
          }
        ],
        borderColor: '#7C8CF8',
        borderWidth: 15,
        pointBackgroundColor: '#7C8CF8',
        pointBorderColor: '#7C8CF8',
        pointRadius: 1,
        pointHoverRadius: 1,
        fill: false,
        tension: 0,
        showLine: true,
        label: note.note
      })
    });
    console.log(this.chartData);
    this.loaded = true;
  },

  data() {
    return {
      loaded: false,
      chartData: {
        datasets: []
      },
      chartOptions: {
        scaleShowValues: true,
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Сравнение двух аудио файлов'
          },
          labels: {
            render: 'percentage',
            color: 'white'
          }
        },
      },
      plugins: [ChartDataLabels]
    }
  }
}
</script>
