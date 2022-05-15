/**
 * Mutations. Impactan/cambian el state.
 */

export const setLngLat =  ( state, coords )=> {
    
        //console.log({ coords })
        const { lng, lat } = coords;
        state.userLocation = [ lng, lat ];
        state.isLoading = false;
    }

export const setIsLoadingPlaces = ( state ) =>{
        state.isLoadingPlaces = true;
    }

export const setPlaces = ( state, places ) => {

        state.places = places;
        state.isLoadingPlaces = false;
    }

//FIXME: pruebas
export const setBibliobuses = (state, biblioApi ) => {

    state.bibliobuses = biblioApi;

}
