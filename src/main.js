import { createApp } from 'vue'
import App from './App.vue'
import store from "@/store/index.js";
import router from "@/router/router.js";
import VueSimpleAlert from "vue3-simple-alert";
import 'sweetalert2/dist/sweetalert2.min.css';

let app = createApp(App);

app.use(store).use(router).use(VueSimpleAlert).mount('#app');

app.config.globalProperties.$vueAlert = VueSimpleAlert;