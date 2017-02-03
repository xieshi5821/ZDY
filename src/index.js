import React, {Component} from 'react'
import {Provider} from 'react-redux'
import SplashScreen from 'react-native-splash-screen'
import store from './store'
import configRoutes from './routes-config'
const routes = configRoutes()
export default class App extends Component {
  componentDidMount() {
     SplashScreen.hide()
  }
  render() {
    return (
      <Provider store={store}>
        {routes}
      </Provider>
    )
  }
}
