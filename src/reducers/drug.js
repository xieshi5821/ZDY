import { drugTypes } from '../reducer-types'
const initialState = {
  queryId: '',
  medicinalName: '',
  medicinal: null,
  evaluateList: []
}

export default drug = (state = initialState, action) => {
  switch (action.type) {
    case drugTypes.UPDATE_QUERY_ID:
      return {...state, queryId: action.queryId}
    case drugTypes.UPDATE_MEDICINAL:
      return {...state, medicinal: action.medicinal}
    case drugTypes.UPDATE_MEDICINAL_NAME:
      return {...state, medicinalName: action.medicinalName}
    case drugTypes.RECEIVE_EVALUATE_LIST:
      return {...state, evaluateList: action.evaluateList.gridModel}
  }
  return state
}
