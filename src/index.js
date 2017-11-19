import React, {Component} from 'react'
import {Provider} from 'react-redux'
import SplashScreen from 'react-native-splash-screen'
import store from './store'
import configRoutes from './routes-config'
import Welcome from './pages/Welcome'
import {callLog} from './api/request'
import DeviceInfo from 'react-native-device-info'

require('ErrorUtils').setGlobalHandler((err = '') => {
  try {
    if (err instanceof Error) {
      err = [err.name, err.number, err.description, err.message, err.fileName, err.stack].join('-')
    }
    callLog({msg: JSON.stringify({
      ua: DeviceInfo.getUserAgent(),
      time: new Date(),
      err,
      version: 'test'
    })}).then(() => {}).catch(() => {})
　} catch(e) {}
})

// setTimeout(() => {
//   throw new Error('just test error')
// }, 5000)

const routes = configRoutes()
export default class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isSplashScreen: true,
      isGuideScreen: true
    }
  }

  componentDidMount() {
    setTimeout(() => {
      SplashScreen.hide()
      this.setState({
        isSplashScreen: false
      })
    }, 2500)
  }

  handleFinishGuideScreen() {
    this.setState({
      isGuideScreen: false
    })
  }

  render() {
    const {isSplashScreen, isGuideScreen} = this.state
    if (isSplashScreen) {
      return null
    }
    if (isGuideScreen) {
      return (<Welcome onFinish={this.handleFinishGuideScreen.bind(this)}></Welcome>)
    }
    return (
      <Provider store={store}>
        {routes}
      </Provider>
    )
  }
}
