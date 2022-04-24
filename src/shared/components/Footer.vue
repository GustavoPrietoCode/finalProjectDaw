<template>
    <footer class="footer">
    <div class="container">
      <div class="row p-4">
        <div class="m-3 p-2 col ">Proyecto fin de curso</div>
        <div class="m-3 p-2 col d-flex justify-content-center">
            <h6>Realizado en Vuejs </h6>
            <img src="@/assets/logo.png" 
                alt="Vue Logo"
                height="24"
                class="d-inline-block align-text-top mx-2">
        </div>
        <div class="m-3 p-2 col">Gustavo Prieto</div>
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
    bottom: 0;
    background-color: #B49F6D;
    width: 100%;
    height: 150px;
}

</style>