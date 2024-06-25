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
        showDiffModal: false,
        currentVideoInModal: "",
        showModal: false,
        videos: [],
        selected: []
      };
    },

    async created() {
      const files = await fileService.findAll();
      for (const file of files) {
        const fileId = await fileService.generateFileId(file['name']);
        console.log(file)
        this.videos.push(
            {
              id: fileId,
              name: file['name'],
              path: file['path'],
              format: file['format'],
              text: file['text']
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
      },
      async deleteFile(id) {
        await fileService.deleteFile(id);
        this.$router.push({ name: 'Files' });
      },
      compareFiles() {
        setTimeout(() => this.showDiffModal = true, 3000)
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
          <input class="checkbox" type="checkbox" v-model="selected" :value="video.name" />
          <img @click="this.$router.push({name: 'Audio Player', params: {id: video.id, text: video.text}})"
               class="audio-img" src="../assets/wav-file.png" height="100" alt="Значок файла формата .wav">
          <audio :src="`http://localhost:8000/files/${video.id}`" :id="'audio_' + index"></audio>
          <div class="video-card-control audio-control">
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
            <img
                @click="deleteFile(video.id)"
                src="../assets/del-file.png"
                alt="Значок для удаления файла"
                width="22px">
          </div>
        </div>

        <!-- Если это видео файл формата .mp4 -->
        <div class="video-card" v-if="video.format === 'mp4'">
          <video :src="`http://localhost:8000/files/${video.id}`" width="200" height="160"></video>

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
                alt="Значок для скачивания файла"
                width="22px">

            <img
                @click="extractAudio(video.id)"
                src="../assets/extract_audio.png"
                alt="Значок для извлечения аудио из видео"
                width="22px">

            <img
              @click="deleteFile(video.id)"
              src="../assets/del-file.png"
              alt="Значок для удаления файла"
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

  <a v-if="selected.length > 1 && selected.length < 3"
          class="btn"
          type="button"
          @click="compareFiles()">Сравнить аудио</a>

  <modal v-show="showModal" @close="showModal = false">
    <template v-slot:header>
      <div></div>
    </template>
    <template v-slot:body>
      <video :src="currentVideoInModal" controls width="500" height="500"></video>
    </template>
  </modal>

  <modal v-show="showDiffModal" @close="showDiffModal = false">
    <template v-slot:header>
      <div></div>
    </template>
    <template v-slot:body>
      <div class="change">
        <p class="change-text">Ваша схожесть с оригиналом 38%</p>
        <a class="change-btn"
           type="button"
           @click="this.$router.push({name: 'Chart'})">Детали</a>
      </div>
    </template>
  </modal>
</template>

<style scoped>
  .container {
    width: 95%;
    margin: 60px auto;
    display: flex;
    flex-wrap: wrap;
    padding: 25px;
    background: #f4f3f9;
  }

  .checkbox {
    position: absolute;
    left: 135px;
    top: 25px;
  }

  .card {
    position: relative;
    margin-right: 50px;
    margin-top: 20px;
  }

  .card p {
    overflow-wrap: break-word;
    max-width: 130px;
  }

  .video-card {
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  .video-card-control {
    margin-top: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align: center;
  }

  .name {
    margin-top: 10px;
  }

  .unauthorized {
    margin-top: 50px;
    text-align: center;
  }

  .audio-img {
    margin-top: 35px;
  }

  .audio-control {
    margin-top: 35px;
  }

  .btn {
    position: absolute;
    right: 50%;
    outline: 0;
    border: 0;
    color: #fff;
    border-radius: 4px;
    font-weight: 400;
    padding: 8px 13px;
    background: #fe0000;
  }

  .change {
    display: flex;
    flex-direction: column;
  }

  .change-text {
    text-align: center;
  }

  .change-btn {
    margin: 25px auto;
    outline: 0;
    border: 0;
    color: #fff;
    border-radius: 4px;
    font-weight: 400;
    padding: 8px 13px;
    background: #fe0000;
  }
</style>