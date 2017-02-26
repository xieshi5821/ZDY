import { highlightTypes } from '../reducer-types'

export const updateHighlight = (title, text) => (dispatch) => {
  dispatch({type: highlightTypes.UPDATE_HIGHLIGHT, highlight: {title, text}})
}
