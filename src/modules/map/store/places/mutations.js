/**
 * Mutations. Impacta/cambia el state.
 */
export const setLngLat =  ( state, coords )=> {
    
        //console.log({ coords })
        const { lng, lat } = coords;
        state.userLocation = [ lng, lat ];
        state.isLoading = false;
    }
