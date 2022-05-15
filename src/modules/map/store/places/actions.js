/**
 * Actions: son asincronas. Llegan al backend.
 * Las Actions no cambian el state, solo las mutations.
 */
 import Mapboxgl from 'mapbox-gl';
 import searchApi from "@/api/searchApi";

export const getInitialLocation = async ({ commit })=> {
    navigator.geolocation.getCurrentPosition(
        ({ coords } ) => commit('setLngLat', { lng: coords.longitude, lat: coords.latitude }),
        ( err ) => {
            console.error(err);
            throw new Error ('No geolocation :( ');
        },
    );
}

export const searchPlacesByTerm = async ( { commit, state }, query )=> {

    if( query.length === 0 ){
        commit('setPlaces', []);
        return[];
    }

    if( !state.userLocation ) {
        throw new Error('No hay ubicación dle usuario');
    }

    commit('setIsLoadingPlaces');

    const resp = await searchApi.get(`/${query}.json`, {
        params: {
            proximity: state.userLocation?.join(',') //las uno separadas por una coma.
        }
    });

    //console.log(resp.data.features);
    commit('setPlaces', resp.data.features);

    return resp.data.features;

}

//OK rellena el state.bibliobuses
export const getBibliosFromApi = async ({ commit, state } ) => {

    const response = await fetch("https://analisis.datosabiertos.jcyl.es/api/records/1.0/search/?dataset=bibliotecas-bibliobuses-y-puntos-de-servicio-movil-geolocalizados&q=&rows=6&facet=provincia&facet=tipo");
    const data = await response.json();
    const biblioApi = data.records;

    const biblioApi2 = [];
    //console.log(biblioApi2)

    biblioApi.forEach(e => {
            const [ lat, lng ] = e.fields.posicion;

            const miBiblioApi = new Mapboxgl.Marker()
                .setLngLat([ lng, lat ] )
                .addTo(state.map);

            biblioApi2.push(miBiblioApi);
        });

    commit('setBibliobuses', biblioApi2 );
    //return biblioApi2;
}
