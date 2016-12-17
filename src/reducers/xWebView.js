import { xWebViewTypes } from '../reducer-types'
const initialState = {
  uri: '',
  uriName: ''
}

export default search = (state = initialState, action) => {
  switch (action.type) {
    case xWebViewTypes.UPDATE_URI:
      return {...state, uri: action.uri}
    case xWebViewTypes.UPDATE_URI_NAME:
      return {...state, uriName: action.uriName}
  }

  return state
}
