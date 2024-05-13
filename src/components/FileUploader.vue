<script>
  import fileUploader from "@/services/FileUploader.js";
  import store from "@/store/index.js";
  import Signup from "@/components/SignUp.vue";

  export default {
    components: {Signup},
    computed: {
      store() {
        return store
      }
    },
    data(){
      return {
        videos: [],
        videoUrl: "",
        isDragging: false
      }
    },
    methods: {
      selectFiles() {
        this.$refs.fileInput.click();
      },

      onFileSelect(event) {
        this.addFilesToQueue(event.target.files)
      },

      onDragOver(event) {
        event.preventDefault();
        this.isDragging = true;
        event.dataTransfer.dropEffect = 'copy';
      },

      onDragLeave(event) {
        event.preventDefault();
        this.isDragging = false;
      },

      onDrop(event) {
        event.preventDefault();
        this.isDragging = false;
        this.addFilesToQueue(event.target.files);
      },

      addFilesToQueue(files) {
        if (files.length === 0) return;
        for (let i = 0; i < files.length; i++) {
          if (!this.videos.some((video) => video.name === files[i].name)) {
            this.videos.push({name: files[i].name, url: URL.createObjectURL(files[i]), source: files[i] });
          }
        }
      },

      deleteImage(index) {
        this.videos.splice(index, 1);
      },

      sendFiles() {
        if (this.videoUrl.length > 0) {
          fileUploader.uploadFromUrl(this.videoUrl)
              .then(() => this.$router.push({name: "Files"}))
        } else {
          fileUploader.upload(this.videos)
              .then(() => this.$router.push({name: "Files"}))
        }
      }
    }
  }
</script>

<template>
  <div v-if="store.getters.isAuthenticated" class="card">
    <div class="drag-area" @dragover.prevent="onDragOver" @dragleave.prevent="onDragLeave" @drop.prevent="onDrop">
      <span v-if="!isDragging">
        Перетащите видео сюда или
        <span class="select" role="button" @click="selectFiles">
          Выберите файл
        </span>
      </span>
      <div v-else class="select">Положите изображение тут</div>
      <input name="file" type="file" class="file" ref="fileInput" multiple @change="onFileSelect"/>
    </div>
    <div class="container">
      <div class="image" v-for="(video, index) in videos" :key="index">
        <span class="delete" @click="deleteImage">&times;</span>
        <video poster="../assets/video-temp.png" alt=""/>
        <p>{{video.name}}</p>
      </div>
    </div>
    <div v-if="this.videos.length === 0" class="top">
      <p>Или загрузите видео с YouTube</p>
    </div>
    <div class="video-download-container">
      <input v-if="this.videos.length === 0" v-model="videoUrl" class="video-url" type="text" placeholder="Вставьте ссылку на видео">
      <button class="btn" type="button" @click="sendFiles">Загрузить</button>
    </div>
  </div>
  <div v-else class="unauthorized">
    <Signup></Signup>
  </div>
</template>

<style scoped>
  .card {
    min-height: 400px;
    width: 95%;
    margin: 50px auto 0;
    padding: 10px;
    box-shadow: 0 0 5px #ffdfdf;
    border-radius: 5px;
    overflow: hidden;
  }

  .card .top {
    text-align: center;
  }

  .card p {
    font-weight: bold;
    color: #fe0000;
  }

  .card button {
    outline: 0;
    border: 0;
    color: #fff;
    border-radius: 4px;
    font-weight: 400;
    padding: 8px 13px;
    background: #fe0000;
  }

  .card .drag-area {
    height: 150px;
    border-radius: 5px;
    border: 2px dashed #fe0000;
    background: #f4f3f9;
    color: #fe0000;
    display: flex;
    justify-content: center;
    align-items: center;
    user-select: none;
    -webkit-user-select: none;
    margin-top: 10px;
  }

  .card .drag-area .visible {
    font-size: 18px;
  }

  .card .select {
    color: #5256ad;
    margin-left: 5px;
    cursor: pointer;
    transition: 0.4s;
  }

  .card .select:hover {
    opacity: 0.6;
  }

  .card .container {
    width: 100%;
    height: auto;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-wrap: wrap;
    max-height: 200px;
    position: relative;
    margin-bottom: 8px;
  }

  .card .container .image {
    width: 150px;
    height: 75px;
    margin-top: 20px;
    position: relative;
    overflow-wrap: break-word;
    text-align: center;
  }

  .card .container .image video {
    width: 100%;
    height: 100%;
    border-radius: 5px;
  }

  .card .container .image span {
    position: absolute;
    top: -4px;
    right: 30px;
    font-size: 20px;
    cursor: pointer;
  }

  .card .file,
  .card .drag-area .on-drop,
  .card .drag-area.dragover .visible{
    display: none;
  }

  .delete {
    z-index: 999;
    color: #fe0000;
  }

  .video-download-container {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    margin: 25px 0;
  }

  .video-download-container .video-url {
    background-color: #f4f3f9;
    border: 2px dashed #fe0000;
    color: #fe0000;
    padding: 5px;
    text-align: center;
  }

  .video-download-container input[type="text"]:focus {
    border: 2px solid #fe0000;
    outline: 0;
  }

  .video-download-container input[type="text"]:focus::placeholder {
    color: transparent;
  }

  .video-download-container ::placeholder {
    color: #fe0000;
  }

  .image p {
    max-width: 130px;
  }

  .btn {
    margin-left: 15px;
  }

  .container {
    min-height: 120px;
  }

  .unauthorized {
    margin-top: 50px;
    text-align: center;
  }

</style>