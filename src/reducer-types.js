// 定义分模块的Reducers
const createModuleReducer = (moduleName, children = []) => {
  const reducer = {}
  children.forEach((defName) => {
    reducer[defName] = moduleName + ':' + defName
  })
  return reducer
}

// 推荐首页
export const recommendTypes = createModuleReducer('recommendTypes', [
  'REVEIVE_BANNER_LIST',
  'REVEIVE_PLACEHOLDER',
  'REVEIVE_EXPLAIN_LIST',
  'UPDATE_INPUT_TEXT'
])

// 搜索首页
export const searchTypes = createModuleReducer('searchTypes', [
  'REVEIVE_RANGE_LIST',
  'REVEIVE_PLACEHOLDER',
  'UPDATE_INPUT_TEXT',
  'TOGGLE_CHECK'
])

// 搜索结果首页
export const searchResultTypes = createModuleReducer('searchResultTypes', [
  'RESET_RESULT_LIST',
  'RECEIVE_RESULT_LIST',
  'RECEIVE_CONTRAINDICATION_WORDS',
  'TOGGLE_CONTRAINDICATION_CHECK',
  'TOGGLE_MEDICINALISINSURANCE_CHECK',
  'RESET_FILTER',
  'TOGGLE_STAR_CHECK'
])
