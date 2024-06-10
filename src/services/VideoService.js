import {client} from "@/api/client.js";
import store from "@/store/index.js";

class VideoService {

    editVideo(intervals, filename, videoSpeed) {

        return client.post("/video/crop/", {
            frames: intervals.map(interval => {
                return {
                    cutFrom: interval.start,
                    speed: interval.speed,
                    cutTo: interval.end,
                    times: interval.times
                };
            }),
            speed: videoSpeed
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
        console.log(taskId);
        return client.get(`/video/tasks/result/`, {
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
