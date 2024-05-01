import { createStore } from "vuex";

export default createStore({
    state: {
        apiUrl: "http://127.0.0.1:8000",
        files: {}
    },
    getters: {
        getServerUrl: (state) => {
            return state.apiUrl;
        }
    }
});
