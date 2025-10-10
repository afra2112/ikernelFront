<script setup>
import { ref, onMounted } from 'vue'
import { proyectoService } from '@/services/proyectoService'

const proyectos = ref([]);
const loading = ref(true);

onMounted(async () => {
  try {
    const { data } = await proyectoService.listarProyectos();
    proyectos.value = data;
  } catch (error) {
    console.error("Error cargando proyectos:", error);
  } finally {
    loading.value = false;
  }
});

const isLast = (item, array) => array.indexOf(item) === array.length - 1;
</script>

<template>
  <div>
    <h1>Proyectos</h1>
    <p class="subtitle">Gestiona todos los proyectos de tu equipo</p>

    <div v-if="loading" class="text-center">Cargando proyectos...</div>

    <div v-else class="grid grid-3 gap-4">
      <div v-for="proyecto in proyectos" :key="proyecto.id" class="card p-4 shadow">
        <h3>{{ proyecto.nombre }}</h3>
        <p><strong>Cliente:</strong> {{ proyecto.cliente }}</p>
        <p><strong>Presupuesto:</strong> {{ proyecto.presupuesto | moneda }}</p>
        <p><strong>Estado:</strong> <span :class="['badge', proyecto.estado === 'ACTIVO' ? 'badge-success' : 'badge-danger']">{{ proyecto.estado }}</span></p>
        <p><strong>Prioridad:</strong> {{ proyecto.prioridad }}</p>
        <p><strong>Desarrolladores:</strong> 
          <span v-for="dev in proyecto.desarrolladores" :key="dev.idUsuario">
            {{ dev.nombre }} {{ dev.apellido }}<span v-if="!isLast(dev, proyecto.desarrolladores)">, </span>
          </span>
        </p>

        <button class="btn btn-outline mt-2" @click="$router.push(`/dashboard/proyectos/${proyecto.idProyecto}`)">Ver detalle completo</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.subtitle {
  color: var(--text-secondary);
  margin-bottom: 16px;
}
.grid-3 {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 16px;
}
.card {
  border-radius: 8px;
  background: white;
  padding: 16px;
  box-shadow: 0px 2px 6px rgba(0,0,0,0.1);
}
</style>
