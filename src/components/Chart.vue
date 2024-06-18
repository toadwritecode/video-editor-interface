<template>
  <div class="container mt-5">
    <div class="legend">
      <div class="legend-item">
        <div class="legend-color" style="background-color: #da0064;"></div>
        <div class="legend-text">Эталон</div>
      </div>
      <div class="legend-item">
        <div class="legend-color" style="background-color: #7C8CF8;"></div>
        <div class="legend-text">Пользовательское аудио</div>
      </div>
    </div>
    <Scatter id="my-chart-id" v-if="this.loaded" :options="chartOptions" :data="chartData" />
  </div>

  <div>
    <table>
      <thead>
        <tr>
          <th>Частота</th>
          <th>Нота</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(value, key) in aaa" :key="key">
          <td>{{ key }}</td>
          <td>{{ value }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { Scatter } from 'vue-chartjs'

import {Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, PointElement, LineElement} from 'chart.js'
import AudioService from "@/services/AudioService.js";

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, PointElement, LineElement)

export default {
  name: 'BarChart',
  components: { Scatter },

  async mounted() {
    const notes = await AudioService.getNotesSegment();

    notes.forEach(note => {
      this.aaa[note['frequency']] = note['note'];
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
        pointRadius: 0,
        pointHoverRadius: 0,
        fill: false,
        tension: 0,
        showLine: true,
        label: note.note
      })
    });

    const notes2 = await AudioService.getNotesSegment2();

    notes2.forEach(note => {
      this.aaa[note['frequency']] = note['note'];
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
        borderColor: '#da0064',
        borderWidth: 15,
        pointBackgroundColor: '#da0064',
        pointBorderColor: '#da0064',
        pointRadius: 0,
        pointHoverRadius: 0,
        fill: false,
        tension: 0,
        showLine: true,
        label: note.note
      })
    });

    console.log(this.aaa)
    this.loaded = true;
  },

  data() {
    return {
      aaa: {},
      loaded: false,
      chartData: {
        datasets: []
      },
      chartOptions: {
        responsive: true,
        plugins: {
          legend: {
            display: false
          },
          title: {
            display: true,
            text: 'Сравнение двух аудио файлов'
          }
        },
        scales: {
          yAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'Hz',
            }
          }]
        }
      }
    }
  }
}
</script>
<script setup lang="ts">
</script>

<style scoped>
table {
  margin: 0 auto;
}
.legend {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.legend-item {
  display: flex;
  align-items: center;
  margin-right: 20px;
}

.legend-color {
  width: 20px;
  height: 20px;
  margin-right: 8px;
  border-radius: 50%; /* Для круглых элементов */
}
</style>