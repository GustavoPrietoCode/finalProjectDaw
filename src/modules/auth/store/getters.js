/**
 * Getters: leen el state y traen la info que necesito.
 */

// export const myGetter =  ( state )=> { return state }

export const currentState  =  ( state )=> {
 return state.status
}

export const username  =  ( state )=> {
    return state.user?.name || ''  //si existe, me devuelve el name, si no, devuelve string vacío
   }