<script setup>
import { onMounted, ref } from 'vue'
import { usuarioService } from '@/services/usuarioService'
import router from '@/router'
import { proyectoService } from '@/services/proyectoService'

const formData = ref({
  nombre: '',
  apellido: '',
  fechaNacimiento: '',
  identificacion: '',
  direccion: '',
  profesion: '',
  especialidad: '',
  tipo: '',
  email: '',
  telefono: '',
  proyectoId: '',
  foto: null
})


const proyectos = ref([]);

onMounted(async () => {
  try {
    const { data } = await proyectoService.listarProyectos();
    proyectos.value = data;
  } catch (error) {
    console.error("Error cargando proyectos:", error);
  }
});

function handleFileUpload(event) {
  formData.value.foto = event.target.files[0]
}

async function registrarDesarrollador() {
  const fd = new FormData()
  for (const key in formData.value) {
    fd.append(key, formData.value[key])
  }

  await usuarioService.registrarDesarrollador(fd)
  router.push("/dashboard/desarrolladores")
}

</script>

<template>
  <div>
    <h1>Registrar Desarrollador</h1>
    <p class="subtitle">Ingresa la información del nuevo desarrollador</p>

    <div class="card mt-4">
      <form @submit.prevent="registrarDesarrollador" enctype="multipart/form-data">
        <div class="grid grid-2">
          <div class="form-group">
            <label class="form-label">Nombre</label>
            <input v-model="formData.nombre" type="text" class="form-input" required>
          </div>

          <div class="form-group">
            <label class="form-label">Apellido</label>
            <input v-model="formData.apellido" type="text" class="form-input" required>
          </div>

          <div class="form-group">
            <label class="form-label">Fecha de Nacimiento</label>
            <input v-model="formData.fechaNacimiento" type="date" class="form-input" required>
          </div>

          <div class="form-group">
            <label class="form-label">Identificación</label>
            <input v-model="formData.identificacion" type="text" class="form-input" required>
          </div>

          <div class="form-group">
            <label class="form-label">Dirección</label>
            <input v-model="formData.direccion" type="text" class="form-input" required>
          </div>

          <div class="form-group">
            <label class="form-label">Profesión</label>
            <input v-model="formData.profesion" type="text" class="form-input" required>
          </div>

          <div class="form-group">
            <label class="form-label">Especialidad</label>
            <select v-model="formData.especialidad" class="form-select" required>
              <option value="">Seleccionar...</option>
              <option value="Frontend">Frontend</option>
              <option value="Backend">Backend</option>
              <option value="Full Stack">Full Stack</option>
              <option value="Mobile">Mobile</option>
              <option value="DevOps">DevOps</option>
              <option value="QA">QA</option>
            </select>
          </div>

          <div class="form-group">
            <label class="form-label">Rol</label>
            <select v-model="formData.rol" class="form-select" required>
              <option value="">Seleccionar...</option>
              <option value="coordinador">Coordinador</option>
              <option value="lider">Líder de Proyecto</option>
              <option value="desarrollador">Desarrollador</option>
            </select>
          </div>

          <div class="form-group">
            <label class="form-label">Email</label>
            <input v-model="formData.email" type="email" class="form-input" required>
          </div>

          <div class="form-group">
            <label class="form-label">Contrasena (Inicial para acceder al sistema)</label>
            <input v-model="formData.password" type="password" class="form-input" required>
          </div>

          <div class="form-group">
            <label class="form-label">Teléfono</label>
            <input v-model="formData.telefono" type="tel" class="form-input" required>
          </div>

          <div class="form-group">
            <label class="form-label">Proyecto Asignado (Opcional)</label>
            <select v-model="formData.proyectoId" class="form-select">
              <option value="">Sin asignar</option>
              <option v-for="proyecto in proyectos" :key="proyecto.idProyecto" :value="proyecto.idProyecto">
                {{ proyecto.nombre }}
              </option>
            </select>
          </div>

          <div class="form-group">
            <label class="form-label">Foto</label>
            <input type="file" class="form-input" @change="handleFileUpload">
          </div>
        </div>

        <div class="flex gap-2 mt-4">
          <button type="submit" class="btn btn-primary">Registrar</button>
          <router-link to="/dashboard/desarrolladores" class="btn btn-outline">Cancelar</router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.subtitle {
  color: var(--text-secondary);
  margin-top: 8px;
}
</style>
