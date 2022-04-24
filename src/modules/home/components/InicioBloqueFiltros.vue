<template>
  <div class="container-fluid bloqueFiltros p-5">

    <div class="container mb-5 d-flex justify-content-center">
      <h2>Ayuda a repoblar tu pueblo</h2>
    </div>

    <!-- SELECT -->
<!--     <div class="row align-items-center">
      <div class="col-3"></div>
      <div class="col-3">
        <select class="form-select" v-model="selectedA">
          <option v-for="option in optionsA" :value="option.value" :key="option.text">
            {{ option.text }}
          </option>
        </select>
      </div>
      <div class="col-3">
        <select class="form-select" v-model="selectedB">
          <option v-for="option in optionsB" :value="option.value" :key="option.text">
            {{ option.text }}
          </option>
        </select>
      </div>
      <div class="col-3"></div>
    </div> -->

    <!-- LISTA DE ENTRADAS -->
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
            <div class="d-flex flex-row justify-content-center mx-5">
                    <EntryHome
                    class="card entry-scrollarea mx-5"
                    v-for="entry in entriesByTerm"
                    :key="entry.id"
                    :entry = "entry"
                    />
            </div>
        </div>
    </div>

  </div>

</template>

<script>
import { defineAsyncComponent } from 'vue'
import { mapActions, mapGetters } from 'vuex'
//import getPueblosOption from "@/modules/home/helpers/getPueblos";
//console.log(getPueblosOption())

export default {
  name: "BloquesFiltros",
  components: {
      EntryHome: defineAsyncComponent(() => import('@/modules/daybook/components/EntryHome.vue'))
    },
    methods: {
        ...mapActions('journal', ['loadEntries']),
    },
    computed: {
        ...mapGetters ('journal', [ 'getEntriesByTerm' ]),
        entriesByTerm() {
            return this.getEntriesByTerm( this.term ).slice(0, 3)
        }
    },
    data() {
      return {
        term: '',
        selectedA: "A",
        optionsA: [
          { text: "Elige la ciudad", value: "A" },
          { text: "Valladolid", value: "Valladolid" },
          { text: "León", value: "León" },
          { text: "Zamora", value: "Zamora" },
          { text: "Salamanca", value: "Salamanca" },
          { text: "Ávila", value: "Ávila" },
          { text: "Segovia", value: "Segovia" },
          { text: "Soria", value: "Soria" },
          { text: "Burgos", value: "Burgos" },
          { text: "Palencia", value: "Palencia" },
        ],
        selectedB: "A",
        optionsB: [
          { text: "Elige la ciudad", value: "A" },
          { text: "Valladolid", value: "Valladolid" },
        ],

      }
  },
  created() {
        this.loadEntries()
    }
};
</script>

<style scoped>
.bloqueFiltros {
  background-color: rgba(126, 127, 94);
  color: white;
}

input{
    height: 25px;
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
