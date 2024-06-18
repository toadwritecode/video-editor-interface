<template>
  <div>
  <LoadingScreen v-if="isLoading" />
  <div class="container">
    <video :src="encodeURI(`http://localhost:8000/files/${id}`)" ref="video" controls></video>
  </div>

  <div class="control-container">
    <div class="cut-container">
      <input v-model="speed" class="interval-select" type="text" placeholder="Скорость видео">
    </div>

    <div class="cut-container">
      <input v-model="startTime" class="interval-select" type="text" placeholder="Время от">
      <input v-model="endTime" class="interval-select" type="text" placeholder="Время до">
      <input v-model="intervalSpeed" class="interval-select" type="text" placeholder="Скорость отрывка">
      <input v-model="times" class="interval-select" type="text" placeholder="Кол-во повторов">
      <button class="add-interval-button" @click="addTimeCode">Добавить промежуток</button>
    </div>

    <div class="intervals-wrapper">
      <div class="intervals" v-for="(interval, index) in intervals" :key="index">
        <div class="interval">{{interval.start}}</div>
        <div class="interval">{{interval.end}}</div>
        <div class="interval">{{interval.speed}}</div>
        <div class="play" @click="play(index)"><img src="../assets/icons8-play-button-48.png" alt="" width="32"></div>
        <img class="delete" @click="deleteImage" src="../assets/bascket.png" width="36px"/>
      </div>
    </div>

    <button class="cut-button" @click="cropVideo">Готово</button>
  </div>
</div>
</template>

<script>
import videoService from "@/services/VideoService.js";
import LoadingScreen from '@/components/LoadingScreen.vue';
import Utility from "@/services/Utility.js";
export default {
    components: {
    LoadingScreen
  },
  props: ['id'],
  data() {
    return {
      isLoading: false,
      intervals: [],
      speed: null,
      intervalSpeed: null,
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
      const speed = parseFloat(this.intervalSpeed);

      let invalidInterval = false;
      for (const interval of this.intervals) {
        if (interval.start <= end && interval.end >= start) {
          invalidInterval = true;
        }
      }

      if (invalidInterval) {
        return;
      }

      this.intervals.push({"start": start, "end": end, "speed": speed, "times": times});
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
      this.isLoading = true;
      videoService.editVideo(this.intervals, this.id, this.speed)
          .then((data) => {
            return Utility.checkTaskStatus(data.taskId);
          })
          .then(() => {
            this.$router.push({ name: "Files" })
          })
          .catch((error) => {
            console.error('Произошла ошибка при проверке статуса таски:', error);
          });
    },
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
  margin-top: 80px;
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

.add-interval-button, .cut-button {
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
  position: relative;
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

.delete {
  position: absolute;
  z-index: 999;
  left: 320px;
  top: -1px;
  color: #fe0000;
}

.cut-button {
  margin-top: 25px;
}

</style>