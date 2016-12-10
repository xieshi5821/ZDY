import { searchTypes } from '../reducer-types'
const initialState = {
  inputText: '',
  rangeList: [],
  placeholder: ''
}

export default search = (state = initialState, action) => {
  switch (action.type) {
    case searchTypes.UPDATE_INPUT_TEXT:
      return {...state, inputText: action.text}
    case searchTypes.REVEIVE_RANGE_LIST:
      return {...state, rangeList: action.rangeList}
    case searchTypes.REVEIVE_PLACEHOLDER:
      return {...state, placeholder: action.placeholder}
    case searchTypes.TOGGLE_CHECK:
      const rangeList = Object.assign([], state.rangeList)
      const range = rangeList[action.index]
      range.checked = !range.checked
      return {...state, rangeList}
  }
  return state
}
