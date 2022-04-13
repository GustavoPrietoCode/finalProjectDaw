<template>
  <div class="container-fluid bloqueFiltros p-5">

    <div class="container mb-5 ">
      <h2>Ayuda a repoblar tu pueblo</h2>
    </div>

    <!-- BUSCADOR -->
      <div class="px-2 pt-2 mb-5">
          <input 
              type="text"
              class="form-control"
              placeholder="Busca el pueblo"
              v-model="term"
          />
      </div>

    <!-- SELECT -->
    <div class="row align-items-center">
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
    </div>
  
    <!-- LISTA DE ENTRADAS -->
        <div class="entry-scrollarea mt-5">
            <h5>Entradas</h5>
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
import { mapGetters } from "vuex";
//import getPueblosOption from "@/modules/home/helpers/getPueblos";
//console.log(getPueblosOption())

export default {
  name: "BloquesFiltros",
  components: {
        Entry: defineAsyncComponent(() => import('@/modules/daybook/components/Entry.vue'))
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

      };
  },
};
</script>

<style>
.bloqueFiltros {
  background-color: rgba(126, 127, 94);
  color: white;
  height: 35vh;
}
</style>
