import { recommendResultTypes } from '../reducer-types'
const initialState = {
  rows: 20,
  page: 1,
  resultList: [],
  hasMore: true,
  contraindicationWords: [],
  star: [],
  medicinalIsInsurance: [],
  submitWords: [],
  recommedWords: []
}

export default search = (state = initialState, action) => {
  switch (action.type) {
    case recommendResultTypes.UPDATE_PAGE:
      return {...state, page: action.page}
    case recommendResultTypes.RESET_RESULT_LIST:
      return {...state, resultList: [], page: 1, hasMore: true}
    case recommendResultTypes.TOGGLE_RECOMMEND_CHECK:
      const recommedWords = Object.assign([], state.recommedWords)
      const word = recommedWords[action.index]
      word.checked = !word.checked
      return {...state, recommedWords}
    case recommendResultTypes.RECEIVE_RESULT_LIST:
      const {gridModel, page, total} = action.resultList
      const resultList = Object.assign([], state.resultList)
      let index = resultList.length
      gridModel.forEach(res => {
        resultList.push({...res, seq: index++})
      })
      return {...state, resultList, page: parseInt(page) + 1, hasMore: parseInt(page) < parseInt(total)}
    case recommendResultTypes.RECEIVE_RECOMMED_WORDS:
      return {...state, recommedWords: action.recommedWords}
    case recommendResultTypes.RECEIVE_SUBMIT_WORDS:
      return {...state, submitWords: action.submitWords}

    case recommendResultTypes.RECEIVE_CONTRAINDICATION_WORDS:
      return {...state, contraindicationWords: action.contraindicationWords}

    case recommendResultTypes.TOGGLE_CONTRAINDICATION_CHECK:
      const contraindicationWords = Object.assign([], state.contraindicationWords)
      const contraindication = contraindicationWords[action.index]
      contraindication.checked = !contraindication.checked
      return {...state, contraindicationWords}

    case recommendResultTypes.RESET_FILTER:
      const words = Object.assign([], state.contraindicationWords)
      words.forEach((contraindication) => {
        contraindication.checked = false
      })
      return {...state, contraindicationWords: words, star: [], medicinalIsInsurance: []}

    case recommendResultTypes.TOGGLE_STAR_CHECK:
      const star = Object.assign([], state.star)
      const idx = star.indexOf(action.level)
      if (idx == -1) {
        star.push(action.level)
      } else {
        star.splice(idx, 1)
      }
      return {...state, star}
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
