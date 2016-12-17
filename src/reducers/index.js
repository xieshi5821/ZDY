import { combineReducers } from 'redux'
import routes from './routes'
import recommend from './recommend'
import search from './search'
import searchResult from './searchResult'
import drug from './drug'

export default combineReducers({
  routes,
  recommend,
  search,
  searchResult,
  drug
})
