<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Repuebla CyL</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="/">Inicio</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/mapa">Mapa</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/contacto">Contacto</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/daybook">Blog</a>
        </li>
      </ul>
    </div>
  </div>
</nav>

</template>

<script>
export default {

}
</script>

<style scoped>

div {
    padding: 0 30px;
}

div a{
    font-weight: bold;
    color: #2c3e50;
    margin: 0 10px;
    
}
</style>