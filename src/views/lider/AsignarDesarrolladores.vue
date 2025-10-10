<template>
  <div>
    <div class="flex-between mb-4">
      <div>
        <h1>Asignar Desarrolladores</h1>
        <p class="subtitle">{{ proyecto?.nombre }}</p>
      </div>
      <router-link to="/dashboard/proyectos" class="btn btn-outline">
        ← Volver
      </router-link>
    </div>

    <div class="grid grid-2">
      <div class="card">
        <h2>Desarrolladores Disponibles</h2>
        <div class="desarrolladores-list">
          <div v-for="dev in desarrolladoresDisponibles" :key="dev.id" class="dev-item">
            <div class="dev-info">
              <strong>{{ dev.nombre }} {{ dev.apellido }}</strong>
              <span class="badge badge-info">{{ dev.especialidad }}</span>
            </div>
            <button @click="asignarDesarrollador(dev)" class="btn btn-primary btn-sm">
              ➕ Asignar
            </button>
          </div>
        </div>
        <div v-if="desarrolladoresDisponibles.length === 0" class="text-center" style="padding: 40px;">
          <p style="color: var(--text-secondary)">No hay desarrolladores disponibles</p>
        </div>
      </div>

      <div class="card">
        <h2>Desarrolladores Asignados</h2>
        <div class="desarrolladores-list">
          <div v-for="dev in desarrolladoresAsignados" :key="dev.id" class="dev-item">
            <div class="dev-info">
              <strong>{{ dev.nombre }} {{ dev.apellido }}</strong>
              <span class="badge badge-success">{{ dev.especialidad }}</span>
            </div>
            <button @click="removerDesarrollador(dev)" class="btn btn-danger btn-sm">
              ✕ Remover
            </button>
          </div>
        </div>
        <div v-if="desarrolladoresAsignados.length === 0" class="text-center" style="padding: 40px;">
          <p style="color: var(--text-secondary)">No hay desarrolladores asignados</p>
        </div>
      </div>
    </div>

    <div v-if="mensaje" :class="['alert', 'alert-success', 'mt-4']">
      {{ mensaje }}
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { storageService } from '../../services/storageService'

const route = useRoute()
const proyecto = ref(null)
const desarrolladores = ref([])
const mensaje = ref('')

const desarrolladoresAsignados = computed(() => {
  if (!proyecto.value || !proyecto.value.desarrolladores) return []
  return desarrolladores.value.filter(d => 
    proyecto.value.desarrolladores.includes(d.id)
  )
})

const desarrolladoresDisponibles = computed(() => {
  if (!proyecto.value || !proyecto.value.desarrolladores) return desarrolladores.value
  return desarrolladores.value.filter(d => 
    !proyecto.value.desarrolladores.includes(d.id) && d.activo
  )
})

const asignarDesarrollador = (dev) => {
  if (!proyecto.value.desarrolladores) {
    proyecto.value.desarrolladores = []
  }
  proyecto.value.desarrolladores.push(dev.id)
  storageService.updateProyecto(proyecto.value.id, proyecto.value)
  mensaje.value = `${dev.nombre} ${dev.apellido} asignado al proyecto`
  setTimeout(() => mensaje.value = '', 3000)
}

const removerDesarrollador = (dev) => {
  if (confirm(`¿Remover a ${dev.nombre} ${dev.apellido} del proyecto?`)) {
    proyecto.value.desarrolladores = proyecto.value.desarrolladores.filter(id => id !== dev.id)
    storageService.updateProyecto(proyecto.value.id, proyecto.value)
    mensaje.value = `${dev.nombre} ${dev.apellido} removido del proyecto`
    setTimeout(() => mensaje.value = '', 3000)
  }
}

onMounted(() => {
  const id = route.params.id
  proyecto.value = storageService.getProyectoById(id)
  desarrolladores.value = storageService.getDesarrolladores()
})
</script>

<style scoped>
.subtitle {
  color: var(--text-secondary);
  margin-top: 8px;
}

.desarrolladores-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 16px;
}

.dev-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  background: var(--background);
  border-radius: 6px;
  border: 1px solid var(--border-color);
}

.dev-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.btn-sm {
  padding: 6px 12px;
  font-size: 12px;
}
</style>
