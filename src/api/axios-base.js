import axios from "axios";
import store from "../store";

export default axios.create({
    baseURL: store.getters.getServerUrl,
    headers: { contentType: "application/json" }
})
