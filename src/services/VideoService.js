import client from "@/api/axios-base.js";

class VideoService {

    cropVideo(intervals, filename) {

        const requestBody = {
            "frames": intervals.map(interval => {
                return {"cutFrom": interval.start, "cutTo": interval.end};
            })
        };

        const queryParameters = {"filename": filename};

        client.post("/video/crop/", requestBody, {"params": queryParameters});
    }

    transcribe(filename) {
        const queryParameters = {"filename": filename};

        return client.post("/video/transcribing-audio/", null, {"params": queryParameters})
            .then(response => response.data)
    }

    getResult(taskId) {
        const queryParameters = {"taskId": taskId};

        return client.get("/video/tasks/result/", {"params": queryParameters})
            .then(response => response.data);
    }

    exactAudio(fileName){
        const queryParameters = {"filename": fileName};
         return client.post("/video/exacting-audio/", null, {"params": queryParameters})
    .then(response => response.data);
    }

}

export default new VideoService();
