<template>
    <div class="searchbar-container">
        <input 
            class="form-control"
            type="text"
            placeholder="Buscar lugares..."
            v-model="searchTerm"
            />

        <SearchResults />


    </div>
</template>


<script>
import { computed,ref } from 'vue';
import SearchResults from "@/modules/map/components/searchResults/SearchResults.vue";

import { usePlacesStore } from "@/modules/map/composables/usePlacesStore";

export default {
    name: 'SearchBar',
    components: { SearchResults },
    setup(){

        const debounceTimeout = ref();
        const debounceValue = ref('');

        const { searchPlacesByTerm, biblioBuses } = usePlacesStore();

        return {
            debounceValue,
            biblioBuses,

            //buscador
            searchTerm: computed({
                get(){
                    return debounceValue.value;
                },
                set( val ){

                    if( debounceTimeout.value ) clearTimeout( debounceTimeout.value );
                    debounceTimeout.value = setTimeout(() => {
                        debounceValue.value = val;
                        searchPlacesByTerm( val );
                    }, 2000 );
                }
            }),


        }
    },

}
</script>

<style scoped>
.searchbar-container{
    position: relative;
    top:10px;
    left: 30px;
    background-color: white;
    z-index: 999;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2);
    width: 250px;
    border-radius: 10px !important;
    overflow: hidden;
    padding: 5px;
}

.marker {
  background-size: cover;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
}


</style>