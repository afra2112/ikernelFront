<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { usuarioService } from "@/services/usuarioService";

const route = useRoute();
const desarrollador = ref(null);

onMounted(async () => {
  const idUsuario = route.params.id;
  const res = await usuarioService.obtenerUsuario(idUsuario);
  desarrollador.value = res.data;
});
</script>

<template>
  <div v-if="desarrollador" class="detalle-container">
    <!-- Info general -->
    <div class="perfil-header card">
      <div class="avatar">
        <img v-if="desarrollador.foto" :src="`http://localhost:8080/imagenes/${desarrollador.foto}`" />
        <div v-else class="avatar-fallback">{{ desarrollador.nombre[0].toUpperCase() }}</div>
      </div>
      <div class="info">
        <h2>{{ desarrollador.nombre }} {{ desarrollador.apellido }}</h2>
        <p>{{ desarrollador.email }}</p>
        <p>{{ desarrollador.profesion }} | {{ desarrollador.especialidad }}</p>
        <p>Estado: <span :class="desarrollador.habilitado ? 'badge-success' : 'badge-danger'">
          {{ desarrollador.habilitado ? 'Habilitado' : 'Inhabilitado' }}
        </span></p>
      </div>
    </div>

    <!-- Proyectos -->
    <div v-if="desarrollador.proyectos && desarrollador.proyectos.length" class="proyectos-section">
      <h3>Proyectos Asignados</h3>
      <div class="proyectos-grid">
        <div v-for="proyecto in desarrollador.proyectos" :key="proyecto.idProyecto" class="proyecto-card card">
          <h4>{{ proyecto.nombre }}</h4>
          <p>{{ proyecto.descripcion }}</p>

          <!-- Etapas -->
          <div v-if="proyecto.etapas && proyecto.etapas.length" class="etapas-section">
            <h5>Etapas</h5>
            <ul>
              <li v-for="etapa in proyecto.etapas" :key="etapa.idEtapa">
                <strong>{{ etapa.nombre }}</strong> - {{ etapa.estado }}
                <!-- Actividades -->
                <ul v-if="etapa.actividades && etapa.actividades.length">
                  <li v-for="act in etapa.actividades" :key="act.idActividad">
                    {{ act.nombre }} - {{ act.estado }}
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="text-center empty-state">
      <p>Este desarrollador no tiene proyectos asignados.</p>
    </div>
  </div>

  <div v-else class="text-center p-8">Cargando...</div>
</template>

<style scoped>
.detalle-container {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.perfil-header {
  display: flex;
  gap: 24px;
  padding: 24px;
  align-items: center;
}

.avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  overflow: hidden;
  background: #e0e7ff;
  display: flex;
  align-items: center;
  justify-content: center;
}

.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar-fallback {
  font-size: 48px;
  color: white;
  background: var(--primary-color);
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.info h2 {
  margin: 0;
}

.badge-success {
  color: #fff;
  background: #34d399;
  padding: 2px 8px;
  border-radius: 6px;
}

.badge-danger {
  color: #fff;
  background: #f87171;
  padding: 2px 8px;
  border-radius: 6px;
}

.proyectos-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.proyectos-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 16px;
}

.proyecto-card {
  padding: 16px;
  border-radius: 16px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.05);
}

.etapas-section ul {
  list-style: disc;
  padding-left: 16px;
}

.empty-state {
  padding: 40px;
  color: var(--text-secondary);
}
</style>
