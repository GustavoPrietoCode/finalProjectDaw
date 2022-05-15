<template>

  <div>
    <MapView />
    <MyLocationBtn />
    <SearchBar />

    <Footer />
  </div>
    

</template>

<script>
import { usePlacesStore } from '@/modules/map/composables/usePlacesStore'
import { defineAsyncComponent } from 'vue';

import MapView from "@/modules/map/components/mapview/MapView.vue";
import MyLocationBtn from "@/modules/map/components/my-location-btn/MyLocationBtn.vue";
import SearchBar from "@/modules/map/components/searchbar/SearchBar.vue";

export default {
  name: 'Mapa',
  components: { 
    MapView,
    MyLocationBtn,
    SearchBar,
    Footer: defineAsyncComponent(() => import(/* webpackChunkName: "Navbar" */'@/shared/components/Footer.vue')),
    },
  setup() {

    usePlacesStore();

    return {

    }

  }
}
</script>
