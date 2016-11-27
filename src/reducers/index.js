import { combineReducers } from 'redux'
import routes from './routes'
import recommend from './recommend'

export default combineReducers({
  routes,
  recommend
})
