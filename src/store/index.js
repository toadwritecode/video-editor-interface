import { createStore } from "vuex";
import {client} from "@/api/client.js";

export default createStore({
    state: {
        apiUrl: "http://127.0.0.1:8000",
        accessToken: localStorage.getItem("access_token") || null,
        refreshToken: localStorage.getItem("refresh_token") || null,
        files: {}
    },
    mutations: {
        updateAccess(state, access) {
            state.accessToken = access;
        },
        updateLocalStorage(state, { access, refresh }) {
            localStorage.setItem("access_token", access);
            localStorage.setItem("refresh_token", refresh);
            state.accessToken = access;
            state.refreshToken = refresh;
        },
    },
    getters: {
        isAuthenticated(state) {
            return state.accessToken !== null;
        },
        getServerUrl: (state) => {
            return state.apiUrl;
        },
        getAccessToken: (state) => {
            return state.accessToken;
        }
    },
    actions: {
        refreshToken(context) {
            return new Promise((resolve, reject) => {
                client
                    .post("/authenticate/token/refresh/", {
                        refresh: context.state.refreshToken,
                    })
                    .then((response) => {
                        context.commit("updateAccess", response.data.access);
                        resolve(response.data.access);
                    })
                    .catch((err) => {
                        console.log("error in refreshToken Task");
                        reject(err);
                    });
            });
        },
        loginUser(context, credentials) {
            return new Promise((resolve, reject) => {
                client
                    .post("/authenticate/token/", {
                        username: credentials.username,
                        password: credentials.password,
                    })
                    .then((response) => {
                        context.commit("updateLocalStorage", {
                            access: response.data.accessToken,
                            refresh: response.data.refreshToken,
                        });
                        resolve();
                    })
                    .catch((err) => {
                        reject(err);
                    });
            });
        },
        logoutUser(context) {
            if (context.getters.isAuthenticated) {
                localStorage.removeItem("access_token");
                localStorage.removeItem("refresh_token");
                // return new Promise((resolve, reject) => {
                //     client()
                //         .post("/api/token/logout/")
                //         .then((response) => {
                //             localStorage.removeItem("access_token");
                //             localStorage.removeItem("refresh_token");
                //             context.commit("destroyToken");
                //         })
                //         .catch((err) => {
                //             localStorage.removeItem("access_token");
                //             localStorage.removeItem("refresh_token");
                //             context.commit("destroyToken");
                //             resolve(err);
                //         });
                // });
            }
        },
    }
});
