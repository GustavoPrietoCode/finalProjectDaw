<template>
  <div class="home">
    <HelloHero />
    <BloquesFiltros />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloHero from "@/modules/home/components/HelloWorld.vue";
import BloquesFiltros from "@/modules/home/components/InicioBloqueFiltros.vue";


export default {
  name: "HomeView",
  components: {
    HelloHero,
    BloquesFiltros,
  },
};
</script>
