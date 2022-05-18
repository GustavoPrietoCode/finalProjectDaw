<template>

  <div class="container-fluid p-4 title">
    <div class="row">
      <div class="d-flex justify-content-center">
        <h3>Filtra para saber qué hay cerca de tu pueblo (Solo hay ejemplos)</h3>
      </div>
    </div>
  </div>

  <nav id="filter-group" class="filter-group"></nav>

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
    >
    <SearchBar />
    </div>
    <MyLocationBtn />
  
</template>

<script>
import { usePlacesStore } from '../../composables/usePlacesStore';
import { useMapStore } from '@/modules/map/composables/useMapStore';
import { onMounted, ref, watch } from "vue";
import Mapboxgl from "mapbox-gl";

import MyLocationBtn from "@/modules/map/components/my-location-btn/MyLocationBtn.vue";
import SearchBar from "@/modules/map/components/searchbar/SearchBar.vue";
import { places } from "@/assets/placesGeo";

export default {
    name: 'MapView',
    components: {
      MyLocationBtn,
      SearchBar,
    },
    setup() {

      const mapElement = ref();
      const { userLocation, isUserLocationReady } = usePlacesStore();
      const { setMap } = useMapStore();


      const initMap = async () => {

        if( !mapElement.value) throw new Error('Div Element no existe');
        if( !userLocation.value) throw new Error('userLocation no existe');

        await Promise.resolve();

        //creando el mapa
        const map = new Mapboxgl.Map({
          container: mapElement.value, // container ID
          style: 'mapbox://styles/mapbox/streets-v10', // style URL
          center: userLocation.value, // starting position [lng, lat]
          zoom: 7 // starting zoom
          });

        //map.scrollZoom.disable();

        //popup
        const myLocationPopup = new Mapboxgl.Popup({ offset: [0,-45] })
          .setLngLat(userLocation.value)
          .setHTML(`
              <p>Las coordenadas de tu ubicación: </p>
              <p>${ userLocation.value }</p>
          `);

        //Localización usuario.
        const myLocationMarker = new Mapboxgl.Marker()
          .setLngLat(userLocation.value)
          .setPopup(myLocationPopup)
          .addTo(map);

        // ***************************************************************************************

        const filterGroup = document.getElementById('filter-group');

        map.on('load', () => {
            // Add a GeoJSON source containing place coordinates and information.
            map.addSource('places', {
            'type': 'geojson',
            'data': places
            });
        
            for (const feature of places.features) {
            const symbol = feature.properties.icon;
            const titulo = feature.properties.label;
            const layerID = `poi-${symbol}`;
            
            // Add a layer for this symbol type if it hasn't been added already.
            if (!map.getLayer(layerID)) {

                  map.addLayer({
                  'id': layerID,
                  'type': 'symbol',
                  'source': 'places',
                  'layout': {
                    'icon-image':`${symbol}-15`,
                    'icon-size':1.5,
                    'icon-allow-overlap': true
                  },
                  'filter': ['==', 'icon', symbol]
                });
            
                //Add checkbox and label elements for the layer.
                const input = document.createElement('input');
                input.type = 'checkbox';
                input.id = layerID;
                input.checked = true;
                filterGroup.appendChild(input);
                
                //insert labels in html
                const label = document.createElement('label');
                label.setAttribute('for', layerID);
                label.textContent = titulo;
                filterGroup.appendChild(label);
                
                // When the checkbox changes, update the visibility of the layer.
                input.addEventListener('change', (e) => {
                    map.setLayoutProperty(layerID, 'visibility',
                    e.target.checked ? 'visible' : 'none'
                    );
                });
              }
            }
        });


        setMap( map );
 
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
.title{
  background-color: #B49F6D;
}
.map-container {
    height: 80vh;
    width: 100%;
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