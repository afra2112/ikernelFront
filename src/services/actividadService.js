import api from "./axiosUtilizable";

export const actividadService = {
    async obtenerActivades(){
        return api.get("/api/actividades/");
    }
}