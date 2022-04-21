/**
 * Actions: son asincronas. Llegan al backend
 * Las acciones -> "dispatch"
 */
import authApi from "@/api/authApi";

export const createUser = async ({ commit }, user)=> {

    const { name, email, password } = user
    //console.log({name})

    try {

        const { data } = await authApi.post(':signUp', { email, password, returnSecureToke: true })
        const { idToken, refreshToken } = data
        // const idToken = data.idToken // const refreshToken = data.refreshToken
        await authApi.post(':update', { displayName: name, idToken})

        delete user.password //así no aparece el password en consola
        commit('loginUser', { user, idToken, refreshToken })

        return { ok: true }

    } catch (error) {
        console.log(error.response)
        return { ok: false, message: error.response.data.error.message}
    }

}

export const singInUser = async ({ commit }, user)=> {

    const { email, password } = user

    try {

        const { data } = await authApi.post(':signInWithPassword', { email, password, returnSecureToke: true })
        const { idToken, refreshToken, displayName } = data
        user.name = displayName
        commit('loginUser', { user, idToken, refreshToken })

        return { ok: true }

    } catch (error) {
        return { ok: false, message: error.response.data.error.message}
    }

}

export const checkAuth = async ({ commit })=> {

    //se leen los datos del localstorage
    const idToken       = localStorage.getItem( 'idToken')
    const refreshToken  = localStorage.getItem( 'resfreshToken')

    //si el idtoken, se resetea y se sale
    if(!idToken){
        commit('logout')
        return{ ok: false, message: 'No hay token' }
    }

    try {
        
        //si hay idtoken, se verifican los datos
        const { data } = await authApi.post(':lookup', { idToken })
        //console.log(data)
        //de la data vienen los usuarios, el primer usuario es el que interesa
        const { email, displayName } = data.users[0]

        //datos a mandar en el commit
        const user = {
            name: displayName,
            email
        }

        //se envía a la mutación 'loginUser'
        commit('loginUser', { user, idToken, refreshToken })

        return { ok: true }

    } catch (error) {
        commit('logout')
        return{ ok: false, message: error.response.data.error.message }
    }
}