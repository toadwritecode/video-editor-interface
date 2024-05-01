import client from "@/api/axios-base.js";

class FileService {

    findAll() {
        return client.get("/files/")
            .then(response => response.data)
    }
    getFile(fileName) {
        return client.get(`/files/${fileName}`)
      .then(response => response.data)
    }

}

export default new FileService();
