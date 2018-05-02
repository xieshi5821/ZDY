import { recommendResultTypes } from '../reducer-types'
const initialState = {
  rows: 10,
  page: 1,
  resultList: [],
  hasMore: true,
  medicinalIsInsurance: [],
  submitWords: [],
  recommedWords: [],
  diseaseWords: [],
  yyjj: '',
  ypcj: '',
  records: 0
}

export default search = (state = initialState, action) => {
  switch (action.type) {
    case recommendResultTypes.RECEIVE_DISEASE_WORDS:
      return {...state, diseaseWords: action.diseaseWords}
    case recommendResultTypes.UPDATE_PAGE:
      return {...state, page: action.page}
    case recommendResultTypes.RESET_RESULT_LIST:
      return {...state, resultList: [], page: 1, records: 0, hasMore: true}
    case recommendResultTypes.UPDATE_YPCJ:
      return {...state, ypcj: action.ypcj}
    case recommendResultTypes.UPDATE_YYJJ:
      return {...state, yyjj: action.yyjj}
    case recommendResultTypes.CHECK_JB:
      return {...state, diseaseWords: state.diseaseWords.map(item => {
        if (item.name === action.jbName) {
          item.checked = !item.checked
        }
        return item
      })}
    case recommendResultTypes.TOGGLE_RECOMMEND_CHECK:
      const recommedWords = Object.assign([], state.recommedWords)
      const word = recommedWords[action.index]
      if (word.checked) {
        word.checked = false
      } else {
        word.checked = true
      }
      return {...state, recommedWords}
    case recommendResultTypes.RECEIVE_RESULT_LIST:
      let {gridModel, page, total, records} = action.resultList
      page = parseInt(page)
      const resultList = Object.assign([], state.resultList)
      let index = resultList.length
      gridModel.forEach(res => {
        resultList.push({...res, seq: index++})
      })
      if (page === 1 && !resultList.length) {
        resultList.push({seq: 0, empty: true})
      }
      return {...state, resultList, page: page + 1, hasMore: parseInt(page) < parseInt(total), records}
    case recommendResultTypes.RECEIVE_PURE_RESULT_LIST:
      return {...state, resultList: action.resultList}
    case recommendResultTypes.RECEIVE_RECOMMED_WORDS:
      return {...state, recommedWords: action.recommedWords}
    case recommendResultTypes.RECEIVE_SUBMIT_WORDS:
      return {...state, submitWords: action.submitWords}
    case recommendResultTypes.RESET_FILTER:
      return {...state, medicinalIsInsurance: [], yyjj: '', ypcj: '', diseaseWords: state.diseaseWords.map(({name}) => {
        return {
          name,
          checked: false
        }
      })}
    case recommendResultTypes.TOGGLE_MEDICINALISINSURANCE_CHECK:
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
