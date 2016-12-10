import { recommendTypes } from '../reducer-types'

export const updateInputText = (text) => (dispatch) => {
  dispatch({ type: recommendTypes.UPDATE_INPUT_TEXT, text})
}

export const receiveBannerList = (bannerList) => (dispatch) => {
  dispatch({ type: recommendTypes.REVEIVE_BANNER_LIST, bannerList})
}

export const receivePlaceholder = (placeholder) => (dispatch) => {
  dispatch({ type: recommendTypes.REVEIVE_PLACEHOLDER, placeholder})
}

export const receiveExplainList = (explainList) => (dispatch) => {
  dispatch({ type: recommendTypes.REVEIVE_EXPLAIN_LIST, explainList})
}
