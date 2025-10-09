import api from "./axiosUtilizable";

export const authService = {
    async login(email, password) {

        return api.post("/api/public/login", {
            email: email,
            password: password
        }, 
        {
            headers: { "Content-Type": "application/json" },
        });
    },
    async currentUser() {
        return api.get("/api/public/usuario-logueado");
    },
};