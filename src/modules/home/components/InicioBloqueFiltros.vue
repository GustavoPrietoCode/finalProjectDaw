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
    <div class="d-flex mt-5">
        <div class="col">
            <!-- <Entrylist /> -->
        </div>
    </div>

    <div class="d-flex mt-5">
        <div class="col">
            <EntrylistHome />
        </div>
    </div>

  </div>

</template>

<script>
import { defineAsyncComponent } from 'vue'
import { mapActions, mapState, mapGetters } from 'vuex'
//import getPueblosOption from "@/modules/home/helpers/getPueblos";
//console.log(getPueblosOption())

export default {
  name: "BloquesFiltros",
  components: {
        Entry: defineAsyncComponent(() => import('@/modules/daybook/components/Entry.vue')),
        //Entrylist: defineAsyncComponent(() => import('@/modules/daybook/components/EntryList.vue')),
        EntrylistHome: defineAsyncComponent(() => import('@/modules/daybook/components/EntryListHome.vue')),
    },
    methods: {
        ...mapActions('journal', ['loadEntries']),
    },
    computed: {
        ...mapGetters ('journal', [ 'getEntriesByTerm' ]),
        entriesByTerm() {
            return this.getEntriesByTerm( this.term )
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

</style>
