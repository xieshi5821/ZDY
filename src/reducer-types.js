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
  'UPDATE_INPUT_TEXT'
])
