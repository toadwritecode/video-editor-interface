import {client} from "@/api/client.js";
import store from "@/store/index.js";

class FileService {

    findAll() {
        return client.get("/files/", {
            headers: {Authorization: `Bearer ${store.getters.getAccessToken}`}
        }).then(response => response.data);
    }

    generateFileId(filename) {
        return client.post("/files/generate-id", null, {
            headers: {
                Authorization: `Bearer ${store.getters.getAccessToken}`
            },
            params: {
                filename: filename
            }
        }).then(response => response.data);
    }

    getFile(uuid) {
        return client.get(`/files/${uuid}`, {
            responseType: 'blob'
        }).then(response => {
            const href = window.URL.createObjectURL(response.data);
            const anchorElement = document.createElement("a");

            anchorElement.setAttribute("href", href);
            anchorElement.setAttribute("download", uuid);

            document.body.appendChild(anchorElement);
            anchorElement.click();

            document.body.removeChild(anchorElement);
            window.URL.revokeObjectURL(href);
        });
    }

    deleteFile(id) {
        return client.delete(`/files/${id}`, {
            headers: {
                Authorization: `Bearer ${store.getters.getAccessToken}`
            }
        });
    }

}

export default new FileService();
