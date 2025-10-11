import api from "./axiosUtilizable";

export const etapaService = {
  async crearEtapa(formData){
    return api.post("/api/proyectos/etapas/", formData);
  },
  async actualizarEtapa(formData){
    return api.put("/api/proyectos/etapas/actualizar", formData);
  },
  async eliminarEtapa(idEtapa){
    return api.delete(`/api/proyectos/etapas/eliminar/${idEtapa}`);
  },
}