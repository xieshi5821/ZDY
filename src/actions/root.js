import {rootRd} from '../reducer-types'

export function changeTab(selectedTab) {
  return (dispatch) => {
    dispatch({type: rootRd.CHANGE_TAB, selectedTab})
  }
}
