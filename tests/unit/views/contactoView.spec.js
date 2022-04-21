import { shallowMount } from '@vue/test-utils'
import Contacto from '@/views/ContactoView'

describe('Pruebas About View', () => {

    let wrapper

    beforeEach(() => {
        wrapper = shallowMount ( Contacto )
    })

    test('Debe de hacer match con el snapshot', () =>{

        expect( wrapper.html() ).toMatchSnapshot()

    })


})