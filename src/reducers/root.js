import {rootTypes} from '../reducer-types'

const initialState = {
  selectedTab: 'recommend'
}

export default root  = (state = initialState, action) => {
  switch (action.type) {
    case rootTypes.CHANGE_TAB:
      return {...state, selectedTab: action.selectedTab}
    default:
      return state
  }
  return {...state}
}
