import videoService from "@/services/VideoService.js";

class Utility{
     checkTaskStatus(taskId) {
    return new Promise((resolve, reject) => {
        videoService.getResult(taskId)
            .then((response) => {
                if (response.status === 'processing') {
                    setTimeout(() => resolve(this.checkTaskStatus(taskId)), 1000);
                } else if (response.status === 'ok') {
                    resolve(response);
                } else {
                    reject(new Error('Unexpected task status'));
                }
            })
            .catch((error) => {
                reject(error);
            });
    });
}
}

export default new Utility();