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
        children : [
            {path: "", component: Dashboard},
            {path: "/correo", name: "Correo", component: Correo},
            {path: "/biblioteca", name: "Biblioteca", component: Biblioteca},
            {path: "/chat", name: "Chat", component: Chat},
            {path: "/tutoriales", name: "Tutoriales", component: Tutoriales}
        ]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router