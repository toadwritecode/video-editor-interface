<template>
  <div class="container">
    <video :src="`http://localhost:8000/files/${id}`" ref="video" controls></video>
  </div>

  <div class="control-container">
    <div class="cut-container">
      <input v-model="startTime" class="interval-select" type="text" placeholder="Время от">
      <input v-model="endTime" class="interval-select" type="text" placeholder="Время до">

      <button class="add-interval-button" @click="addTimeCode">Добавить промежуток</button>
    </div>

    <div class="intervals-wrapper">
      <div class="intervals" v-for="(interval, index) in intervals" :key="index">
        <div class="interval">{{interval.start}}</div>
        <div class="interval">{{interval.end}}</div>
        <div class="play" @click="play(index)"><img src="../assets/icons8-play-button-48.png" alt="" width="32"></div>
      </div>
    </div>

    <button class="add-interval-button" @click="cropVideo">Обрезать видео</button>
  </div>

</template>

<script>
import videoService from "@/services/VideoService.js";

export default {
  props: ['id'],
  data() {
    return {
      intervals: [],
      startTime: 0,
      endTime: 0,
    };
  },
  methods: {
    addTimeCode() {
      const start = parseFloat(this.startTime);
      const end = parseFloat(this.endTime);

      let invalidInterval = false;
      for (const interval of this.intervals) {
        if (interval.start <= end && interval.end >= start) {
          invalidInterval = true;
        }
      }

      if (invalidInterval) {
        return;
      }

      this.intervals.push({"start": start, "end": end})
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
      videoService.cropVideo(this.intervals, this.id)
    }
  },
};
</script>

<style scoped>
.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 75%;
  margin: 0 auto;
}

.container video {
  width: 100%;
  height: 500px;
}

.cut-container {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  margin-bottom: 12px;
}

.cut-container .interval-select {
  background-color: #f4f3f9;
  border: 2px dashed #fe0000;
  color: #fe0000;
  padding: 5px;
  text-align: center;
  margin-right: 10px;
}

.cut-container input[type="text"]:focus {
  border: 2px solid #fe0000;
  outline: 0;
}

.cut-container input[type="text"]:focus::placeholder {
  color: transparent;
}

.cut-container ::placeholder {
  color: #fe0000;
}

.add-interval-button {
  outline: 0;
  border: 0;
  color: #fff;
  border-radius: 4px;
  font-weight: 400;
  padding: 8px 13px;
  background: #fe0000;
}

.intervals-wrapper {
  width: 100%;
}

.intervals {
  margin-top: 25px;
  display: flex;
}

.interval {
  width: 73px;
  margin-right: 10px;
  background-color: #f4f3f9;
  border: 2px dashed #fe0000;
  color: #fe0000;
  padding: 5px;
}

.control-container {
  margin: 0 auto;
  width: 540px;
  display: flex;
  flex-wrap: wrap;
}

</style>