<template>

  <div>
    <MapView />
    <Footer />
  </div>
    

</template>

<script>
import { usePlacesStore } from '@/modules/map/composables/usePlacesStore'
import MapView from "@/modules/map/components/mapview/MapView.vue";
import { defineAsyncComponent } from 'vue';

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
