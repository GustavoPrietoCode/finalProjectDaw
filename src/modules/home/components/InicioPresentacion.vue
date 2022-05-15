<template>

    <div class="container mt-4">
      <div class="row ">
        <div class="d-flex justify-content-center">
          <h2>¿Cómo puedes ayudar a tu pueblo?</h2>
        </div>
      </div>
    </div>

    <div class="cont container my-2 d-flex justify-content-center align-items-center">

      <div class="row ">

        <div class="col-sm-4">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Escríbe sobre tu pueblo</h5>
              <p class="card-text">Regístrate. Escribe o modifica información sobre tu pueblo en nuestro blog.</p>
              <a href="/auth" class="btn btn-primary">Blog</a>
            </div>
          </div>
        </div>
        <div class="col-sm-4">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Visita el mapa</h5>
              <p class="card-text">A medida que haya más información, actualizaremos los items del mapa y verás que hay o qué falta cerca de tu pueblo.</p>
              <a href="/mapa" class="btn btn-primary">Mapa</a>
            </div>
          </div>
        </div>
        <div class="col-sm-4">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Contacta</h5>
              <p class="card-text">¿Falta algo? Cuéntanos qué necesita tu pueblo y lo destacaremos en el mapa.</p>
              <a href="mailto:gustavopg@alumnos.iesgalileo.es" class="btn btn-primary">contacta</a>
            </div>
          </div>
        </div>

      </div>

  </div>
</template>

<script>
export default {
    name: "InicioPresentacion",
}
</script>

<style>

.cont{
  height: 40vh;
}

.card {
  min-height: 250px;
}

.card a {
  position: absolute;
  bottom: 10px;
}

</style>