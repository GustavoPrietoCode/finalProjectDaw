import { createApp } from 'vue'
import App from './App.vue'
import router from "./router/router"
import store from './store'

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.js"
import "./styles/styles.scss"

import mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"
mapboxgl.accessToken = 'pk.eyJ1Ijoia3ViZWd1cyIsImEiOiJjbDIzZjBoaWwwbzVmM2NtbXQxazNkd3B2In0.zjSudGd-Y1aJRkt6sgsiTw';

if ( !navigator.geolocation ){
    alert('tu navegador no soporta el Geolocation')
    throw new Error ('tu navegador no soporta el Geolocation');
}

createApp(App)
    .use( store )
    .use(router)
    .mount('#app')

