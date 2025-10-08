<template>
  <div>
    <h1>Tutoriales de Programación</h1>
    <p class="subtitle">Aprende y mejora tus habilidades</p>

    <div class="grid grid-2 mt-4">
      <div v-for="tutorial in tutoriales" :key="tutorial.id" class="card tutorial-card">
        <div class="tutorial-header">
          <span class="badge" :class="`badge-${tutorial.nivel}`">{{ tutorial.nivel }}</span>
          <span class="tutorial-duracion">⏱️ {{ tutorial.duracion }}</span>
        </div>
        <h3>{{ tutorial.titulo }}</h3>
        <p>{{ tutorial.descripcion }}</p>
        <div class="tutorial-tags">
          <span v-for="tag in tutorial.tags" :key="tag" class="tag">{{ tag }}</span>
        </div>
        <div class="tutorial-footer">
          <div class="tutorial-progress">
            <div class="progress-bar">
              <div class="progress-fill" :style="{ width: tutorial.progreso + '%' }"></div>
            </div>
            <span class="progress-text">{{ tutorial.progreso }}% completado</span>
          </div>
          <button class="btn btn-primary">
            {{ tutorial.progreso > 0 ? 'Continuar' : 'Comenzar' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const tutoriales = ref([
  {
    id: 1,
    titulo: 'Introducción a Vue 3',
    descripcion: 'Aprende los fundamentos de Vue 3 y Composition API',
    nivel: 'info',
    duracion: '2h 30min',
    progreso: 65,
    tags: ['Vue', 'JavaScript', 'Frontend']
  },
  {
    id: 2,
    titulo: 'Node.js Avanzado',
    descripcion: 'Técnicas avanzadas de desarrollo backend con Node.js',
    nivel: 'warning',
    duracion: '4h 15min',
    progreso: 30,
    tags: ['Node.js', 'Backend', 'API']
  },
  {
    id: 3,
    titulo: 'Arquitectura de Microservicios',
    descripcion: 'Diseña y construye sistemas escalables con microservicios',
    nivel: 'danger',
    duracion: '6h 00min',
    progreso: 0,
    tags: ['Arquitectura', 'Microservicios', 'Cloud']
  },
  {
    id: 4,
    titulo: 'Testing con Jest',
    descripcion: 'Aprende a escribir pruebas efectivas para tus aplicaciones',
    nivel: 'info',
    duracion: '3h 20min',
    progreso: 100,
    tags: ['Testing', 'Jest', 'TDD']
  },
  {
    id: 5,
    titulo: 'Docker y Kubernetes',
    descripcion: 'Containerización y orquestación de aplicaciones',
    nivel: 'warning',
    duracion: '5h 45min',
    progreso: 45,
    tags: ['Docker', 'Kubernetes', 'DevOps']
  },
  {
    id: 6,
    titulo: 'Seguridad en Aplicaciones Web',
    descripcion: 'Protege tus aplicaciones contra vulnerabilidades comunes',
    nivel: 'danger',
    duracion: '4h 30min',
    progreso: 0,
    tags: ['Seguridad', 'OWASP', 'Web']
  }
])
</script>

<style scoped>
.subtitle {
  color: var(--text-secondary);
  margin-top: 8px;
}

.tutorial-card {
  display: flex;
  flex-direction: column;
}

.tutorial-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.tutorial-duracion {
  font-size: 14px;
  color: var(--text-secondary);
}

.tutorial-card h3 {
  color: var(--primary-color);
  margin-bottom: 8px;
}

.tutorial-card p {
  color: var(--text-secondary);
  margin-bottom: 16px;
  flex: 1;
}

.tutorial-tags {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 16px;
}

.tag {
  padding: 4px 12px;
  background: var(--background);
  border-radius: 12px;
  font-size: 12px;
  color: var(--text-secondary);
}

.tutorial-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  padding-top: 16px;
  border-top: 1px solid var(--border-color);
}

.tutorial-progress {
  flex: 1;
}

.progress-bar {
  height: 8px;
  background: var(--background);
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 4px;
}

.progress-fill {
  height: 100%;
  background: var(--primary-color);
  transition: width 0.3s;
}

.progress-text {
  font-size: 12px;
  color: var(--text-secondary);
}
</style>
