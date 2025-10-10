<template>
  <div>
    <div class="flex-between mb-4">
      <div>
        <h1>Reporte de Interrupciones</h1>
        <p class="subtitle">{{ proyecto?.nombre }}</p>
      </div>
      <div class="flex gap-2">
        <button @click="exportarReporte" class="btn btn-success">📊 Exportar</button>
        <router-link to="/dashboard/proyectos" class="btn btn-outline">← Volver</router-link>
      </div>
    </div>

    <div class="grid grid-3 mb-4">
      <div class="card stat-card">
        <div class="stat-icon">⚠️</div>
        <div class="stat-content">
          <h3>{{ interrupciones.length }}</h3>
          <p>Total Interrupciones</p>
        </div>
      </div>

      <div class="card stat-card">
        <div class="stat-icon">⏱️</div>
        <div class="stat-content">
          <h3>{{ tiempoTotalHoras }}h</h3>
          <p>Tiempo Total Perdido</p>
        </div>
      </div>

      <div class="card stat-card">
        <div class="stat-icon">📊</div>
        <div class="stat-content">
          <h3>{{ tiempoPromedioHoras }}h</h3>
          <p>Promedio por Interrupción</p>
        </div>
      </div>
    </div>

    <div class="card">
      <h2>Interrupciones Registradas</h2>
      <table class="table">
        <thead>
          <tr>
            <th>Tipo</th>
            <th>Fase</th>
            <th>Fecha</th>
            <th>Duración (horas)</th>
            <th>Desarrollador</th>
            <th>Descripción</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="interrupcion in interrupciones" :key="interrupcion.id">
            <td>
              <span :class="['badge', getTipoBadge(interrupcion.tipo)]">
                {{ interrupcion.tipo }}
              </span>
            </td>
            <td>{{ interrupcion.fase }}</td>
            <td>{{ formatearFecha(interrupcion.fecha) }}</td>
            <td>{{ interrupcion.duracion }}</td>
            <td>{{ getDesarrolladorNombre(interrupcion.desarrolladorId) }}</td>
            <td>{{ interrupcion.descripcion }}</td>
          </tr>
        </tbody>
      </table>

      <div v-if="interrupciones.length === 0" class="text-center" style="padding: 40px;">
        <p style="color: var(--text-secondary)">No hay interrupciones registradas</p>
      </div>
    </div>

    <div class="card mt-4">
      <h2>Interrupciones por Tipo</h2>
      <div class="grid grid-3">
        <div v-for="(count, tipo) in interrupcionesPorTipo" :key="tipo" class="tipo-card">
          <h3>{{ count }}</h3>
          <p>{{ tipo }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { storageService } from '../../services/storageService'

const route = useRoute()
const proyecto = ref(null)
const interrupciones = ref([])
const desarrolladores = ref([])

const tiempoTotalHoras = computed(() => {
  return interrupciones.value.reduce((total, i) => total + (parseFloat(i.duracion) || 0), 0)
})

const tiempoPromedioHoras = computed(() => {
  if (interrupciones.value.length === 0) return 0
  return (tiempoTotalHoras.value / interrupciones.value.length).toFixed(1)
})

const interrupcionesPorTipo = computed(() => {
  const tipos = {}
  interrupciones.value.forEach(i => {
    tipos[i.tipo] = (tipos[i.tipo] || 0) + 1
  })
  return tipos
})

const getTipoBadge = (tipo) => {
  const badges = {
    'Técnica': 'badge-danger',
    'Reunión': 'badge-warning',
    'Soporte': 'badge-info',
    'Otra': 'badge-secondary'
  }
  return badges[tipo] || 'badge-info'
}

const getDesarrolladorNombre = (id) => {
  const dev = desarrolladores.value.find(d => d.id === id)
  return dev ? `${dev.nombre} ${dev.apellido}` : 'N/A'
}

const formatearFecha = (fecha) => {
  if (!fecha) return 'N/A'
  return new Date(fecha).toLocaleDateString('es')
}

const exportarReporte = () => {
  const contenido = `Reporte de Interrupciones - ${proyecto.value.nombre}\n\n` +
    `Total Interrupciones: ${interrupciones.value.length}\n` +
    `Tiempo Total: ${tiempoTotalHoras.value} horas\n` +
    `Promedio: ${tiempoPromedioHoras.value} horas\n\n` +
    interrupciones.value.map(i => 
      `${i.tipo} | ${i.fase} | ${formatearFecha(i.fecha)} | ${i.duracion}h | ${getDesarrolladorNombre(i.desarrolladorId)}`
    ).join('\n')
  
  const blob = new Blob([contenido], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `reporte-interrupciones-${proyecto.value.nombre}.txt`
  a.click()
}

onMounted(() => {
  const id = route.params.id
  proyecto.value = storageService.getProyectoById(id)
  interrupciones.value = storageService.getInterrupcionesByProyecto(parseInt(id))
  desarrolladores.value = storageService.getDesarrolladores()
})
</script>

<style scoped>
.subtitle {
  color: var(--text-secondary);
  margin-top: 8px;
}

.stat-card {
  display: flex;
  align-items: center;
  gap: 16px;
}

.stat-icon {
  font-size: 48px;
}

.stat-content h3 {
  font-size: 32px;
  color: var(--primary-color);
  margin-bottom: 4px;
}

.stat-content p {
  color: var(--text-secondary);
  font-size: 14px;
}

.tipo-card {
  text-align: center;
  padding: 20px;
  background: var(--background);
  border-radius: 8px;
}

.tipo-card h3 {
  font-size: 32px;
  color: var(--primary-color);
  margin-bottom: 8px;
}

.tipo-card p {
  color: var(--text-secondary);
}
</style>
