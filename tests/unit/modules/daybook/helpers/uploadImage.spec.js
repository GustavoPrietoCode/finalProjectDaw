import 'setImmediate'
import cloudinary from 'cloudinary'
import axios from 'axios'

import uploadImage from '@/modules/daybook/helpers/uploadImage'

/**
 * Configuración cloudinary. 
 * Sirve para borrar los archivos que se crean en la prueba
 */ 
cloudinary.config({
    cloud_name: 'dgzv31nmg',
    api_key: '527839835342914',
    api_secret: 'ENyQkViC9Qckr8w2zQU6R6b9mws'
})

describe('Pruebas en el uploadImage ', () => {

    test('debe de cargar un archivo y retornar el url', async( done ) => {
        
        const { data } = await axios.get('https://res.cloudinary.com/dgzv31nmg/image/upload/v1649757996/d65cj4yl6ornjxhlzqx6.jpg', {
            responseType: 'arraybuffer'
        })

        const file = new File([ data ], 'foto.jpg')
        const url = await uploadImage( file ) //sube la imagen a cloudinary
        expect( typeof url ).toBe('string')


        /**
         *  Tomar el ID para borrarlo en Cloudinary
         */
        const segments = url.split('/') //crea un array con todas las partes del url, para encontrar el ID
        const imageId = segments[ segments.length - 1 ].replace('.jpg','')
        //console.log({imageId}) //muestra el ID de la img

        //borra la imagen subida en el test
        cloudinary.v2.api.delete_resources( imageId, {}, () => {
            done()
        })

        
    })

})