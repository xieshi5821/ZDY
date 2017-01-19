import { recommendResultTypes } from '../reducer-types'

export const resetResultList = () => (dispatch) => {
  dispatch({type: recommendResultTypes.RESET_RESULT_LIST})
}

export const receiveResultList = (resultList) => (dispatch) => {
  dispatch({type: recommendResultTypes.RECEIVE_RESULT_LIST, resultList})
}

export const receiveRecommedWords = (recommedWords) => (dispatch) => {
  dispatch({type: recommendResultTypes.RECEIVE_RECOMMED_WORDS, recommedWords})
}

export const receiveSubmitWords = (submitWords) => (dispatch) => {
  dispatch({type: recommendResultTypes.RECEIVE_SUBMIT_WORDS, submitWords})
}

export const receiveContraindicationWords = (contraindicationWords) => (dispatch) => {
  dispatch({type: recommendResultTypes.RECEIVE_CONTRAINDICATION_WORDS, contraindicationWords})
}

export const toggleContraindicationCheck = (index) => (dispatch) => {
  dispatch({type: recommendResultTypes.TOGGLE_CONTRAINDICATION_CHECK, index})
}

export const toggleMedicinalIsInsuranceCheck = (name) => (dispatch) => {
  dispatch({type: recommendResultTypes.TOGGLE_MEDICINALISINSURANCE_CHECK, name})
}

export const resetFilter = (index) => (dispatch) => {
  dispatch({type: recommendResultTypes.RESET_FILTER})
}

export const toggleStarCheck = (level) => (dispatch) => {
  dispatch({type: recommendResultTypes.TOGGLE_STAR_CHECK, level})
}

export const toggleRecommendCheck = (index) => (dispatch) => {
  dispatch({type: recommendResultTypes.TOGGLE_RECOMMEND_CHECK, index})
}

export const updatePage = (page) => (dispatch) => {
  dispatch({type: recommendResultTypes.UPDATE_PAGE, page})
}

export const showMore = () => (dispatch) => {
  dispatch({type: recommendResultTypes.SHOW_MORE})
}
