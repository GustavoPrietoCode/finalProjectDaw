/* eslint-disable prettier/prettier */


//https://analisis.datosabiertos.jcyl.es/api/records/1.0/search/?dataset=registro-de-municipios-de-castilla-y-leon&q=&facet=provincia
//https://analisis.datosabiertos.jcyl.es/api/records/1.0/search/?dataset=registro-de-municipios-de-castilla-y-leon&q=&rows=2248&facet=municipio
//https://analisis.datosabiertos.jcyl.es/api/records/1.0/search/?dataset=registro-de-municipios-de-castilla-y-leon&q=&rows=2248&facet=municipio&refine.provincia=VALLADOLID
//https://analisis.datosabiertos.jcyl.es/api/records/1.0/search/?dataset=registro-de-municipios-de-castilla-y-leon&q=&facet=municipio&refine.provincia=VALLADOLID
//https://analisis.datosabiertos.jcyl.es/api/records/1.0/search/?dataset=registro-de-municipios-de-castilla-y-leon&q=&rows=225&facet=municipio&refine.provincia=VALLADOLID


const getPueblosVall = () => {

    const pueblosVall = [];
    fetch(`https://analisis.datosabiertos.jcyl.es/api/records/1.0/search/?dataset=registro-de-municipios-de-castilla-y-leon&q=&rows=225&facet=municipio&refine.provincia=VALLADOLID`)
        .then( resp => resp.json() )
        .then( ({ records }) => {
            records.forEach(e => {
                const municipio = e.fields.municipio;
                pueblosVall.push(municipio)
            });
        })
        .catch( e => console.log(`Ha habido un error: ${e}`))

    console.log(pueblosVall.length)
    return pueblosVall;
};


export default getPueblosVall;