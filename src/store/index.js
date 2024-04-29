import { createStore } from "vuex";

export default createStore({
    state: {
        apiUrl: "http://127.0.0.1:8000",
        files: {}
    },
    getters: {
        getServerUrl: (state) => {
            return state.apiUrl;
        },
        getFiles: (state) => {
            return state.files;
        }
    },
    mutations: {
        addFile(state, data) {
            state.files[data.index] = data.file;
        }
    }
});
