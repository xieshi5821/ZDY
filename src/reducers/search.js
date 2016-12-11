import { searchTypes } from '../reducer-types'
const initialState = {
  rows: 20,
  page: 1,
  inputText: '感冒',
  rangeList: [],
  placeholder: '',
  resultList: [],
  hasMore: true
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

    case searchTypes.RESET_RESULT_LIST:
      return {...state, resultList: [], page: 1, hasMore: true}

    case searchTypes.RECEIVE_RESULT_LIST:
      const {gridModel, page, total} = action.resultList
      const resultList = Object.assign([], state.resultList)
      let index = resultList.length
      gridModel.forEach(res => {
        resultList.push({...res, seq: index++})
      })
      return {...state, resultList, page: parseInt(page) + 1, hasMore: parseInt(page) < parseInt(total)}
      
  }
  return state
}
