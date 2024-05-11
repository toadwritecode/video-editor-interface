import {client} from "@/api/client.js";

class AuthenticationService {

    signUp(credentials) {
        return client.post("/authenticate/signup", {
            username: credentials.username,
            password: credentials.password
        })
    }

}

export default new AuthenticationService();
