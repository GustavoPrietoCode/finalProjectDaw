<template>

  <div v-if="!isUserLocationReady" 
        class="loading-map d-flex justify-content-center align-items-center">
        <div class="text-center">
            <h3>Espere por favor</h3>
            <span>Localizando...</span>
        </div>
    </div>

    <div v-show="isUserLocationReady"
        class="map-container"
        ref="mapElement"
    />

</template>

<script>
import { usePlacesStore } from '../../composables/usePlacesStore';
import {  onMounted, ref, watch } from "vue";
import Mapboxgl from "mapbox-gl";

export default {
    name: 'MapView',
    setup() {

      const mapElement = ref();
      const { userLocation, isUserLocationReady } = usePlacesStore();

      const initMap = async () => {

        if( !mapElement.value) throw new Error('Div Element no existe');
        if( !userLocation.value) throw new Error('userLocation no existe');


        await Promise.resolve();

        const map = new Mapboxgl.Map({
          container: mapElement.value, // container ID
          style: 'mapbox://styles/mapbox/streets-v11', // style URL
          center: userLocation.value, // starting position [lng, lat]
          zoom: 9 // starting zoom
          });


      }



      onMounted(() => {
        if( isUserLocationReady.value ) return initMap();
      }) 

      watch( isUserLocationReady, ( newVal ) => {
      //console.log( { newVal })
      if( isUserLocationReady.value ) return initMap();

    })

        return {
          userLocation,
          isUserLocationReady,
          mapElement,
        }
    }
}
</script>

<style scoped>

.map-container {
    height: 100vh;
    position: fixed;
    width: 100vw;
    color: red;
}

.loading-map {
    background-color: rgb(0,0,0,0.8);
    color: burlywood;
    height: 100vh;
    left: 0px;
    position: fixed;
    top: 0px;
    width: 100vw;
    z-index: 9999;
}

</style>