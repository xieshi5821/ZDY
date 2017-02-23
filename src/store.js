import {applyMiddleware, createStore, compose} from 'redux'
import thunk from 'redux-thunk'
import {persistStore, autoRehydrate} from 'redux-persist'
import {AsyncStorage} from 'react-native'
import reducers from './reducers'

const logger = store => next => action => {
	if (typeof action === 'function') {
    // console.log('dispatching a function')
  } else {
    // console.log('dispatching', action)
  }
	const result = next(action)
	// console.log('next state', store.getState())
	return result
}

const middlewares = [
	// logger,
	thunk
]

// const createAppStore = applyMiddleware(...middlewares)(createStore)
//
// export default configureStore = (onComplete: () => void) => {
// 	const store = autoRehydrate()(createAppStore)(reducers)
// 	const opt = {
// 		storage: AsyncStorage,
// 		transform: [],
// 		//whitelist: ['userStore'],
// 	}
// 	persistStore(store, opt, onComplete)
// 	return store
// }


export default store = compose(
  applyMiddleware(...middlewares)
)(createStore)(reducers)
