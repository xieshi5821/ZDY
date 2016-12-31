import { favoritesTypes } from '../reducer-types'
const initialState = {
  rows: 20,
  page: 1,
  resultList: [],
  hasMore: true
}

export default search = (state = initialState, action) => {
  switch (action.type) {
    case favoritesTypes.RESET_RESULT_LIST:
      return {...state, resultList: [], page: 1, hasMore: true}

    case favoritesTypes.RECEIVE_RESULT_LIST:
      const {gridModel, page, total} = action.resultList
      const resultList = Object.assign([], state.resultList)
      gridModel.forEach(res => {
        resultList.push({...res})
      })
      return {...state, resultList, page: parseInt(page) + 1, hasMore: parseInt(page) < parseInt(total)}
  }

  return state
}
