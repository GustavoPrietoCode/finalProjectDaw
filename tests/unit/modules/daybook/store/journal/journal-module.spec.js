import { createStore } from 'vuex'
import journal from '@/modules/daybook/store/journal'
import { journalState } from '../../../../mock-data/test-journal-state'


//recrea el store tal como está en la app
const createVuexStore = ( initialState ) => 
    createStore({
        modules: {
            journal: {
                ...journal,
                state: { ...initialState } //recrea el state en sus estado inicial
            }
        }
    })

describe('Vuex - Pruebas en el Journal Module', () => {

     // Basicas ==================
     test('este es el estado inicial, debe de tener este state', () => {
        
        //crea el store
        const store = createVuexStore( journalState )
        //desestructura el objeto
        const { isLoading, entries } = store.state.journal
        
        expect( isLoading ).toBeFalsy()
        expect( entries ).toEqual( journalState.entries )
    })

     // Mutations ==================
     test('mutation: setEntries', () => {
        
        //estado inicial de la app
        const store = createVuexStore({ isLoading: true, entries: [] })

        //Insertar entries: ruta del modulo + las entradas del mock, que son 2
        store.commit('journal/setEntries', journalState.entries )
        expect( store.state.journal.entries.length ).toBe(2)
        
        //Insertar entries: vuelves a llamar a las entries, por lo que suman 4
        store.commit('journal/setEntries', journalState.entries )
        expect( store.state.journal.entries.length ).toBe(4)
        
        expect( store.state.journal.isLoading ).toBeFalsy()
    })

    test('mutation: updateEntry', () => {
        
        //crear store con entries
        const store = createVuexStore( journalState )

        const updatedEntry = {
            id: '-MfKM3yA5ij3hnmLFfqv',
            date : 1627077227978,
            text : 'Hola mundo desde mock data'
        }

        //commit de la mutación, se dispara la mutación
        store.commit('journal/updateEntry', updatedEntry )

        const storeEntries = store.state.journal.entries
        //console.log(storeEntries)

        //No pueden ser mas de 2 entradas
        expect( storeEntries.length ).toBe(2)
        expect( 
            storeEntries.find( e => e.id === updatedEntry.id )
        ).toEqual( updatedEntry )
        
    })

    // Delete
    test('mutation: addEntry deleteEntry', () => {
        
        const store = createVuexStore( journalState )

        store.commit('journal/addEntry', { id: 'ABC-123', text: 'Hola Mundo' })
        
        const stateEntries = store.state.journal.entries

        expect( stateEntries.length ).toBe(3)
        expect( stateEntries.find( e => e.id === 'ABC-123' ) ).toBeTruthy()

        //delete
        store.commit('journal/deleteEntry', 'ABC-123')
        expect( store.state.journal.entries.length ).toBe(2)
        expect( store.state.journal.entries.find( e => e.id === 'ABC-123' ) ).toBeFalsy()

    })

     // Getters ==================
     test('getters: getEntriesByTerm getEntryById', () => {
        
        const store = createVuexStore( journalState )

        //console.log( store.getters['journal/getEntriesByTerm']) //[Function (anonymous)]
        //console.log( store.getters['journal/getEntriesByTerm'](''))

        expect( store.getters['journal/getEntriesByTerm']('').length ).toBe(2)
        //busca el término "segunda" en alguna entrada
        expect( store.getters['journal/getEntriesByTerm']('segunda').length ).toBe(1)

        //estas pruebas son más específicas
        const [ entry1, entry2 ] = journalState.entries //desestructura las entradas
        expect( store.getters['journal/getEntriesByTerm']('segunda') ).toEqual([ entry2 ])
        expect( store.getters['journal/getEntriesById']('-MfKM3yA5ij3hnmLFfqv') ).toEqual( entry1 )

    })

    // Actions ==================
    test('actions: loadEntries', async() => {
        
        //estado inicial de la app
        const store = createVuexStore({ isLoading: true, entries: [] })

        //tarea asincrona, tal como está en el actions
        await store.dispatch('journal/loadEntries')

        expect( store.state.journal.entries.length ).toBe(2) //hay 2 entradas en firebase-BBDD

    })


    test('actions: updateEntries', async() => {
        
        const store = createVuexStore( journalState )

        const updatedEntry = {
            id: '-MfKM3yA5ij3hnmLFfqv',
            date : 1627077227978,
            text : 'Hola mundo desde mock data',
            otroCampo: true, //esto es para la prueba
            otroMas: { a: 1}//esto es para la prueba
        }

        await store.dispatch('journal/updateEntries', updatedEntry )

        expect( store.state.journal.entries.length ).toBe(2)
        expect( 
            store.state.journal.entries.find( e => e.id === updatedEntry.id )
        ).toEqual({
            id: '-MfKM3yA5ij3hnmLFfqv',
            date : 1627077227978,
            text : 'Hola mundo desde mock data',
        })


    })

    test('actions: createEntry deleteEntry', async() => {
        
        const store = createVuexStore( journalState )

        const newEntry = { date: 1627077227978, text: 'Nueva entrada desde las pruebas' }

        const id = await store.dispatch('journal/createEntries', newEntry )

        //el ID debe de ser un string
        expect( typeof id ).toBe('string')

        //nueva entrada debe de existir en el state.journal.entries
        expect(
            store.state.journal.entries.find( e => e.id === id  )
        ).toBeTruthy()

        //#segunda parte
        //dispatch deleteEntry
        await store.dispatch('journal/deleteEntry', id )
        
        expect(
            store.state.journal.entries.find( e => e.id === id  )
        ).toBeFalsy()
    

    })

})