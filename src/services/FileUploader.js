import {client} from "@/api/client.js";
import store from "@/store/index.js";

class FileUploader {

    upload(videos) {
        let response;
        videos.forEach(video => {
            let formData = new FormData();
            formData.append("file", video.source);

            response = client.post("/files/", formData, {
                headers: {
                    Authorization: `Bearer ${store.getters.getAccessToken}`,
                    "Content-Type": "multipart/form-data"
                }
            }).then(response => response.data)
        });

        return response;
    }

    uploadFromUrl(url) {
        return client.get("/files/youtube/", {
            headers: {
                Authorization: `Bearer ${store.getters.getAccessToken}`
            },
            params: {
                link: url
            }
        }).then(response => response.data);
    }

}

export default new FileUploader();
