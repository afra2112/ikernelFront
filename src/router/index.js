import { createRouter, createWebHistory } from "vue-router"
import Lineamientos from "@/views/public/Lineamientos.vue"
import PublicLayout from "../layouts/PublicLayout.vue"
import Inicio from "../views/public/Inicio.vue"
import Portafolio from "@/views/public/Portafolio.vue"
import Noticias from "@/views/public/Noticias.vue"
import PreguntasFrecuentes from "@/views/public/PreguntasFrecuentes.vue"
import LinksInteres from "@/views/public/LinksInteres.vue"
import Contacto from "@/views/public/Contacto.vue"
import Login from "@/views/auth/Login.vue"
import DashboardLayout from "@/layouts/DashboardLayout.vue"
import Dashboard from "@/views/dashboard/Dashboard.vue"
import Correo from "@/views/dashboard/Correo.vue"
import Biblioteca from "@/views/dashboard/Biblioteca.vue"
import Chat from "@/views/dashboard/Chat.vue"
import Tutoriales from "@/views/dashboard/Tutoriales.vue"
import { jwtDecode } from "jwt-decode"
import MisActividades from "@/views/desarrollador/MisActividades.vue"
import RegistrarErrores from "@/views/desarrollador/RegistrarErrores.vue"
import RegistrarInterrupciones from "@/views/desarrollador/RegistrarInterrupciones.vue"
import RegistrarDesarrollador from "@/views/coordinador/RegistrarDesarrollador.vue"
import Desarrolladores from "@/views/coordinador/Desarrolladores.vue"


const routes = [
    {
        path: "/",
        component: PublicLayout,
        children: [
            {path: "", name: "Inicio", component: Inicio},
            {path: "/lineamientos", name: "Lineamientos", component: Lineamientos},
            {path: "/portafolio", name: "Portafolio", component: Portafolio},
            {path: "/noticias", name: "Noticias", component: Noticias},
            {path: "/preguntas-frecuentes", name: "PreguntasFrecuentes", component: PreguntasFrecuentes},
            {path: "/links-interes", name: "LinksInteres", component: LinksInteres},
            {path: "/contacto", name: "Contacto", component: Contacto},
            {path: "/login", name: "Login", component: Login}
        ]
    },
    {
        path: "/dashboard",
        component : DashboardLayout,
        meta: { requiresAuth: true },
        children : [
            {path: "", component: Dashboard},
            {path: "correo", name: "Correo", component: Correo},
            {path: "biblioteca", name: "Biblioteca", component: Biblioteca},
            {path: "chat", name: "Chat", component: Chat},
            {path: "tutoriales", name: "Tutoriales", component: Tutoriales},
            {path: "mis-actividades", name: "MisActividades", component: MisActividades},
            {path: "registrar-errores", name: "RegistrarErrores", component: RegistrarErrores},
            {path: "registrar-interrupciones", name: "RegistrarInterrupciones", component: RegistrarInterrupciones},
            {path: "registrar-desarrollador", name: "RegistrarDesarrolladores", component: RegistrarDesarrollador},
            {path: "listar-desarrolladores", name: "Desarrolladores", component: Desarrolladores}
        ]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
    linkExactActiveClass: "active-exact",
})

router.beforeEach((to, from, next) => {
    const token = localStorage.getItem("token");
    
    const estaExpirado = (token) => {
        try {
            const {exp} = jwtDecode(token)
            return Date.now() >= exp * 1000
        } catch {
            return true
        }
    }

    if (to.meta.requiresAuth) {
        if (!token || estaExpirado(token)) {
            localStorage.removeItem("token")
            next("/login")
            return
        }
  }

  if (to.name === "Login" && token && !estaExpirado(token)) {
    next("/dashboard")
    return
  }

  next()
})

export default router