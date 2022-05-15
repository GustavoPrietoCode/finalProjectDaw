import { useStore } from "vuex"
import { onMounted,computed } from "vue"



export const usePlacesStore = () => {

    const store = useStore();

    onMounted( () => {
        if ( !store.getters['places/isUserLocationReady'] ) {
            store.dispatch('places/getInitialLocation');
        };

        ////FIXME: pruebas
        if ( !store.getters['places/bibliobuses'] ) {
            store.dispatch('places/getBibliosFromApi'); //action
        };

    })

    return {
        //state
        isLoading: computed( () => store.state.places.isLoading ),
        userLocation: computed( () => store.state.places.userLocation ),
        places: computed(() => store.state.places.places),
        isLoadingPlaces: computed(() => store.state.places.isLoadingPlaces),
        biblioBuses: computed(() => store.state.places.biblioBuses), //FIXME: pruebas

        //commits
        setBiblioApi: () => store.commit('places/setBibliobuses'),//FIXME: pruebas
        
        //getters
        isUserLocationReady: computed(() => store.getters['places/isUserLocationReady']),
        getterBiblioApi: computed(() => store.getters['getterBiblioApi']),//FIXME: pruebas

        //actions
        searchPlacesByTerm: ( query = '') => store.dispatch('places/searchPlacesByTerm', query),

    }
}