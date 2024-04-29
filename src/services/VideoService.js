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

}

export default new VideoService();
