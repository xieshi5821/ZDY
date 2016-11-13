import React, {Component} from 'react'
import {Provider} from 'react-redux'
import configureStore from './store'
import Root from './root'

const store = configureStore()
console.log(store)

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Root/>
      </Provider>
    )
  }
}
