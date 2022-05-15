import { useStore } from 'vuex';
import { computed } from 'vue';


export const useMapStore = () => {

    const store = useStore();

    return {
        map: computed(() => store.state.map.map ),
        duration: computed(() => store.state.map.duration),

        //Getters
        isMapReady: computed(() => store.getters['map/isMapReady']),

        //Mutations
        setMap: ( map = '' ) => store.commit('map/setMap', map),
        setPlaceMarkers: ( places ) => store.commit('map/setPlaceMarkers', places ),

        setMyMark: () => store.commit('map/setMyMark'),
        delMyMark: () => store.commit('map/delMyMark'),
    }
}