<template>
  <div class="container">
    <div class="card">
      <h1>Links de Interés</h1>
      
      <div class="links-section">
        <h2>Documentación Oficial</h2>
        <div class="links-grid">
          <a href="https://vuejs.org" target="_blank" class="link-card">
            <div class="link-icon">📘</div>
            <h3>Vue.js</h3>
            <p>Framework progresivo de JavaScript</p>
          </a>
          <a href="https://react.dev" target="_blank" class="link-card">
            <div class="link-icon">⚛️</div>
            <h3>React</h3>
            <p>Biblioteca para interfaces de usuario</p>
          </a>
          <a href="https://nodejs.org" target="_blank" class="link-card">
            <div class="link-icon">🟢</div>
            <h3>Node.js</h3>
            <p>Entorno de ejecución JavaScript</p>
          </a>
          <a href="https://www.python.org" target="_blank" class="link-card">
            <div class="link-icon">🐍</div>
            <h3>Python</h3>
            <p>Lenguaje de programación versátil</p>
          </a>
        </div>
      </div>

      <div class="links-section">
        <h2>Herramientas de Desarrollo</h2>
        <div class="links-grid">
          <a href="https://github.com" target="_blank" class="link-card">
            <div class="link-icon">🐙</div>
            <h3>GitHub</h3>
            <p>Control de versiones y colaboración</p>
          </a>
          <a href="https://code.visualstudio.com" target="_blank" class="link-card">
            <div class="link-icon">💻</div>
            <h3>VS Code</h3>
            <p>Editor de código fuente</p>
          </a>
          <a href="https://www.docker.com" target="_blank" class="link-card">
            <div class="link-icon">🐳</div>
            <h3>Docker</h3>
            <p>Plataforma de contenedores</p>
          </a>
          <a href="https://www.postman.com" target="_blank" class="link-card">
            <div class="link-icon">📮</div>
            <h3>Postman</h3>
            <p>Pruebas de APIs</p>
          </a>
        </div>
      </div>

      <div class="links-section">
        <h2>Recursos de Aprendizaje</h2>
        <div class="links-grid">
          <a href="https://developer.mozilla.org" target="_blank" class="link-card">
            <div class="link-icon">📚</div>
            <h3>MDN Web Docs</h3>
            <p>Documentación web completa</p>
          </a>
          <a href="https://stackoverflow.com" target="_blank" class="link-card">
            <div class="link-icon">💬</div>
            <h3>Stack Overflow</h3>
            <p>Comunidad de programadores</p>
          </a>
          <a href="https://www.freecodecamp.org" target="_blank" class="link-card">
            <div class="link-icon">🎓</div>
            <h3>freeCodeCamp</h3>
            <p>Aprende a programar gratis</p>
          </a>
          <a href="https://www.udemy.com" target="_blank" class="link-card">
            <div class="link-icon">🎬</div>
            <h3>Udemy</h3>
            <p>Cursos en línea</p>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
h1 {
  color: var(--primary-color);
  margin-bottom: 32px;
}

.links-section {
  margin-bottom: 48px;
}

.links-section h2 {
  color: var(--text-primary);
  margin-bottom: 24px;
  font-size: 24px;
}

.links-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
}

.link-card {
  background: var(--background);
  padding: 24px;
  border-radius: 8px;
  text-align: center;
  text-decoration: none;
  color: var(--text-primary);
  transition: all 0.2s;
  border: 1px solid var(--border-color);
}

.link-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
  border-color: var(--primary-color);
}

.link-icon {
  font-size: 48px;
  margin-bottom: 12px;
}

.link-card h3 {
  margin-bottom: 8px;
  color: var(--primary-color);
}

.link-card p {
  font-size: 14px;
  color: var(--text-secondary);
}
</style>
