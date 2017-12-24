import { searchTypes } from '../reducer-types'

export const updateInputTextS = (text) => (dispatch) => {
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

export const updateHisList = (hisList) => (dispatch) => {
  dispatch({type: searchTypes.UPDATE_HIS_LIST, hisList})
}

export const updateRangeCheckedList = (rangeList) => (dispatch) => {
  dispatch({type: searchTypes.UPDATE_RANGE_CHECKED_LIST, rangeList})
}
