<script setup>
import { ref, computed, onMounted } from "vue";
import { usuarioService } from "@/services/usuarioService";

const desarrolladores = ref([]);
const busqueda = ref("");

onMounted(async () => {
  const res = await usuarioService.obtenerDesarrolladores();
  desarrolladores.value = res.data;
});

const desarrolladoresFiltrados = computed(() =>
  desarrolladores.value.filter((dev) => {
    const termino = busqueda.value.toLowerCase();
    return (
      dev.nombre.toLowerCase().includes(termino) ||
      dev.apellido.toLowerCase().includes(termino) ||
      (dev.especialidad && dev.especialidad.toLowerCase().includes(termino)) ||
      (dev.rol && dev.rol.toLowerCase().includes(termino))
    );
  })
);

async function habilitarDesarrollador(idDesarrollador, habilitar) {
  await usuarioService.habilitarDesarrollador(idDesarrollador, habilitar)
}
</script>

<template>
  <div>
    <div class="flex-between mb-6">
      <div>
        <h1>👨‍💻 Desarrolladores</h1>
        <p class="subtitle">Gestiona el equipo de desarrollo</p>
      </div>
      <router-link to="/dashboard/registrar-desarrollador" class="btn btn-primary">
        ➕ Nuevo Desarrollador
      </router-link>
    </div>

    <div class="card p-4 mb-6">
      <input
        v-model="busqueda"
        type="text"
        class="form-input"
        placeholder="🔍 Buscar por nombre, especialidad o tipo..."
      />
    </div>

    <div v-if="desarrolladoresFiltrados.length" class="grid-devs">
      <div
        v-for="dev in desarrolladoresFiltrados"
        :key="dev.idUsuario"
        class="dev-card"
        @click="$router.push(`/dashboard/desarrolladores/${dev.idUsuario}`)"
        :class="{'deshabilitado': !dev.habilitado}"
      >
        <div class="dev-avatar">
          <img
            v-if="dev.foto"
            :src="`http://localhost:8080/imagenes/${dev.foto}`"
            :alt="dev.nombre"
          />
          <div v-else class="avatar-fallback">
            {{ dev.nombre[0].toUpperCase() }}
          </div>
        </div>

        <div class="dev-info">
          <h3>{{ dev.nombre }} {{ dev.apellido }}</h3>
          <p class="dev-email">{{ dev.email }}</p>
          <span class="badge">{{ dev.especialidad || "Sin especialidad" }}</span>
        </div>

        <div class="dev-actions">
          <router-link
            :to="`/dashboard/desarrolladores/${dev.idUsuario}/editar`"
            class="btn btn-outline btn-sm"
          >
            ✏️ Editar
          </router-link>

          <router-link
            :to="`/dashboard/desarrolladores/${dev.idUsuario}/reporte`"
            class="btn btn-outline btn-sm"
          >
            📊 Reporte
          </router-link>

          <button
            v-if="dev.habilitado"
            class="btn btn-danger btn-sm"
            @click="habilitarDesarrollador(dev.idUsuario, false)"
          >
            🚫 Inhabilitar
          </button>
          <button
            v-if="!dev.habilitado"
            class="btn btn-primary btn-sm"
            @click="habilitarDesarrollador(dev.idUsuario, true)"
          >
            ✅ Habilitar
          </button>
        </div>
      </div>
    </div>

    <div v-else class="text-center empty-state">
      <p>No se encontraron desarrolladores</p>
    </div>
  </div>
</template>

<style scoped>
.subtitle {
  color: var(--text-secondary);
}

.card {
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
}

.flex-between {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.grid-devs {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
}

.dev-card {
  background: white;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  cursor: pointer;
}

.dev-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
}

.dev-avatar {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  overflow: hidden;
  background: #e0e7ff;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;
}

.deshabilitado{
  background: #dc6970;
}

.dev-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar-fallback {
  font-size: 32px;
  color: white;
  background: var(--primary-color);
  width: 100%;
  height: 100%;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.dev-info {
  text-align: center;
  margin-bottom: 12px;
}

.dev-info h3 {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
}

.dev-email {
  color: var(--text-secondary);
  font-size: 14px;
  margin-bottom: 6px;
}

.badge {
  display: inline-block;
  padding: 4px 10px;
  background: var(--primary-color);
  color: white;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
}

.dev-actions {
  display: flex;
  gap: 8px;
  margin-top: 8px;
}

.btn-sm {
  font-size: 13px;
  padding: 6px 10px;
}

.empty-state {
  padding: 50px;
  color: var(--text-secondary);
}
</style>
