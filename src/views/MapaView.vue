<template>

  <div>
    <MapView />
    <Footer />
  </div>
    

</template>

<script>
import { usePlacesStore } from '@/modules/map/composables/usePlacesStore'
import { defineAsyncComponent } from 'vue';

import MapView from "@/modules/map/components/mapview/MapView.vue";



export default {
  name: 'Mapa',
  components: { 
    MapView,
    Footer: defineAsyncComponent(() => import(/* webpackChunkName: "Navbar" */'@/shared/components/Footer.vue')),
    },
  setup() {

    usePlacesStore();

    return {

    }

  }
}
</script>
