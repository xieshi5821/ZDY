import React, {Component} from 'react'
import {AppRegistry} from 'react-native'
import App from './src/index'

export default class ZDY extends Component {
    render() {
        return (
            <App></App>
        )
    }
}

AppRegistry.registerComponent('ZDY', () => ZDY)
