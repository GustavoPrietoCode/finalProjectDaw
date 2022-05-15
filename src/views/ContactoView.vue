<template>
  <div class="cont container-fluid p-4">

    <!-- Encabezado -->
    <div class="row ">
      <div class="col d-flex flex-column text-center my-5">
        <h2>Aquí puedes encontrar otros proyectos:</h2>
      </div>
    </div>

    <!-- proyecto salvaje-->
    <div class="row filas mx-4 mb-4">
      <div class="fila col-12 col-sm-3 d-flex justify-content-center align-items-center">
        <a href="https://www.revistasalvaje.com" target="_blank">
          <img class="m-2" src="@/assets/revistaSalvaje.jpg" alt="Revista Salvaje">
        </a>
      </div>
      <div class="col-12 col-sm-9 d-flex flex-column text-start my-3">
        <h2>Revista Salvaje</h2>
        <p>Salvaje es un proyecto pequeño, pero estamos continuamente buscando nuevos colaboradores que amplíen nuestra red de corresponsales salvajes y nos ayuden a enriquecer las miradas sobre el medio rural. 
          Así que si tienes una idea para un reportaje o cualquier otra forma de colaboración, no dudes en contárnosla. </p>
      </div>
    </div>

    <!-- proyecto jóvenes cyl-->
    <div class="row filas mx-4 mb-4">
      <div class="fila col-12 col-sm-3 d-flex justify-content-center align-items-center">
        <a href="https://www.jovenescyl.org/" target="_blank">
          <img class="m-2" src="@/assets/sembrar-futuro.webp" alt="Revista Salvaje">
        </a>
      </div>
      <div class="col-12 col-sm-9 d-flex flex-column text-start my-3">
        <h2>Jóvenes Castilla y León</h2>
        <p>Jóvenes Castilla y León es una agrupación de más de 100 miembros y miles de seguidores en redes sociales que se 
          conformó en octubre de 2019 con el objetivo de dar visibilidad a la despoblación, emigración juvenil, 
          envejecimiento y falta de oportunidades laborales en su comunidad. La organización está estructurada en varios 
          grupos que trabajan en proyectos más concretos: organización interna, comunicación, argumentario y activismo.</p>
      </div>
    </div>

    <!-- proyecto codinse-->
    <div class="row filas mx-4 mb-4">
      <div class="fila col-12 col-sm-3 d-flex justify-content-center align-items-center">
        <a href="https://codinse.com/" target="_blank">
          <img class="m-2" src="@/assets/codinse_logo.jpg" alt="Revista Salvaje">
        </a>
      </div>
      <div class="col-12 col-sm-9 d-flex flex-column text-start my-3">
        <h2>Codinse</h2>
        <p>CODINSE, la coordinadora para el desarrollo integral del Nordeste de Segovia, nace en el año 1992 gracias al esfuerzo 
          de muchas personas convencidas de que es posible vivir en esta comarca con la mayor dignidad posible. Actuaciones 
          conjuntas, Revista “Ejido”, Fiestas Comarcales, la Federación de Asociaciones “Tierra Nuestra”, fueron sembrando el 
          sentimiento de comarca que dura hasta hoy y madura día a día.</p>
      </div>
    </div>

    <!-- proyecto vente a vivir a un pueblo-->
    <div class="row filas mx-4 mb-4">
      <div class="fila col-12 col-sm-3 d-flex justify-content-center align-items-center">
        <a href="https://venteaviviraunpueblo.com/" target="_blank">
          <img class="m-2" src="@/assets/venteaviviralpueblo.png" alt="Revista Salvaje">
        </a>
      </div>
      <div class="col-12 col-sm-9 d-flex flex-column text-start my-3">
        <h2>Vente a vivir a un pueblo</h2>
        <p>Somos una plataforma que da información sobre la vida que se puede encontrar en un pueblo. 
          Queremos demostrar que los pueblos son mucho más que un sitio de vacaciones o un lugar en medio de un mapa. 
          Tienen servicios e infraestructuras que facilitan y mejoran enormemente la vida. 
          En un pueblo muchos encontraran mejor calidad de vida, un entorno más saludable y una mejora económica al 
          reducirse enormemente los gastos que se tienen en una ciudad. Con toda la información que encontrarás 
          en www.venteaviviraunpueblo.com ya es más fácil tomar la decisión de irse a vivir a un pueblo para aquellos 
          que quieran teletrabajar, emprender o coger el traspaso de un negocio, por ejemplo.</p>
      </div>
    </div>

  </div>

  <Footer />
</template>

<script>
import { defineAsyncComponent } from 'vue';

export default ({
  name: "Otros proyectos",
  components: {
    Footer: defineAsyncComponent(() => import(/* webpackChunkName: "Navbar" */'@/shared/components/Footer.vue')),
  },
  setup() {
    
  },
})
</script>


<style scoped>

.cont{
  background-color: #7E7F5E;
  color:white;
  width: 100%;
}

.filas {
  border: 1px solid #12403F;
  border-radius: 10px;
}

img{
  border:1px solid white ;
  max-width: 150px;
  max-height: 150px;
}

</style>
