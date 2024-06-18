<template>
  <div class="container">
    <div class="audio-image">
      <img src="../assets/icons8-wav-96.png" alt="Значок файла формата .wav">
    </div>
    <audio :src="`http://localhost:8000/files/${id}`" :id="id"></audio>
    <div class="audio-controller">
      <img
          @click="play(id)"
          src="../assets/play.png"
          alt="Значок проигрывания аудио файла"/>
    </div>
    <div class="transcript">
      <h2>Распознанный текст из аудио</h2>
           <div class="transcript-box">
        <p>{{ this.text ? this.text : 'Это аудио еще не было распознано'}}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #f9f9f9;
}

.audio-image img {
  width: 96px;
  height: 96px;
}

.audio-controller img {
  width: 48px;
  height: 48px;
  cursor: pointer;
  margin: 10px;
}

.transcript {
  margin-top: 20px;
  text-align: center;
  width: 100%;
}

.transcript h2 {
  font-size: 1.5em;
  margin-bottom: 10px;
}

.transcript-box {
  border: 1px solid #000;
  padding: 10px;
  width: 99%;
  overflow-wrap: anywhere;
  font-family: monospace;
}

.transcript-box p {
  margin: 0;
  white-space: pre-wrap;
  font-size: 1.2em;
  line-height: 1.4;
}
</style>

<script>
import videoService from "@/services/VideoService.js";

export default {
  props: ['id'],
  data() {
    return {
      intervals: [],
      text: null,
      startTime: null,
      endTime: null,
      times: null
    };
  },
  mounted() {
    this.text = localStorage.getItem(this.id)
    // console.log(this.id)
  },
  methods: {
    deleteImage(index) {
      this.intervals.splice(index, 1);
    },

    addTimeCode() {
      const start = parseFloat(this.startTime);
      const end = parseFloat(this.endTime);
      const times = parseFloat(this.times);

      let invalidInterval = false;
      for (const interval of this.intervals) {
        if (interval.start <= end && interval.end >= start) {
          invalidInterval = true;
        }
      }

      if (invalidInterval) {
        return;
      }

      this.intervals.push({"start": start, "end": end, "times": times});
    },
    play(index) {
      const frame = this.intervals[index]
      const video = this.$refs.video;

      video.currentTime = frame.start;

      const changeTimeHandler = (event) => {
        const interval = setInterval(() => {
          if (event.target.currentTime >= frame.end) {
            event.target.removeEventListener('playing', changeTimeHandler);
            clearInterval(interval);
            event.target.pause();
          }
        });
      }

      video.addEventListener('playing', changeTimeHandler);
      video.play();
    },

    cropVideo() {
      videoService.editVideo(this.intervals, this.id)
    }
  },
};
</script>
