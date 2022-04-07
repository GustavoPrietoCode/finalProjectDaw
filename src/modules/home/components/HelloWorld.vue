<template>
  <div class="container-fluid bodyHero d-flex justify-content-center align-items-center">
      <div class="tituloHero d-flex flex-column justify-content-center h-50 p-5">
        <h1>Repuebla Castilla y León</h1>
        <h2>¡Mi pueblo es el más bonito del mundo!</h2>
        <h5>Cuenta al mundo todo lo bueno que tiene tu pueblo</h5>
      </div>
  </div>
</template>

<script>
export default {
  name: "HelloHero",
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.bodyHero {
  background-image: url("@/assets/avila.jpg");
  background-position: center; /* Center the image */
  background-repeat: no-repeat; /* Do not repeat the image */
  background-size: cover;
  height: 60vh;
  width: 100%;
}

.tituloHero{
  color: #fff;
  background-color: rgba(126, 127, 94, 0.5);
}
</style>
