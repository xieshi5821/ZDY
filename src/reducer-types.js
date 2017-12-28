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

// 推荐结果
export const recommendResultTypes = createModuleReducer('recommendResultTypes', [
  'RESET_RESULT_LIST',
  'RECEIVE_RESULT_LIST',
  'RECEIVE_PURE_RESULT_LIST',
  'RECEIVE_RECOMMED_WORDS',
  'RECEIVE_SUBMIT_WORDS',
  'TOGGLE_MEDICINALISINSURANCE_CHECK',
  'RESET_FILTER',
  'TOGGLE_RECOMMEND_CHECK',
  'UPDATE_PAGE',
  'RECEIVE_DISEASE_WORDS',
  'UPDATE_YYJJ',
  'UPDATE_YPCJ',
  'CHECK_JB'
])

// 搜索首页
export const searchTypes = createModuleReducer('searchTypes', [
  'REVEIVE_RANGE_LIST',
  'REVEIVE_PLACEHOLDER',
  'UPDATE_INPUT_TEXT',
  'TOGGLE_CHECK',
  'UPDATE_HIS_LIST',
  'UPDATE_RANGE_CHECKED_LIST'
])

// 搜索结果首页
export const searchResultTypes = createModuleReducer('searchResultTypes', [
  'RESET_RESULT_LIST',
  'RECEIVE_RESULT_LIST',
  'RECEIVE_PURE_RESULT_LIST',
  'RECEIVE_CONTRAINDICATION_WORDS',
  'TOGGLE_CONTRAINDICATION_CHECK',
  'TOGGLE_MEDICINALISINSURANCE_CHECK',
  'UPDATE_YYJJ',
  'UPDATE_YPCJ',
  'RESET_FILTER'
])

// 药品主页
export const drugTypes = createModuleReducer('drugTypes', [
  'UPDATE_SOURCE',
  'UPDATE_QUERY_ID',
  'UPDATE_MEDICINAL',
  'UPDATE_MEDICINAL_NAME',
  'RECEIVE_EVALUATE_LIST',
  'RECEIVE_RECOMMEND_LIST'
])

// webview
export const xWebViewTypes = createModuleReducer('xWebViewTypes', [
  'UPDATE_URI',
  'UPDATE_URI_NAME'
])

// 收藏夹
export const favoritesTypes = createModuleReducer('favoritesTypes', [
  'RESET_RESULT_LIST',
  'RECEIVE_RESULT_LIST'
])
