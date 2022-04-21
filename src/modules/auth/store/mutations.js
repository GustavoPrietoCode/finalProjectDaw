/**
 * Mutations. Impacta en el state.
 * Son sincronas
 */
// export const myAction =  ( state )=> {

// }

export const loginUser =  ( state, {user, idToken, resfreshToken} )=> {

    if ( idToken) {
        localStorage.setItem( 'idToken', idToken )
        state.idToken = idToken
    }

    if ( resfreshToken) {
        localStorage.setItem( 'resfreshToken', resfreshToken )
        state.resfreshToken = resfreshToken
    }

    state.user = user
    state.status = 'authenticated'

}

export const logout = ( state ) => {
    state.user = null
    state.idToken = null
    state.resfreshToken = null
    state.status = 'not-authenticate'

    localStorage.removeItem('idToken')
    localStorage.removeItem('refreshToken')
}