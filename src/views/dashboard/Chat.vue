<template>
  <div>
    <h1>Chat Corporativo</h1>
    
    <div class="grid" style="grid-template-columns: 300px 1fr;">
      <div class="card">
        <h2>Conversaciones</h2>
        <div class="chat-list">
          <div v-for="chat in chats" :key="chat.id" 
               :class="['chat-item', { active: chatActivo === chat.id }]"
               @click="chatActivo = chat.id">
            <div class="chat-avatar">{{ chat.avatar }}</div>
            <div class="chat-info">
              <div class="chat-name">{{ chat.nombre }}</div>
              <div class="chat-last">{{ chat.ultimoMensaje }}</div>
            </div>
            <span v-if="chat.sinLeer" class="badge badge-danger">{{ chat.sinLeer }}</span>
          </div>
        </div>
      </div>

      <div class="card chat-container">
        <div v-if="chatActivo" class="chat-content">
          <div class="chat-header">
            <h2>{{ chats.find(c => c.id === chatActivo)?.nombre }}</h2>
          </div>
          
          <div class="messages">
            <div v-for="msg in mensajes" :key="msg.id" 
                 :class="['message', msg.propio ? 'message-own' : 'message-other']">
              <div class="message-content">{{ msg.texto }}</div>
              <div class="message-time">{{ msg.hora }}</div>
            </div>
          </div>

          <div class="chat-input">
            <input v-model="nuevoMensaje" 
                   type="text" 
                   class="form-input" 
                   placeholder="Escribe un mensaje..."
                   @keyup.enter="enviarMensaje">
            <button @click="enviarMensaje" class="btn btn-primary">Enviar</button>
          </div>
        </div>
        <div v-else class="chat-empty">
          Selecciona una conversación para comenzar
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const chatActivo = ref(1)
const nuevoMensaje = ref('')

const chats = ref([
  { id: 1, nombre: 'Equipo Proyecto A', avatar: '👥', ultimoMensaje: 'Perfecto, nos vemos mañana', sinLeer: 2 },
  { id: 2, nombre: 'Juan Pérez', avatar: '👤', ultimoMensaje: 'Gracias por la información', sinLeer: 0 },
  { id: 3, nombre: 'María García', avatar: '👤', ultimoMensaje: 'Revisaré el código', sinLeer: 1 }
])

const mensajes = ref([
  { id: 1, texto: 'Hola equipo, ¿cómo va el proyecto?', hora: '10:30', propio: false },
  { id: 2, texto: 'Todo bien, estamos avanzando según lo planeado', hora: '10:32', propio: true },
  { id: 3, texto: 'Excelente, ¿necesitan algo?', hora: '10:33', propio: false },
  { id: 4, texto: 'Por ahora todo está bajo control', hora: '10:35', propio: true }
])

const enviarMensaje = () => {
  if (nuevoMensaje.value.trim()) {
    mensajes.value.push({
      id: Date.now(),
      texto: nuevoMensaje.value,
      hora: new Date().toLocaleTimeString('es', { hour: '2-digit', minute: '2-digit' }),
      propio: true
    })
    nuevoMensaje.value = ''
  }
}
</script>

<style scoped>
.chat-list {
  margin-top: 16px;
}

.chat-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s;
  position: relative;
}

.chat-item:hover {
  background: var(--background);
}

.chat-item.active {
  background: var(--primary-color);
  color: white;
}

.chat-avatar {
  font-size: 32px;
}

.chat-info {
  flex: 1;
}

.chat-name {
  font-weight: 600;
  margin-bottom: 4px;
}

.chat-last {
  font-size: 14px;
  opacity: 0.8;
}

.chat-container {
  display: flex;
  flex-direction: column;
  height: 600px;
}

.chat-content {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.chat-header {
  padding-bottom: 16px;
  border-bottom: 1px solid var(--border-color);
}

.messages {
  flex: 1;
  overflow-y: auto;
  padding: 16px 0;
}

.message {
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
}

.message-own {
  align-items: flex-end;
}

.message-other {
  align-items: flex-start;
}

.message-content {
  max-width: 70%;
  padding: 12px 16px;
  border-radius: 12px;
  margin-bottom: 4px;
}

.message-own .message-content {
  background: var(--primary-color);
  color: white;
}

.message-other .message-content {
  background: var(--background);
}

.message-time {
  font-size: 12px;
  color: var(--text-secondary);
}

.chat-input {
  display: flex;
  gap: 12px;
  padding-top: 16px;
  border-top: 1px solid var(--border-color);
}

.chat-empty {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: var(--text-secondary);
}
</style>
