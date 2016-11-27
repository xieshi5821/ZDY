import { recommendTypes } from '../reducer-types'

export const updateInputText = function (text) {
  return (dispatch) => {
    dispatch({ type: recommendTypes.UPDATE_INPUT_TEXT, text })
  }
}
