import HttpService from "./HttpService";

class AuthService extends HttpService {
    constructor() {
        super();
        this.login = this.login.bind(this);
    }

    login = async (credentials) => {
        const { data } = await this.client.post("/login", credentials);
        return data;
    }

    register = async (userData) => {
        console.log("User inside service", userData)
        const { data } = await this.client.post("/register", userData);
        return data;
    };

    getMyProfile = async () => {
        const { data } = await this.client.get("/profile");
        return data;
    };

    logout = async () => {
        await this.client.post("/logout");
    };
}

const authService = new AuthService();

export default authService;