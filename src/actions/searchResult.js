import { searchResultTypes } from '../reducer-types'

export const resetResultList = () => (dispatch) => {
  dispatch({type: searchResultTypes.RESET_RESULT_LIST})
}

export const receiveResultList = (resultList) => (dispatch) => {
  dispatch({type: searchResultTypes.RECEIVE_RESULT_LIST, resultList})
}

export const receivePureResultList = (resultList) => (dispatch) => {
  dispatch({type: searchResultTypes.RECEIVE_PURE_RESULT_LIST, resultList})
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

export const updateYpcj = (ypcj) => (dispatch) => {
  dispatch({type: searchResultTypes.UPDATE_YPCJ, ypcj}) //medicinalManufacturingEnterprise
}

export const updateYpjj = (yyjj) => (dispatch) => {
  dispatch({type: searchResultTypes.UPDATE_YYJJ, yyjj}) //medicinalManufacturingEnterprise
}

export default {
  resetResultList,
  receiveResultList,
  receiveContraindicationWords,
  toggleContraindicationCheck,
  toggleMedicinalIsInsuranceCheck,
  resetFilter
}
