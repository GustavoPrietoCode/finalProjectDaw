import { useStore } from "vuex"
import { onMounted,computed } from "vue"



export const usePlacesStore = () => {

    const store = useStore();


    onMounted( () => {
        if ( !store.getters['places/isUserLocationReady'] ) {
            store.dispatch('places/getInitialLocation');
        }
    })

    return {
        //state
        isLoading: computed( () => store.state.places.isLoading ),
        userLocation: computed( () => store.state.places.userLocation ),

        //getters
        isUserLocationReady: computed(() => store.getters['places/isUserLocationReady']),
        //actions
        searchPlacesByTerm: ( query = '') => store.dispatch('places/searchPlacesByTerm', query),

        //mutations
    }





}