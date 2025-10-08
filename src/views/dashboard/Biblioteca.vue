<template>
  <div>
    <h1>Biblioteca de Programas</h1>
    <p class="subtitle">Accede a los programas y herramientas de la empresa</p>

    <div class="grid grid-3 mt-4">
      <div v-for="programa in programas" :key="programa.id" class="card programa-card">
        <div class="programa-icon">{{ programa.icono }}</div>
        <h3>{{ programa.nombre }}</h3>
        <p>{{ programa.descripcion }}</p>
        <div class="programa-meta">
          <span class="badge badge-info">{{ programa.version }}</span>
          <span class="badge badge-success">{{ programa.categoria }}</span>
        </div>
        <button class="btn btn-primary mt-4" style="width: 100%">Descargar</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const programas = ref([
  {
    id: 1,
    nombre: 'IKernell IDE',
    descripcion: 'Entorno de desarrollo integrado personalizado',
    icono: '💻',
    version: 'v2.5.0',
    categoria: 'IDE'
  },
  {
    id: 2,
    nombre: 'Code Analyzer',
    descripcion: 'Herramienta de análisis de código',
    icono: '🔍',
    version: 'v1.8.2',
    categoria: 'Análisis'
  },
  {
    id: 3,
    nombre: 'Deploy Manager',
    descripcion: 'Gestor de despliegues automatizado',
    icono: '🚀',
    version: 'v3.1.0',
    categoria: 'DevOps'
  },
  {
    id: 4,
    nombre: 'Test Suite',
    descripcion: 'Suite completa de pruebas automatizadas',
    icono: '✓',
    version: 'v2.0.5',
    categoria: 'Testing'
  },
  {
    id: 5,
    nombre: 'API Designer',
    descripcion: 'Diseñador visual de APIs REST',
    icono: '🔌',
    version: 'v1.5.3',
    categoria: 'API'
  },
  {
    id: 6,
    nombre: 'DB Manager',
    descripcion: 'Administrador de bases de datos',
    icono: '🗄️',
    version: 'v4.2.1',
    categoria: 'Database'
  }
])
</script>

<style scoped>
.subtitle {
  color: var(--text-secondary);
  margin-top: 8px;
}

.programa-card {
  text-align: center;
  transition: transform 0.2s;
}

.programa-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}

.programa-icon {
  font-size: 64px;
  margin-bottom: 16px;
}

.programa-card h3 {
  color: var(--primary-color);
  margin-bottom: 8px;
}

.programa-card p {
  color: var(--text-secondary);
  font-size: 14px;
  margin-bottom: 16px;
  min-height: 40px;
}

.programa-meta {
  display: flex;
  gap: 8px;
  justify-content: center;
}
</style>