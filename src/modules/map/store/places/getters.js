/**
 * Getters: leen el state y traen la info que necesito.
 */

export const isUserLocationReady =  ( state )=> {
    return !!state.userLocation;
}