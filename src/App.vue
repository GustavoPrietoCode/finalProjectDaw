<template>
  <NavBar />
  <router-view />
</template>

<script>
//import NavBar from "@/shared/components/NavBar";
import { defineAsyncComponent } from 'vue'

export default {
  name: 'App',
  components: {NavBar: defineAsyncComponent(() => import(/* webpackChunkName: "Navbar" */'./shared/components/NavBar')),
    }
}
</script>

<style>
#app {
  font-family: Montserrat, Helvetica, Arial, sans-serif;
}
</style>
