import { createStore } from 'vuex'

import journal from "../modules/daybook/store/journal";
import auth from "../modules/auth/store/";
import PlacesState from "../modules/map/store/places/";

const store = createStore({
    modules: {
        auth,
        journal,
        places: PlacesState,
    }
})

export default store