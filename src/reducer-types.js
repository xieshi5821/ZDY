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
'LOAD_SLIDES',
'LOAD_PLACEHOLDER',
'LOAD_STATEMENT',
'UPDATE_INPUT_TEXT'
])
