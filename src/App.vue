<template>
  <NavBar />

  <p v-if="authStatus === 'authenticating'">{{ authStatus }}</p>
  <router-view v-else/>

</template>

<script>
//import NavBar from "@/shared/components/NavBar";
import { defineAsyncComponent } from 'vue';
import useAuth from "./modules/auth/composables/useAuth";

export default {
  name: 'App',
  components: {
      NavBar: defineAsyncComponent(() => import(/* webpackChunkName: "Navbar" */'./shared/components/NavBar')),
    },
    setup() {
      const { authStatus, checkAuthStatus } = useAuth()
      checkAuthStatus()

      return {
        authStatus,
      }
  },
}
</script>

<style>
#app {
  font-family: Montserrat, Helvetica, Arial, sans-serif;
}
</style>
