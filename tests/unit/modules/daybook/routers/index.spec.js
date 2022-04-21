import daybookRouter from '@/modules/daybook/router'

//test('', () => {})

describe('Pruebas router del Daybook', () => { 

    test('el router debe de tener esta configuración', async () => {

        //console.log(daybookRouter)

        /**
         * Se espera que el objeto esté de esta manera, si cambia, dará error
         * Importa el orden.
         */
        expect( daybookRouter ).toMatchObject({
            name: 'daybook',
            component: expect.any( Function ),
            children: [
                {
                    path: '',
                    name: 'no-entry',
                    component: expect.any( Function ),
                },
                {
                    path: ':id',
                    name: 'entry',
                    component: expect.any( Function ),
                    props: expect.any( Function )
                }
            ]
        })

        //console.log( (await daybookRouter.children[0].component()).default.name )
        //expect( (await daybookRouter.children[0].component()).default.name  ).toBe('NoEntrySelected')
        //expect( (await daybookRouter.children[1].component()).default.name  ).toBe('EntryView')
        
        //En este caso, se comprueban las rutas, y da igual el orden en el que esten.
        const promiseRoutes = []
        daybookRouter.children.forEach( child => promiseRoutes.push( child.component() ) )
        const routes = ( await Promise.all( promiseRoutes ) ).map( r => r.default.name )
        //console.log(routes)

        expect( routes ).toContain('EntryView')
        expect( routes ).toContain('NoEntrySelected')

    })

    
    test('debe de retornar el id de la ruta', () => {
        
        const route = {
            params: {
                id: 'ABC-123'
            }
        }

        //console.log( daybookRouter.children[1].props( route ) )

        //De esta manera queda muy rígida la prueba.
        //expect( daybookRouter.children[1].props( route ) ).toEqual({ id: 'ABC-123' })

        const entryRoute = daybookRouter.children.find( route => route.name === 'entry' )
        //console.log(entryRoute)

        expect( entryRoute.props( route ) ).toEqual({ id: 'ABC-123' })
    })



})