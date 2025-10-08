import api from "./axiosUtilizable";

export const authService = {
    async login(username, password) {
        const params = new URLSearchParams({username, password});
        return api.post("/api/public/login", params, {
            headers: {"Content-Type": "application/x-www-form-urlencoded"},
        });
    },
    async logout() {
        return api.post("/logout");
    },
    async currentUser() {
        return api.get("/api/usuarios/usuario-logueado");
    }
};