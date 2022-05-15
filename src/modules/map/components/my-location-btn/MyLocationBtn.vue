<template>
  <button v-if="isBtnReady"
    class="btn btn-primary"
    @click="onMyLocationClicked"
   >
   <i class="fas fa-map-marker-alt"></i>
  </button>
</template>

<script >
import { useMapStore } from '@/modules/map/composables/useMapStore';
import { usePlacesStore } from '@/modules/map/composables/usePlacesStore';
import { computed } from 'vue';

export default ({
    name: 'MyLotationBtn',
    setup(){

        const { userLocation, isUserLocationReady } = usePlacesStore();
        const { map, isMapReady  } = useMapStore();

        return{
            //Cuando los dos valores sean true, se mostrará el botón
            isBtnReady: computed(() => isUserLocationReady.value && isMapReady.value),

            onMyLocationClicked: () => {
                map.value?.flyTo({
                    center: userLocation.value,
                    zoom: 8,
                })
            },

        }
    }
});
</script>

<style scoped>

button {
    position: absolute;
    bottom: 250px;
    right: 50px; 
}


</style>
