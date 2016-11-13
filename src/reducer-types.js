// 定义分模块的Reducers
const defModuleReducer = (moduleName, children = []) => {
  const reducer = {}
  children.forEach((defName) => {
    reducer[defName] = moduleName + ':' + defName
  })
  return reducer
}

// 应用根首页
export const rootRd = defModuleReducer('rootRd', ['CHANGE_TAB'])

// 推荐首页
export const recommendRd = defModuleReducer('recommendRd', ['LOAD_SLIDES', 'LOAD_PLACEHOLDER', 'LOAD_STATEMENT'])
