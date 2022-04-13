// export const myAction =  ( state )=> {}


export const setEntries =  ( state, entries )=> {

    //crea un nuevo array con los valores que hay y las nuevas entradas
    state.entries = [ ...state.entries, ...entries ]
    state.isLoading = false //aquí ya tengo la info, y puedo dejar en 'false'.
}


export const updateEntry =  ( state, entry )=> {

    //state.entries -> un arreglo...
    const idx = state.entries.map( e=> e.id ) //array con los ids del store.
                            .indexOf( entry.id)
    //console.log("índice: " + idx)
    state.entries[idx] = entry
}

export const addEntry =  ( state, entry )=> {

    //colocar al principio del array la entrada nueva que recibimos...
    state.entries = [ entry, ...state.entries ]

}

export const deleteEntry =  ( state, id )=> {

    //se crea un nuevo array excepto con la entrada con el id que se borra
    state.entries = state.entries.filter( entry => entry.id !== id)

}