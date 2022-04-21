<template>
    <div class="entry-list-container">

        <!-- BUSCADOR -->
        <div class="px-2 pt-2">
            <input 
                type="text"
                class="form-control"
                placeholder="Busca el pueblo"
                v-model="term"
            />
        </div>

        <!-- BOTÓN NUEVA ENTRADA -->
        <div class="mt-2 d-flex flex-column">
            <button class="btn btn-primary mx-3"
            @click="$router.push({ name: 'entry', params: {id:'new'} })">
                <i class="fa fa-plus-circle"></i>
                Nueva entrada
            </button>
        </div>

        <!-- LISTA DE ENTRADAS -->
        <div class="entry-scrollarea">
            <Entry 
                v-for="entry in entriesByTerm"
                :key="entry.id"
                :entry = "entry"
                />
        </div>
    </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import { mapGetters } from 'vuex'

export default {
    components: {
        Entry: defineAsyncComponent(() => import('./Entry.vue'))
    },
    computed: {
        ...mapGetters ('journal', [ 'getEntriesByTerm' ]),
        entriesByTerm() {
            return this.getEntriesByTerm( this.term )
        }
    },
    data () {
        return {
            term: ''
        }
    }
}
</script>

<style lang="scss" scoped>
input{
    height: 25px;
}

.entry-list-container{
    border-right: px solid #2c3e50;
    height: 100vh;
    /* height: calc(100vh - 50px); */
}

.entry-scrollarea{
    height: calc(100vh - 310px);
    overflow: scroll;
}
</style>