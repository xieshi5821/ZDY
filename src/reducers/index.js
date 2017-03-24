import { combineReducers } from 'redux'
import routes from './routes'
import recommend from './recommend'
import recommendResult from './recommendResult'
import search from './search'
import searchResult from './searchResult'
import drug from './drug'
import favorites from './favorites'
import xWebView from './xWebView'

export default combineReducers({
  routes,
  recommend,
  recommendResult,
  search,
  searchResult,
  drug,
  favorites,
  xWebView
})
