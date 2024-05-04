import client from "@/api/axios-base.js";
import store from "@/store/index.js";

class FileService {

    findAll() {
        return client.get("/files/")
            .then(response => response.data)
    }
    async getFile(fileName) {
        return await fetch(`${store.getters.getServerUrl}/files/${fileName}`).then(r => r.blob())
    }

}

export default new FileService();
