import { searchResultTypes } from '../reducer-types'
const initialState = {
  rows: 20,
  page: 1,
  resultList: [],
  hasMore: true,
  contraindicationWords: [],
  medicinalIsInsurance: [],
  ypcj: '',
  yyjj: '',
  records: 0
}

export default search = (state = initialState, action) => {
  switch (action.type) {
    case searchResultTypes.RESET_RESULT_LIST:
      return {...state, resultList: [], page: 1, hasMore: true, records: 0}
    case searchResultTypes.UPDATE_YPCJ:
      return {...state, ypcj: action.ypcj}
    case searchResultTypes.UPDATE_YYJJ:
      return {...state, yyjj: action.yyjj}
    case searchResultTypes.RECEIVE_RESULT_LIST:
      const {gridModel, page, total, records} = action.resultList
      const resultList = Object.assign([], state.resultList)
      let index = resultList.length
      gridModel.forEach(res => {
        resultList.push({...res, seq: index++})
      })
      return {...state, resultList, page: parseInt(page) + 1, hasMore: parseInt(page) < parseInt(total), records}
    case searchResultTypes.RECEIVE_PURE_RESULT_LIST:
      return {...state, resultList: action.resultList}
    case searchResultTypes.RECEIVE_CONTRAINDICATION_WORDS:
      return {...state, contraindicationWords: action.contraindicationWords}

    case searchResultTypes.TOGGLE_CONTRAINDICATION_CHECK:
      const contraindicationWords = Object.assign([], state.contraindicationWords)
      const contraindication = contraindicationWords[action.index]
      contraindication.checked = !contraindication.checked
      return {...state, contraindicationWords}

    case searchResultTypes.RESET_FILTER:
      const words = Object.assign([], state.contraindicationWords)
      words.forEach((contraindication) => {
        contraindication.checked = false
      })
      return {...state, contraindicationWords: words, yyjj: '', ypcj: '', star: [], medicinalIsInsurance: []}

    case searchResultTypes.TOGGLE_MEDICINALISINSURANCE_CHECK:
      const medicinalIsInsurance = Object.assign([], state.medicinalIsInsurance)
      const idx2 = medicinalIsInsurance.indexOf(action.name)
      if (idx2 == -1) {
        medicinalIsInsurance.push(action.name)
      } else {
        medicinalIsInsurance.splice(idx2, 1)
      }
      return {...state, medicinalIsInsurance}
  }

  return state
}
