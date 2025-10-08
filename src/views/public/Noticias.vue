<template>
  <div class="container">
    <h1 class="text-center mb-4">Noticias de Software</h1>
    
    <div class="grid grid-2">
      <article class="card noticia-card" v-for="noticia in noticias" :key="noticia.id">
        <div class="noticia-header">
          <span class="badge badge-info">{{ noticia.categoria }}</span>
          <span class="noticia-fecha">{{ noticia.fecha }}</span>
        </div>
        <h3>{{ noticia.titulo }}</h3>
        <p>{{ noticia.resumen }}</p>
        <a href="#" class="btn btn-outline">Leer más</a>
      </article>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const noticias = ref([
  {
    id: 1,
    titulo: 'Vue 3.4 lanza nuevas características de rendimiento',
    resumen: 'La última versión de Vue.js trae mejoras significativas en el rendimiento y nuevas APIs para desarrolladores.',
    categoria: 'Frontend',
    fecha: '15 Ene 2025'
  },
  {
    id: 2,
    titulo: 'Tendencias en Inteligencia Artificial para 2025',
    resumen: 'Exploramos las principales tendencias de IA que dominarán el desarrollo de software este año.',
    categoria: 'IA',
    fecha: '12 Ene 2025'
  },
  {
    id: 3,
    titulo: 'Mejores prácticas en arquitectura de microservicios',
    resumen: 'Guía completa sobre cómo diseñar y mantener sistemas basados en microservicios.',
    categoria: 'Backend',
    fecha: '10 Ene 2025'
  },
  {
    id: 4,
    titulo: 'Seguridad en aplicaciones web modernas',
    resumen: 'Técnicas esenciales para proteger tus aplicaciones contra las amenazas más comunes.',
    categoria: 'Seguridad',
    fecha: '08 Ene 2025'
  },
  {
    id: 5,
    titulo: 'El futuro del desarrollo móvil multiplataforma',
    resumen: 'Comparativa de las principales herramientas para desarrollo móvil cross-platform.',
    categoria: 'Móvil',
    fecha: '05 Ene 2025'
  },
  {
    id: 6,
    titulo: 'DevOps: Automatización y eficiencia',
    resumen: 'Cómo implementar prácticas DevOps para mejorar el ciclo de desarrollo.',
    categoria: 'DevOps',
    fecha: '03 Ene 2025'
  }
])
</script>

<style scoped>
h1 {
  color: var(--primary-color);
}

.noticia-card {
  display: flex;
  flex-direction: column;
}

.noticia-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.noticia-fecha {
  font-size: 14px;
  color: var(--text-secondary);
}

.noticia-card h3 {
  margin-bottom: 12px;
  color: var(--text-primary);
}

.noticia-card p {
  flex: 1;
  color: var(--text-secondary);
  margin-bottom: 16px;
  line-height: 1.6;
}
</style>
