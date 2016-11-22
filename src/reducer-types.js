// 定义分模块的Reducers
const createModuleReducer = (moduleName, children = []) => {
  const reducer = {}
  children.forEach((defName) => {
    reducer[defName] = moduleName + ':' + defName
  })
  return reducer
}

// 应用根首页
export const rootTypes = createModuleReducer('rootTypes', ['CHANGE_TAB'])

// 推荐首页
export const recommendtypes = createModuleReducer('recommendTypes', ['LOAD_SLIDES', 'LOAD_PLACEHOLDER', 'LOAD_STATEMENT'])
