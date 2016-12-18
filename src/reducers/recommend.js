import { recommendTypes } from '../reducer-types'
const initialState = {
  bannerList: [],
  inputText: '咳嗽咽痛',
  explainList: [],
  placeholder: ''
}

export default recommend = (state = initialState, action) => {
  switch (action.type) {
    case recommendTypes.UPDATE_INPUT_TEXT:
      return {...state, inputText: action.text}
    case recommendTypes.REVEIVE_BANNER_LIST:
      return {...state, bannerList: action.bannerList}
    case recommendTypes.REVEIVE_PLACEHOLDER:
      return {...state, placeholder: action.placeholder}
    case recommendTypes.REVEIVE_EXPLAIN_LIST:
      return {...state, explainList: action.explainList}
  }
  return state
}
