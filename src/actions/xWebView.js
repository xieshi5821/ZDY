import { xWebViewTypes } from '../reducer-types'

export const updateUri = (uri) => (dispatch) => {
  dispatch({type: xWebViewTypes.UPDATE_URI, uri})
}

export const updateUriName = (uriName) => (dispatch) => {
  dispatch({type: xWebViewTypes.UPDATE_URI_NAME, uriName})
}
