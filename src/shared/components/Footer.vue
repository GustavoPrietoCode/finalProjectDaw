<template>
    <footer class="footer">
    <div class="container">
      <div class="row p-4">
        <div class="m-3 p-2 col ">
          <p>Proyecto fin de curso 2022</p>
          <p>IES Galileo (Valladolid)</p>
        </div>
        <div class="m-3 p-2 col d-flex justify-content-center">
            <h6>Realizado en Vuejs </h6>
            <img src="@/assets/logo.png" 
                alt="Vue Logo"
                height="24"
                class="d-inline-block align-text-top mx-2">
        </div>
        <div class="contacto m-3 p-2 col">
          <p>Gustavo Prieto</p>
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

.contacto a {
  text-decoration: none;
  color: black;

}

</style>