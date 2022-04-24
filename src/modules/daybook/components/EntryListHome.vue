<template>
    <div class="entry-list-container">

        <!-- BUSCADOR -->
        <div class="container mb-5 buscador">
            <div class="px-2 pt-2">
                <h4>Mira lo que han dicho de tu pueblo...</h4>
                <input 
                    type="text"
                    class="form-control"
                    placeholder="Busca el pueblo"
                    v-model="term"
                    />
            </div>
        </div>
        

        <!-- LISTA DE ENTRADAS -->
        <div class="container">
            <div class="d-flex flex-row mx-5">
                    <EntryHome
                    class="card entry-scrollarea mx-5"
                    v-for="entry in entriesByTerm"
                    :key="entry.id"
                    :entry = "entry"
                    />
            </div>
        </div>
    </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import { mapGetters } from 'vuex'

export default {
    components: {
        EntryHome: defineAsyncComponent(() => import('./EntryHome.vue'))
    },
    computed: {
        ...mapGetters ('journal', [ 'getEntriesByTerm' ]),
        entriesByTerm() {
            return this.getEntriesByTerm( this.term ).slice(0, 3)
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
    height: 40px;
}

.buscador {
    width: 50%;
}
.entry-list-container{
    border-right: px solid #2c3e50;
    height: calc(100vh - 56px);
}

.entry-scrollarea{
    color: #000;
    width: auto;
    height: auto;
}
</style>