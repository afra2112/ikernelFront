<script setup>
import { ref, onMounted } from "vue";
import { jwtDecode } from "jwt-decode";
import { correoService } from "@/services/correoService";

const correos = ref([]);
const tipoBandeja = ref("recibidos");
const userEmail = ref("");
const mostrarModal = ref(false);
const nuevoCorreo = ref({
  emailDestino: "",
  asunto: "",
  mensaje: "",
});

onMounted(async () => {
  const token = localStorage.getItem("token");
  if (token) {
    const decoded = jwtDecode(token);
    userEmail.value = decoded.sub;
    await cargarCorreosRecibidos();
  }
});

const cargarCorreosRecibidos = async () => {
  correos.value = (await correoService.obtenerCorreosRecibidos(userEmail.value)).data;
};

const cargarCorreosEnviados = async () => {
  correos.value = (await correoService.obtenerCorreosEnviados(userEmail.value)).data;
};

const cargarCorreosPapelera = async () => {
  correos.value = (await correoService.obtenerCorreosPapelera(userEmail.value)).data;
};

const cambiarBandeja = async (tipo) => {
  tipoBandeja.value = tipo;
  if (tipo === "recibidos") await cargarCorreosRecibidos();
  else await cargarCorreosEnviados();
  if (tipo == "papelera") await cargarCorreosPapelera();
};

const borrar = async (idEmail) => {
  await correoService.borrar(idEmail);
}

const recuperar = async (idEmail) => {
  await correoService.recuperar(idEmail);
}

const enviarCorreo = async () => {
  if (!nuevoCorreo.value.emailDestino || !nuevoCorreo.value.asunto || !nuevoCorreo.value.mensaje) {
    alert("Por favor completa todos los campos.");
    return;
  }

  const formData = {
    emailOrigen: userEmail.value,
    ...nuevoCorreo.value
  };

  try {
    await correoService.enviarCorreoInterno(formData);
    alert("Correo enviado exitosamente");
    mostrarModal.value = false;
    nuevoCorreo.value = { emailDestino: "", asunto: "", mensaje: "" };
    if (tipoBandeja.value === "enviados") await cargarCorreosEnviados();
  } catch (error) {
    console.error(error);
    alert("Error al enviar el correo");
  }
};
</script>

<template>
  <div>
    <h1>Correo Electrónico Corporativo</h1>

    <div class="grid" style="grid-template-columns: 250px 1fr;">

      <div class="card">
        <button
          class="btn btn-primary"
          style="width: 100%; margin-bottom: 16px"
          @click="mostrarModal = true"
        >
          ✉️ Nuevo Correo
        </button>

        <nav class="mail-nav">
          <a
            @click="cambiarBandeja('recibidos')"
            :class="['mail-nav-item', tipoBandeja==='recibidos' ? 'active' : '']"
          >
            📥 Bandeja de entrada
          </a>
          <a
            @click="cambiarBandeja('enviados')"
            :class="['mail-nav-item', tipoBandeja==='enviados' ? 'active' : '']"
          >
            📤 Enviados
          </a>
          <a
            @click="cambiarBandeja('papelera')"
            :class="['mail-nav-item', tipoBandeja==='papelera' ? 'active' : '']"
          >
            🗑️ Papelera
          </a>
          <a href="#" class="mail-nav-item">📝 Borradores</a>
        </nav>
      </div>

      <div class="card">
        <h2 v-if="tipoBandeja==='recibidos'">Bandeja de Entrada</h2>
        <h2 v-else>Correos Enviados</h2>

        <div class="mail-list">
          <div v-for="mail in correos" :key="mail.id" class="mail-item">
            <div class="mail-from">
              {{ tipoBandeja === 'recibidos' ? mail.emailOrigen : mail.emailDestino }}
            </div>
            <div class="mail-subject">{{ mail.asunto }}</div>
            <div class="mail-preview">{{ mail.mensaje}}</div>
            <div class="mail-date">{{ new Date(mail.fecha[0], mail.fecha[1] - 1, mail.fecha[2], mail.fecha[3], mail.fecha[4], mail.fecha[5]).toLocaleString() }}</div>
            <button v-if="tipoBandeja === 'recibidos'" @click="borrar(`${mail.idEmail}`)" class="mail-item">Borrar</button>
            <button v-if="tipoBandeja === 'papelera'" @click="recuperar(`${mail.idEmail}`)" class="mail-item">Recuperar</button>
          </div>
        </div>
      </div>
    </div>

    <div v-if="mostrarModal" class="modal-overlay">
      <div class="modal">
        <h2>Nuevo Correo</h2>

        <label>Para:</label>
        <input v-model="nuevoCorreo.emailDestino" placeholder="Correo del destinatario" />

        <label>Asunto:</label>
        <input v-model="nuevoCorreo.asunto" placeholder="Asunto" />

        <label>Mensaje:</label>
        <textarea v-model="nuevoCorreo.mensaje" rows="5" placeholder="Escribe tu mensaje..."></textarea>

        <div class="modal-actions">
          <button class="btn btn-primary" @click="enviarCorreo">Enviar</button>
          <button class="btn btn-secondary" @click="mostrarModal = false">Cancelar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.mail-nav {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.mail-nav-item {
  padding: 10px 12px;
  text-decoration: none;
  color: var(--text-primary);
  border-radius: 6px;
  transition: background-color 0.2s;
}

.mail-nav-item:hover {
  background: var(--background);
}

.mail-nav-item.active {
  background: var(--primary-color);
  color: white;
}

.mail-list {
  margin-top: 16px;
}

.mail-item {
  padding: 16px;
  border-bottom: 1px solid var(--border-color);
  cursor: pointer;
  transition: background-color 0.2s;
}

.mail-item:hover {
  background: var(--background);
}

.mail-from {
  font-weight: 600;
  margin-bottom: 4px;
}

.mail-subject {
  color: var(--text-primary);
  margin-bottom: 4px;
}

.mail-preview {
  color: var(--text-secondary);
  font-size: 14px;
  margin-bottom: 8px;
}

.mail-date {
  font-size: 12px;
  color: var(--text-secondary);
}
</style>
