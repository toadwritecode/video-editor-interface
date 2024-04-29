import client from "@/api/axios-base.js";

class FileUploader {

    upload(videos) {
        let response;
        videos.forEach(video => {
            let formData = new FormData();
            formData.append("file", video.source);
            response = client.post("/upload/", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
        });

        return response;
    }

    uploadFromUrl(url) {
        const queryParameters = {"link": url};
        return client.get("/files/youtube/", {"params": queryParameters})
    }

}

export default new FileUploader();
