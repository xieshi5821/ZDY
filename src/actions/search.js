import { searchTypes } from '../reducer-types'

export const updateInputText = (text) => (dispatch) => {
  dispatch({type: searchTypes.UPDATE_INPUT_TEXT, text})
}

export const receiveRangeList = (rangeList) => (dispatch) => {
  dispatch({type: searchTypes.REVEIVE_RANGE_LIST, rangeList})
}

export const receivePlaceholder = (placeholder) => (dispatch) => {
  dispatch({type: searchTypes.REVEIVE_PLACEHOLDER, placeholder})
}

export const toggleCheck = (index) => (dispatch) => {
  dispatch({type: searchTypes.TOGGLE_CHECK, index})
}
