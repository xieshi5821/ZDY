import { highlightTypes } from '../reducer-types'
const initialState = {
  title: '',
  text: ''
}

export default search = (state = initialState, action) => {
  switch (action.type) {
    case highlightTypes.UPDATE_HIGHLIGHT:
      const {title, text} = action.highlight
      return {...state, title, text}
  }

  return state
}
