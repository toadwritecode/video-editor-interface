import {client} from "@/api/client.js";
import store from "@/store/index.js";

class VideoService {

    cropVideo(intervals, filename) {

        client.post("/video/crop/", {
            frames: intervals.map(interval => {
                return {
                    cutFrom: interval.start,
                    cutTo: interval.end,
                    times: interval.times
                };
            })
        }, {
            headers: {
                Authorization: `Bearer ${store.getters.getAccessToken}`
            },
            params: {
                filename: filename
            }
        }).then(response => response.data);
    }

    transcribe(filename) {

        return client.post("/video/transcribing-audio/", null, {
            headers: {
                Authorization: `Bearer ${store.getters.getAccessToken}`
            },
            params: {
                filename: filename
            }
        }).then(response => response.data)
    }

    getResult(taskId) {

        return client.get("/video/tasks/result/", {
            headers: {
                Authorization: `Bearer ${store.getters.getAccessToken}`
            },
            params: {
                taskId: taskId
            }
        }).then(response => response.data);
    }

    extractAudio(filename){

        return client.post("/video/exacting-audio/", null, {
            headers: {
                Authorization: `Bearer ${store.getters.getAccessToken}`
            },
            params: {
                filename: filename
            }
        }).then(response => response.data);
    }

}

export default new VideoService();
