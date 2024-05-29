<template>
  <div class="container">
<!--  <img :src="encodeURI(`http://localhost:8000/notes_segment/f817b2ce-17db-4dcc-84bb-2f042e93dffc`)" alt="">-->
  <Bubble :data="data" :options="options"/>
    </div>
</template>

<script>
import {
  Chart as ChartJS,
  Tooltip,
  Legend,
  PointElement,
  LinearScale
} from 'chart.js'
import { Bubble } from 'vue-chartjs'
import AudioService from "@/services/AudioService.js";

ChartJS.register(LinearScale, PointElement, Tooltip, Legend)

export default {
  components: {
    Bubble
  },
  data() {
    return {
      options: {
        responsive: true,
        maintainAspectRatio: true
      },
      data: {
        datasets: [
          {
            label: 'Эталонный вокал',
            backgroundColor: '#7C8CF8',
            data: [
            ]
          },
          {
            label: 'Собственный вокал',
            backgroundColor: '#f87979',
            data: [
                              {

                r: 10,
                x: 3.01,
                y: 293.66
              },

              {
                x: 3.02,
                y: 293.66,
                r: 10
              }
            ]
          }
        ]
      }
    }
  },
  methods: {
    async loadCurrentChart() {
      let data = await AudioService.getNotesSegment()
      let arr = [];
      for (let i = 0; i < data.data.timeAxis.length; i++) {
        arr.push({x: data.data.timeAxis[i], y: data.data.freq[i], r: 10})
      }
      console.log(arr)
      this.data.datasets[0].data = arr
      console.log(this.data)
    },
  },
  mounted() {
    this.loadCurrentChart();
  }
}
</script>
