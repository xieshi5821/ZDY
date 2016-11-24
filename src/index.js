import React, {Component} from 'react'
import {Provider} from 'react-redux'
import store from './store'
import configRoutes from './routes-config'
const routes = configRoutes()
export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        {routes}
      </Provider>
    )
  }
}
