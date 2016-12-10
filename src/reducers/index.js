import { combineReducers } from 'redux'
import routes from './routes'
import recommend from './recommend'
import search from './search'

export default combineReducers({
  routes,
  recommend,
  search
})
