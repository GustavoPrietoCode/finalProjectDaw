/**
 * State: Donde se almacena la info. Es reactivo
 */

export default () => ({
    status:'authenticating',
    user:null,
    idToken: null,
    refreshToken: null
})