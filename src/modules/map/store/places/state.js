/**
 * State: Donde se almacena la info. Es reactivo
 */

export default () => ({
    isLoading: true,
    userLocation: undefined,
    places: [],
    isLoadingPlaces: false,
    
    bibliobuses: [], //Ok. recibido array de api.

})