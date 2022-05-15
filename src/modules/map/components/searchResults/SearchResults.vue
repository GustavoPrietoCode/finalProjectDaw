<template>

    <div v-if='isLoadingPlaces'
        class="alert alert-primary text-center">
        <h5>Cargando</h5>
        <span>Espere por favor...</span>
    </div>

    <ul v-else-if='places.length > 0'
        class="list-group mt-3">

            <li v-for="place in places"
                :key="place.id"
                class="list-group-item list-group-item-action"
                :class="{ 'active':place.id === activePlace }"
                @click="onPlaceClicked( place )">
                <h5>{{ place.text }}</h5>
                <p>{{ place.place_name }}</p>
            </li>

    </ul>

    <!-- <div>
        <input 
            type="checkbox" 
            id="checkbox"
            v-model="checkbox"
            @change= "setMyMark"
            >
            Bibliobuses
    </div>

    <div>
        <button class="btn btn-outline-primary btn-sm m-2"
            @click="delMyMark"
        >Prueba</button>
    </div> -->


</template>


<script>
import { useMapStore } from '@/modules/map/composables/useMapStore';
import { usePlacesStore } from '@/modules/map/composables/usePlacesStore';
import { ref, watch } from 'vue';

export default {
    name: 'SearchResults',
    data() {
            return {
                checkbox: false,
            };
        },
    setup(){
        const { isLoadingPlaces, places, userLocation } = usePlacesStore();
        const { map, setPlaceMarkers, setMyMark } = useMapStore();
        const activePlace = ref('');


        //marcadores de la búsqueda
        watch( places, (newPlaces) => {
            //console.log(newPlaces);
            activePlace.value = '';
            setPlaceMarkers(newPlaces);
        })

        return {
            isLoadingPlaces, 
            places, 
            userLocation,
            activePlace,

            setMyMark, //ok


            onPlaceClicked: ( place ) => {
                activePlace.value = place.id;
                const [ lng, lat ] = place.center;

                map.value?.flyTo({
                    center: [ lng, lat ],
                    zoom:14,
                })
            },


        } //end return
    },

}
</script>

<style scoped>

li {
    cursor: pointer;
}

h5 {
    font-size: 15px !important;
}

p{
    font-size: 10px;
}

</style>