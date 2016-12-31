import { favoritesTypes } from '../reducer-types'

export const resetResultList = () => (dispatch) => {
  dispatch({type: favoritesTypes.RESET_RESULT_LIST})
}

export const receiveResultList = (resultList) => (dispatch) => {
  dispatch({type: favoritesTypes.RECEIVE_RESULT_LIST, resultList})
}
