import client from "@/api/axios-base.js";

class FileService {

    findAll() {
        return client.get("/files/")
            .then(response => response.data)
    }

}

export default new FileService();
