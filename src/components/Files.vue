<script>
  import fileService from "@/services/FileService.js";
  import videoService from "@/services/VideoService.js";
  import modal from "@/components/Modal.vue";
  import store from "@/store/index.js";
  import Signup from "@/components/SignUp.vue";
  export default {
    computed: {
      store() {
        return store
      }
    },
    components: {Signup, modal},
    data() {
      return {
        currentVideoInModal: "",
        showModal: false,
        videos: [],
      };
    },

    async created() {
      const files = await fileService.findAll();
      for (const file of files) {
        const fileId = await fileService.generateFileId(file['name']);
        this.videos.push(
            {
              id: fileId,
              name: file['name'],
              path: file['path'],
              format: file['format']
            }
        );
      }
    },

    methods: {
      async downloadFile(fileName) {
        fileService.getFile(fileName);
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
      extractAudio(filename) {
        videoService.extractAudio(filename).then(taskResponse => {
          const interval = setInterval(() => {
            videoService.getResult(taskResponse.taskId)
                .then(response => {
                  if (response.status === "ok") {
                    this.downloadFile(response.result)
                    clearInterval(interval);
                  }
                });
        }, 10000)});
      },
      playAudio(index) {
        const ref = "audio_" + index;
        let audio = document.getElementById(ref);

        if (!audio.paused) {
          audio.pause();
          return;
        }

        audio.play();
      },
      playVideoInModal(name) {
        this.currentVideoInModal = "http://localhost:8000/files/" + name;
        this.showModal = true;
      }
  }}

</script>

<template>
  <div v-if="store.getters.isAuthenticated" class="container">
    <div class="card" v-for="(video, index) in videos" :key="index">

      <!-- Поддерживаются форматы .mp4 и .wav -->
      <div v-if="['mp4', 'wav'].includes(video.format)">

        <!-- Если это аудио файл формата .wav -->
        <div class="video-card" v-if="video.format === 'wav'">
          <img src="../assets/wav-file.png" alt="Значок файла формата .wav">
          <audio :src="`http://localhost:8000/files/${video.id}`" :id="'audio_' + index"></audio>
          <div class="video-card-control">
            <img
              @click="playAudio(index)"
              src="../assets/play.png"
              width="22px"/>
            <img
                @click="downloadFile(video.id)"
                src="../assets/download.png"
                alt="Значок для скачивания файла"
                width="22px">
            <img
                @click="transcribeVideo(video.id)"
                src="../assets/speech.png"
                width="22px"
                alt="">
          </div>
        </div>

        <!-- Если это видео файл формата .mp4 -->
        <div class="video-card" v-if="video.format === 'mp4'">
          <video :src="`http://localhost:8000/files/${video.id}`" controls width="130" height="100"></video>

          <div class="video-card-control">
            <img
                @click="playVideoInModal(video.id)"
                src="../assets/play.png"
                width="22px">
            <img
                @click="this.$router.push({name: 'Video Player', params: {id: video.id}})"
                class = "pencil"
                src="../assets/pencil.png"
                alt="Значок для редактирования видео"
                width="24px">

            <img
                @click="downloadFile(video.id)"
                src="../assets/download.png"
                class = "download"
                alt="Значок для скачивания файла"
                width="22px">

            <img
                @click="extractAudio(video.id)"
                src="../assets/extract_audio.png"
                class = "audio"
                alt="Значок для извлечения аудио из видео"
                width="22px">
          </div>
        </div>

        <p class="name">{{video.name}}</p>

      </div>
    </div>
  </div>

  <div v-else class="unauthorized">
    <Signup></Signup>
  </div>

  <modal v-show="showModal" @close="showModal = false">
    <template v-slot:header>
      <div></div>
    </template>
    <template v-slot:body>
      <video :src="currentVideoInModal" controls width="500" height="500"></video>
    </template>
  </modal>
</template>

<style scoped>
  .container {
    width: 95%;
    margin: 60px auto;
    display: flex;
    padding: 25px;
    background: #f4f3f9;
  }

  .card {
    position: relative;
    margin-right: 50px;
  }

  .card p {
    overflow-wrap: break-word;
    max-width: 130px;
  }


  .video-card {
    display: flex;
  }

  .video-card-control {
    margin-left: 7px;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
  }

  .name {
    margin-top: 10px;
  }

  .unauthorized {
    margin-top: 50px;
    text-align: center;
  }
</style>