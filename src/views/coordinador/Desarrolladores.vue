<template>
  <div>
    <div class="flex-between mb-4">
      <div>
        <h1>Desarrolladores</h1>
        <p class="subtitle">Gestiona el equipo de desarrollo</p>
      </div>
      <router-link to="/dashboard/registrar-desarrollador" class="btn btn-primary">
        ➕ Nuevo Desarrollador
      </router-link>
    </div>

    <div class="card">
      <div class="form-group">
        <input v-model="busqueda" 
               type="text" 
               class="form-input" 
               placeholder="Buscar por nombre, especialidad o tipo...">
      </div>

      <table class="table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Identificación</th>
            <th>Especialidad</th>
            <th>Tipo</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="dev in desarrolladoresFiltrados" :key="dev.id">
            <td>
              <div class="flex" style="align-items: center; gap: 12px;">
                <div v-if="dev.foto" class="avatar">
                  <img :src="dev.foto" :alt="dev.nombre">
                </div>
                <div v-else class="avatar">{{ dev.nombre[0] }}</div>
                <div>
                  <strong>{{ dev.nombre }} {{ dev.apellido }}</strong>
                  <br>
                  <small style="color: var(--text-secondary)">{{ dev.email }}</small>
                </div>
              </div>
            </td>
            <td>{{ dev.identificacion }}</td>
            <td><span class="badge badge-info">{{ dev.especialidad }}</span></td>
            <td>{{ getTipoLabel(dev.tipo) }}</td>
            <td>
              <span :class="['badge', dev.activo ? 'badge-success' : 'badge-danger']">
                {{ dev.activo ? 'Activo' : 'Inactivo' }}
              </span>
            </td>
            <td>
              <div class="flex gap-2">
                <router-link :to="`/dashboard/desarrolladores/${dev.id}/editar`" 
                             class="btn btn-outline" style="padding: 6px 12px; font-size: 12px;">
                  ✏️ Editar
                </router-link>
                <router-link :to="`/dashboard/desarrolladores/${dev.id}/reporte`" 
                             class="btn btn-outline" style="padding: 6px 12px; font-size: 12px;">
                  📊 Reporte
                </router-link>
                <button v-if="dev.activo" 
                        @click="$emit('inhabilitar', dev.id)"
                        class="btn btn-danger" style="padding: 6px 12px; font-size: 12px;">
                  🚫 Inhabilitar
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <div v-if="desarrolladoresFiltrados.length === 0" class="text-center" style="padding: 40px;">
        <p style="color: var(--text-secondary)">No se encontraron desarrolladores</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  desarrolladores: {
    type: Array,
    default: () => []
  }
})

defineEmits(['inhabilitar'])

const busqueda = ref('')

const desarrolladoresFiltrados = computed(() => {
  if (!busqueda.value) return props.desarrolladores
  
  const termino = busqueda.value.toLowerCase()
  return props.desarrolladores.filter(dev => 
    dev.nombre.toLowerCase().includes(termino) ||
    dev.apellido.toLowerCase().includes(termino) ||
    dev.especialidad.toLowerCase().includes(termino) ||
    dev.tipo.toLowerCase().includes(termino)
  )
})

const getTipoLabel = (tipo) => {
  const tipos = {
    coordinador: 'Coordinador',
    lider: 'Líder',
    desarrollador: 'Desarrollador'
  }
  return tipos[tipo] || tipo
}
</script>

<style scoped>
.subtitle {
  color: var(--text-secondary);
  margin-top: 8px;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--primary-color);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  overflow: hidden;
}

.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
