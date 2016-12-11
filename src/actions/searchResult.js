import { searchResultTypes } from '../reducer-types'

export const resetResultList = () => (dispatch) => {
  dispatch({type: searchResultTypes.RESET_RESULT_LIST})
}

export const receiveResultList = (resultList) => (dispatch) => {
  dispatch({type: searchResultTypes.RECEIVE_RESULT_LIST, resultList})
}

export const receiveContraindicationWords = (contraindicationWords) => (dispatch) => {
  dispatch({type: searchResultTypes.RECEIVE_CONTRAINDICATION_WORDS, contraindicationWords})
}

export const toggleContraindicationCheck = (index) => (dispatch) => {
  dispatch({type: searchResultTypes.TOGGLE_CONTRAINDICATION_CHECK, index})
}

export const toggleMedicinalIsInsuranceCheck = (name) => (dispatch) => {
  dispatch({type: searchResultTypes.TOGGLE_MEDICINALISINSURANCE_CHECK, name})
}

export const resetFilter = (index) => (dispatch) => {
  dispatch({type: searchResultTypes.RESET_FILTER})
}

export const toggleStarCheck = (level) => (dispatch) => {
  dispatch({type: searchResultTypes.TOGGLE_STAR_CHECK, level})
}
