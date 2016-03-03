import picovico from './picovico'
import { routerStateReducer as router } from 'redux-router'
import { combineReducers } from 'redux'


const rootReducer = combineReducers({
  picovico, 
  router,
})

export default rootReducer
