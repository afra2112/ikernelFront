<script setup>
    import { ref, onMounted } from "vue";
    import { listarProyectos } from "@/services/proyectoService.js";

const proyectos = ref([]);

onMounted(async () => {
  try {
    proyectos.value = await listarProyectos();
  } catch (error) {
    console.error("Error cargando proyectos:", error);
  }
});
</script>

<template>
    <div>
        <ul>
            <li v-for="proyecto in proyectos">
                {{proyecto.nombre}}
            </li>
        </ul>
    </div>
</template>