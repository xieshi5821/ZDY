import { rootTypes } from '../reducer-types'

export function changeTab(selectedTab) {
  return (dispatch) => {
    dispatch({ type: rootTypes.CHANGE_TAB, selectedTab })
  }
}
