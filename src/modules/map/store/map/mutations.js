/**
 * Mutations. Impacta en el state.
 */
import Mapboxgl from 'mapbox-gl';


export const setMap =  ( state, map )=> {

    state.map = map;
}

export const setPlaceMarkers = ( state, places ) => {

    // borrar marcadores
    state.markers.forEach( marker => marker.remove() );
    state.markers = [];

    if( !state.map ) return;

    // Crear nuevos marcadores
    for ( const place of places ) {

        const [ lng, lat ] = place.center;

        //creando el mapa
        const popup = new Mapboxgl.Popup({ offset: [0,-45] })
                .setLngLat( [ lng, lat ] )
                .setHTML(`
                    <h4>${ place.text }</h4>
                    <p>${ place.place_name }</p>
                `);

            //marcadores
            const marker = new Mapboxgl.Marker()
                .setLngLat([ lng, lat ] )
                .setPopup(popup)
                .addTo(state.map);

            state.markers.push( marker );

    }
}

//FIXME: marcasFicticias
export const setMyMark = ( state ) => {

    if( !state.map ) return;

    //DATOS DE LA API
    // const biblioApi = getBibliobusesAsync();
    // console.log(biblioApi);

    // for ( const place of biblioApi ) {

        // const [ lng, lat ] = place.posicion;
        // const misMarkador = new Mapboxgl.Marker()
        //         .setLngLat([ lng, lat ] )
        //         .addTo(state.map);
        // state.misBiblios.push( misMarkador );

        // const provincias = place.provincias;

        // state.misProvincias.push(provincias);

    // }

    const arrayFicticio = [
        [-4.10666579811, 41.2979034286],
        [-5.40966710781, 40.4106418799],
        [-4.837216, 40.783077],
        [-4.9693283527, 41.0465553369],
        [-4.9543738845,41.0011669448],
    ];

     arrayFicticio.forEach(e => {

        const [ lng, lat ] = e;

        const popup = new Mapboxgl.Popup({ offset: [0,-45] })
                .setLngLat( [ lng, lat ] )
                .setHTML(`
                    <h4>Bibliobus</h4>
                `);

        const misMarkadoresFiccion = new Mapboxgl.Marker()
                .setLngLat([ lng, lat ] )
                .setPopup(popup)
                .addTo(state.map);

        state.mymarker = misMarkadoresFiccion;

     }) 
}


export const delMyMark = ( state ) => {

    state.mymarker.remove();
    //state.mymarker = [];

}