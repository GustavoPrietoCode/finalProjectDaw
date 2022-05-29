<template>
    <footer class="footer">
    <div class="container">
      <div class="row p-4">
        <div class="m-3 p-2 col d-flex flex-column align-items-center">
          <p>Proyecto fin de curso 2022</p>
          <a href="http://http://iesgalileo.centros.educa.jcyl.es/sitio/index.cgi" target="_blank" rel="noopener noreferrer">IES Galileo (Valladolid)</a>
        </div>
        <div class="m-3 p-2 col d-flex justify-content-center">
            <h6>Realizado en Vuejs </h6>
            <img src="@/assets/logo.png" 
                alt="Vue Logo"
                height="24"
                class="d-inline-block align-text-top mx-2">
        </div>
        <div class="contacto m-3 p-2 col d-flex flex-column align-items-center">
          <p>Autor: Gustavo Prieto</p>
          <a href="mailto:gustavopg@alumnos.iesgalileo.es">Contacta por email</a>
        </div>
      </div>
    </div>
  </footer>

</template>

<script>
export default {
    name: "Footer",
    setup() {
        
    },
}
</script>

<style scoped>

.footer{
    position: absolute;
    background-color: #B49F6D;
    width: 100%;
    height: 180px;
}

a {
  text-decoration: none;
  color: black;

}

</style>