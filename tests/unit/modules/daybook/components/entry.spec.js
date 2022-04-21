import { shallowMount } from "@vue/test-utils";
import Entry from "@/modules/daybook/components/Entry.vue";
import { journalState } from "../../../mock-data/test-journal-state";

describe("Pruebas en Entry Component", () => {

    const mockRouter = {
        push: jest.fn()
    };

    const wrapper = shallowMount(Entry, {
        props: {
            entry: journalState.entries[0]
            },
        global: {
            mocks: {
                $router: mockRouter
            }
        }
    });


    test("debe de hacer match con el snapshot", () => {
        expect(wrapper.html()).toMatchSnapshot();
    });

    test("debe de redireccionar al hacer click en el entry-container", () => {

        const entryContainer = wrapper.find('.entry-container') //busca la clase
        entryContainer.trigger('click') //se dispara el click

        expect( mockRouter.push ).toHaveBeenCalled() //pasa la prueba, pero no es específico

        expect( mockRouter.push ).toHaveBeenCalledWith({
                name: 'entry', 
                params: {
                    id: journalState.entries[0].id //también podría ser... id:expect.any(String)
                }
            })

    });

    test("pruebas en las propiedades computadas", () => {

        //wrapper.vm ---- propiedades computadas
        expect( wrapper.vm.day ).toBe(23)
        expect( wrapper.vm.month ).toBe('Julio')
        expect( wrapper.vm.yearDay ).toBe('2021, Viernes')

        //console.log(wrapper.vm.yearDay)

    });

})