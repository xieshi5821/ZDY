import { combineReducers } from 'redux'
import routes from './routes'
import root from './root'
import recommend from './recommend'

export default combineReducers({
  routes,
  root,
  recommend
})
