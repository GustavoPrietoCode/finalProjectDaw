// export const myAction = async ({ commit })=> {}

import journalApi from "@/api/journalApi"


export const loadEntries = async ( { commit } )=> {

    const { data } = await journalApi.get('/entries.json')
    //la data llega como un objeto 
    //console.log(data)
    
    //da error al cargar la página, si no hay entradas
    if ( !data ) {
        commit('setEntries', [])
        return
    }

    const entries = []
    for( let id of Object.keys( data )){
        entries.push({
            id,
            ...data[id]
        })
    }
    commit('setEntries', entries) //llamo a la mutación

}

export const updateEntry = async ( { commit }, entry)=> {
    //Extraer solo lo que necesitan -id  -  console.log(entry, 'actions')
    const { date, picture, text, title } = entry
    const dataToSave = { date, picture, text, title} //data similar a la que se pone en el postman

    await journalApi.put( `/entries/${ entry.id }.json`, dataToSave)
    //console.log(resp)

    //commit de mutacion -> updateEntry
    commit('updateEntry', {...entry})
}

export const createEntry = async ({ commit }, entry)=> {

    //dataTosave
    const { date, picture, text, title } = entry //es mejorar separarlo para separar la info de "entry"
    const dataToSave = { date, picture, text, title }

    const { data } = await journalApi.post( `entries.json`, dataToSave)

    dataToSave.id = data.name

    commit( 'addEntry', dataToSave )

    return data.name

}

export const deleteEntry = async ({ commit }, id)=> {

    await journalApi.delete( `/entries/${ id }.json`)

    commit('deleteEntry', id)

    return id
}