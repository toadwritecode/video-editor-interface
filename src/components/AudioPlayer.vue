<template>
  <div class="container">
    <div class="audio-image">
      <img src="../assets/icons8-wav-96.png" alt="Значок файла формата .wav">
    </div>
    <audio :src="`http://localhost:8000/files/${id}`" :id="id"></audio>
    <div class="audio-controller">
      <img
          @click="playAudio(index)"
          src="../assets/play.png"
          alt="Значок проигрывания аудио файла"/>
    </div>
    <p>{{this.text}}</p>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  width: 75%;
  margin: 50px auto;
}

.audio-image {
  margin: 0 auto;
}

.audio-image img {
  width: 140px;
}

.audio-controller {
  margin: 0 auto;
}

.audio-controller img {
  width: 40px;
}
</style>

<script>
import videoService from "@/services/VideoService.js";

export default {
  props: ['id', 'text'],
  data() {
    return {
      intervals: [],
      startTime: null,
      endTime: null,
      times: null
    };
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
