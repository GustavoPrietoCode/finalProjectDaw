<template>
  <div class="home">
    <HelloHero />
    <BloquesFiltros />
    <Footer />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloHero from "@/modules/home/components/HelloWorld.vue";
import BloquesFiltros from "@/modules/home/components/InicioBloqueFiltros.vue";
import { defineAsyncComponent } from 'vue';

export default {
  name: "HomeView",
  components: {
    HelloHero,
    BloquesFiltros,
    Footer: defineAsyncComponent(() => import(/* webpackChunkName: "Navbar" */'@/shared/components/Footer.vue')),
  },
};
</script>

<style scoped>
.home {
  position: relative;
  height: auto;
}
</style>
