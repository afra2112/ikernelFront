<template>
  <div class="public-layout">
    <header class="header">
      <div class="container">
        <nav class="navbar">
          <div class="logo">
            <h2>IKernell Soluciones</h2>
          </div>
          <ul class="nav-menu">
            <li><router-link to="/">Inicio</router-link></li>
            <li><router-link to="/lineamientos">Lineamientos</router-link></li>
            <li><router-link to="/portafolio">Portafolio</router-link></li>
            <li><router-link to="/noticias">Noticias</router-link></li>
            <li><router-link to="/preguntas-frecuentes">FAQ</router-link></li>
            <li><router-link to="/links-interes">Links</router-link></li>
            <li><router-link to="/contacto">Contacto</router-link></li>
            <li><router-link to="/login" class="btn btn-primary">Ingresar</router-link></li>
          </ul>
        </nav>
      </div>
    </header>

    <main class="main-content">
      <router-view />
    </main>

    <footer class="footer">
      <div class="container">
        <p>&copy; 2025 IKernell Soluciones Software. Todos los derechos reservados.</p>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.header {
  background: var(--surface);
  box-shadow: var(--shadow);
  position: sticky;
  top: 0;
  z-index: 100;
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
}

.logo h2 {
  color: var(--primary-color);
  font-size: 24px;
}

.nav-menu {
  display: flex;
  list-style: none;
  gap: 24px;
  align-items: center;
}

.nav-menu a {
  text-decoration: none;
  color: var(--text-primary);
  font-weight: 500;
  transition: color 0.2s;
}

.nav-menu a:hover {
  color: var(--primary-color);
}

.nav-menu a.router-link-active {
  color: var(--primary-color);
}

.main-content {
  min-height: calc(100vh - 200px);
  padding: 40px 0;
}

.footer {
  background: var(--text-primary);
  color: white;
  padding: 24px 0;
  text-align: center;
  margin-top: 60px;
}
</style>