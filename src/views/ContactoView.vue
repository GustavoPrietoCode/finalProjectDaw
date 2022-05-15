<template>
  <div class="cont container-fluid">
    <div class="container mt-4">

      <div class="row ">
        <div class="col d-flex flex-column text-center my-5">
          <h2>Aquí puedes encontrar otros proyectos:</h2>

        </div>
      </div>

      <div class="row filas">
        
          <div class="col d-flex justify-content-center align-items-center">
            <a href="https://www.revistasalvaje.com" target="_blank">
            <img src="@/assets/SalvajePortada.webp" alt="Revista Salvaje">
            </a>
          </div>
          <div class="col d-flex flex-column text-center mt-5">
            <h2>¿Cómo puedes ayudar a tu pueblo?</h2>
            <p>Aquí puedes encontrar otros proyectos:</p>
          </div>
        
      </div>


    </div>





  </div>
</template>

<style scoped>

.cont{
  background-color: rgba(126, 127, 94);
  color:white;
  height: 100vh;
  width: 100%;
}

.filas {
  border: 1px solid white;
  border-radius: 10px;
  width: 100%;
}

.filas a{
  text-decoration: none;
  color:white;
}

img{
  border:1px solid white ;
  max-width: 150px;
  max-height: 150px;
}

</style>
