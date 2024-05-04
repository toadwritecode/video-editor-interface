<script>
  import fileService from "@/services/FileService.js";
  import videoService from "@/services/VideoService.js";
  export default {
    data() {
      return {
        videos: {},
      };
    },

    created() {
      fileService.findAll().then(response => this.videos = response);
    },
    methods: {
      async downloadFile(fileName) {
        let videoUrl = '';
        let blob = fileService.getFile(fileName);

        videoUrl = window.URL.createObjectURL(await blob);

        const link = document.createElement('a');
        link.href = videoUrl;
        link.setAttribute('download', fileName);

        link.click();
        window.URL.revokeObjectURL(videoUrl);
      },
      transcribeVideo(filename) {
      videoService.transcribe(filename).then(transcribeResponse => {
        const interval = setInterval(() => {
          console.log("Таска запущена")
          videoService.getResult(transcribeResponse.taskId)
              .then(response => {
                if (response.status === "ok") {
                  alert(response.result.text)
                  clearInterval(interval);
                }
              });
        }, 10000)});
    },
       downloadAudio(filename) {
      videoService.exactAudio(filename).then(taskResponse => {
        const interval = setInterval(() => {
          console.log("Таска запущена")
          videoService.getResult(taskResponse.taskId)
              .then(response => {
                if (response.status === "ok") {
                  this.downloadFile(response.result)
                  clearInterval(interval);
                }
              });
        }, 10000)});
    }
  }}

</script>

<template>
<!--  <p>Ваши видео</p>-->
  <div class="container">
    <div class="card" v-for="(video, index) in videos" :key="index">
      <img src="../assets/video-temp.png" alt="">
      <img @click="this.$router.push({name: 'Video Player', params: {id: video.name}})" class = "pencil" src="../assets/icons8-pencil.svg" width="22px">
      <img @click="downloadFile(video.name)" src="../assets/icons8-upload.png" class = "download" width="22px">
      <img @click="downloadAudio(video.name)" src="../assets/icons8-audio-file-64.png" class = "audio"  width="22px">
      <img @click="transcribeVideo(video.name)" class = "transcriber" src="../assets/transcriber.png" width="22px" alt="">
      <p>{{video.name}}</p>
    </div>
  </div>
</template>

<style scoped>
  .container {
    width: 95%;
    margin: 0 auto;
    display: flex;
    padding: 25px;
    background: #f4f3f9;
  }

  .card {
    position: relative;
    margin-right: 25px;
  }

  .card p {
    overflow-wrap: break-word;
    max-width: 130px;
  }

  .pencil {
    position: absolute;

  }
  .download {
    position: absolute;
    top: 40px
  }
  .audio {
    position: absolute;
    top: 100px
  }
</style>