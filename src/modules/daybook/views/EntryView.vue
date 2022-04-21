<template>
    <template v-if="entry">

        <div class="entry-title d-flex justify-content-between p-2">
            <!-- fecha -->
            <div>
                <span class="text-success fs-3 fw-bold">{{day}}</span>
                <span class="mx-1 fs-3">{{month}}</span>
                <span class="mx-2 fs-4 fw-light">{{ yearDay}}</span>
            </div>
            <!-- botones -->
            <div>
                <!-- input referencia. No show -->
                <input type="file"
                @change='onSelectedImage'
                ref="imageSelector"
                v-show="false"
                accept="image/png, image/jpeg"
                >

                <!-- botón Borrar -->
                <button
                    v-if="entry.id"
                    class="btn btn-danger mx-2"
                    @click="onDeleteEntry">
                    Borrar
                    <i class="fa fa-trash-alt"></i>
                </button>

                <!-- botón subir fotos -->
                <button 
                    class="btn btn-primary"
                    @click="onSelectImage">
                    Subir foto
                    <i class="fa fa-upload"></i>
                </button>
            </div>
        </div>
        <hr> <!-- línea separación -->
        <div class="d-flex flex-column px-3 mb-4">
                <input 
                    v-model= "entry.title"
                    placeholder="Título: ¿Qué pueblo es?">
        </div>

        <div class="d-flex flex-column px-3 h-75">
                <textarea 
                    v-model= "entry.text"
                    placeholder="¿Qué sucedió hoy?">
                </textarea>
        </div>

        <img 
            v-if="entry.picture && !localImage"
            :src="entry.picture"
            alt="entry-picture"
            class="img-thumbnail">

        <img 
            v-if="localImage"
            :src="localImage" 
            alt="entry-picture"
            class="img-thumbnail">
        
    </template>

    <Fab 
        icon="fa-save"
        @on:click="saveEntry"
    />
  
</template>

<script>
import { defineAsyncComponent } from '@vue/runtime-core'
import { mapGetters, mapActions } from "vuex"; // computed!!!
import Swal from 'sweetalert2' //librería de alertas 

import getDayMonthYear from "../helpers/getDayMonthYear";
import uploadImage from "../helpers/uploadImage";

export default {
    name: 'EntryView',
    props: {
        id: {
            type: String,
            required: true
        }
    },
    components: {
        Fab: defineAsyncComponent(() => import('../components/Fab.vue'))
    },
    data(){
        return {
            entry:null,
            localImage: null,
            file: null
        }
    },
    computed: {
        ...mapGetters('journal', ['getEntriesById']),
        
        day() {
            const { day } = getDayMonthYear ( this.entry.date )
            return day
        },
        month() {
            const { month } = getDayMonthYear ( this.entry.date )
            return month
        },
        yearDay() {
            const { yearDay } = getDayMonthYear ( this.entry.date )
            return yearDay
        }
    },
    methods: {
        ...mapActions('journal', ['updateEntry', 'createEntry', 'deleteEntry']),

        loadEntry(){
            
            let entry;

            if ( this.id === 'new') { //si pulsamos al botón crear nueva entrada
                entry = {
                    title: '',
                    text: '',
                    date: new Date().getTime()
                }

            } else {
                entry = this.getEntriesById( this.id )
                if (!entry) return this.$router.push({ name: 'no-entry'})
            }
            this.entry = entry
        },
        async saveEntry(){

            //librería de alertas 
            new Swal({
                title: 'Espere por favor',
                allowOutsideClick: false
            })
            Swal.showLoading()

            //cargar imagen
            const picture = await uploadImage( this.file )
            this.entry.picture = picture

            if ( this.entry.id ) {
                //actualizar
                await this.updateEntry( this.entry )
            } else {
                //crear una nueva entrada
                //console.log('post nuevo')
                const id = await this.createEntry( this.entry )
                this.$router.push({name: 'entry', params: {id: id}}) //redirectTo => 
            }

            this.file = null
            Swal.fire('Guardado', 'Entrada registrada con éxito', 'success') //librería de alertas 
        },
        async onDeleteEntry(){

            const { isConfirmed } = await Swal.fire({
                title: '¿Estás seguro?',
                text: 'Una vez borrado, no se puede recuperar',
                showDenyButton: true,
                confirmButtonText: 'Sí, estoy seguro'
            })

            if( isConfirmed ){
                new Swal({
                    title: 'Espere por favor',
                    allowOutsideClick: false
                })

                Swal.showLoading()

                await this.deleteEntry( this.entry.id )
                this.$router.push({ name: 'no-entry' })

                Swal.fire('Eliminado', '', 'success')
            }
        },
        onSelectedImage( event ) {

            const file = event.target.files[0]
            if( !file ) {
                    this.localImage = null
                    this.file = null
                    return
            }

            this.file = file

            const fr = new FileReader()
            fr.onload = () => this.localImage = fr.result
            fr.readAsDataURL( file )

        },
        onSelectImage() {
            //console.log( this.$refs )
            this.$refs.imageSelector.click() //esto es igual a document.querySelector('input').click()
        }
    },

    created() { //cuando se crea el componente
        // console.log(this.$route.params.id)
        this.loadEntry() //cargarlo cuando el componente se crea.
    },

    watch: {
        id() {
            //console.log({value, oldValue})
            this.loadEntry()
        }
    }
}
</script>

<style lang='scss' scoped>

textarea {
    font-size: 20px;
    border: none;
    height: 90%;

    &:focus{
        outline: none;
    }
}

img {
    width: 200px;
    position: fixed;
    bottom: 150px;
    right: 20px;
    box-shadow: 0px 5px 10px rgba($color: #000000, $alpha: 0.2);
}
</style>