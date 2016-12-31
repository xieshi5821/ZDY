import { drugTypes } from '../reducer-types'

export const updateQueryId = (queryId) => (dispatch) => {
  dispatch({type: drugTypes.UPDATE_QUERY_ID, queryId})
}

export const updateSource = (source) => (dispatch) => {
  dispatch({type: drugTypes.UPDATE_SOURCE, source})
}

export const updateMedicinalName = (medicinalName) => (dispatch) => {
  dispatch({type: drugTypes.UPDATE_MEDICINAL_NAME, medicinalName})
}

export const updateMedicinal = (medicinal) => (dispatch) => {
  dispatch({type: drugTypes.UPDATE_MEDICINAL, medicinal})
}

export const receiveEvaluateList = (evaluateList) => (dispatch) => {
  dispatch({type: drugTypes.RECEIVE_EVALUATE_LIST, evaluateList})
}
