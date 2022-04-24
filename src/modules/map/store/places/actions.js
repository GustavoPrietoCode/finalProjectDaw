/**
 * Actions: son asincronas. Llegan al backend
 */


export const getInitialLocation = async ({ commit })=> {
    navigator.geolocation.getCurrentPosition(
        ({ coords } ) => commit('setLngLat', { lng: coords.longitude, lat: coords.latitude }),
        ( err ) => {
            console.error(err);
            throw new Error ('No geolocation :( ');
        },
    )
}