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
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router