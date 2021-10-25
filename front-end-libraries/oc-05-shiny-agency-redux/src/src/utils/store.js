import { combineReducers, createStore } from 'redux'
import themeReducer from '../features/theme'
import freelancesReducer from '../features/freelances'
import surveyReducer from '../features/survey'
import freelanceReducer from '../features/freelance'

// // Connecter les reduxDevtools
// // si fonction disponible sur objet window existe elle est exécutée
const reduxDevtools =
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()


// // combineReducer permet de faire fontionner pluesieurs reducers ensemble
const reducer = combineReducers({
    theme: themeReducer,
    freelances: freelancesReducer,
    survey: surveyReducer,
    freelance: freelanceReducer,
})

// // Créer le store en incluant le reducer et les reduxDevTools 
// // (pas besoin de state initial car déjà inséré dans les reducers)
const store = createStore(reducer, reduxDevtools)

export default store