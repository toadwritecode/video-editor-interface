import { createRouter, createWebHistory } from "vue-router";
import VideoPlayer from "@/components/VideoPlayer.vue";
import FileUploader from "@/components/FileUploader.vue";
import Files from "@/components/Files.vue";

const routes = [
    {
        path: "/video-player/:id",
        name: "Video Player",
        component: () => VideoPlayer,
        props: true
    },
    {
        path: "/file-upload",
        name: "File Upload",
        component: () => FileUploader,
    },
    {
        path: "/files",
        name: "Files",
        component: () => Files,
    }
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
});

export default router;
