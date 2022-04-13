import axios from "axios";

const uploadImage = async ( file ) => {
    
    //si no hay datos, retorna sin más
    if( !file ) return

    try {
        //objeto de JS nativo FormData
        const formData = new FormData()
        //valores presonalizados de Cloudinary (doc: Uploading with a direct call to the REST API)
        formData.append('upload_preset', 'curso-vue')
        formData.append('file', file)

        //url probada en postman
        const url = 'https://api.cloudinary.com/v1_1/dgzv31nmg/image/upload'

        const { data } = await axios.post(url, formData)
        //console.log(data)

        return data.secure_url
        
    } catch (e) {
        console.error('Error al cargar la imagen, revisar logs')
        console.log(e)
        return null
    }

}

export default uploadImage