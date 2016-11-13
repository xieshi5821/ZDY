import {recommendRd} from '../reducer-types'
import {rootRd} from '../reducer-types'

const initialState = {
  selectedTab: 'recommend'
}

export default root  = (state = initialState, action) => {

  console.log(action, state)
  switch (action.type) {
    case rootRd.CHANGE_TAB:
      return {...state, selectedTab: action.selectedTab}
    default:
      return state
  }
  return {...state}
}
