import { recommendResultTypes } from '../reducer-types'

export const resetResultList = () => (dispatch) => {
  dispatch({type: recommendResultTypes.RESET_RESULT_LIST})
}

export const receiveResultList = (resultList) => (dispatch) => {
  dispatch({type: recommendResultTypes.RECEIVE_RESULT_LIST, resultList})
}

export const receivePureResultList = (resultList) => (dispatch) => {
  dispatch({type: recommendResultTypes.RECEIVE_PURE_RESULT_LIST, resultList})
}

export const receiveRecommedWords = (recommedWords) => (dispatch) => {
  dispatch({type: recommendResultTypes.RECEIVE_RECOMMED_WORDS, recommedWords})
}

export const receiveSubmitWords = (submitWords) => (dispatch) => {
  dispatch({type: recommendResultTypes.RECEIVE_SUBMIT_WORDS, submitWords})
}

export const receiveDiseaseWords = (diseaseWords) => (dispatch) => {
  dispatch({type: recommendResultTypes.RECEIVE_DISEASE_WORDS, diseaseWords})
}

export const toggleMedicinalIsInsuranceCheck = (name) => (dispatch) => {
  dispatch({type: recommendResultTypes.TOGGLE_MEDICINALISINSURANCE_CHECK, name})
}

export const resetFilter = (index) => (dispatch) => {
  dispatch({type: recommendResultTypes.RESET_FILTER})
}

export const toggleRecommendCheck = (index) => (dispatch) => {
  dispatch({type: recommendResultTypes.TOGGLE_RECOMMEND_CHECK, index})
}

export const updatePage = (page) => (dispatch) => {
  dispatch({type: recommendResultTypes.UPDATE_PAGE, page})
}

export const updateYyjj = (yyjj) => (dispatch) => {
  dispatch({type: recommendResultTypes.UPDATE_YYJJ, yyjj})
}
export const updateYpcj = (ypcj) => (dispatch) => {
  dispatch({type: recommendResultTypes.UPDATE_YPCJ, ypcj})
}

export const updateJb = (jbName) => (dispatch) => {
  dispatch({type: recommendResultTypes.CHECK_JB, jbName})
}
